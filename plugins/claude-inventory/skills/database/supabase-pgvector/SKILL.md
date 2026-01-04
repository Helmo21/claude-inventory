---
name: supabase-pgvector
description: Supabase with pgvector for LLM applications - vector storage, similarity search, and RAG data patterns
---

# Supabase pgvector for LLM Applications

Vector storage and RAG patterns using Supabase with pgvector extension.

## 1. pgvector Setup

### Enable Extension

```sql
-- Enable pgvector extension
create extension if not exists vector;
```

### Embedding Dimensions by Model

| Model | Dimensions | Provider |
|-------|------------|----------|
| text-embedding-3-small | 1536 | OpenAI |
| text-embedding-3-large | 3072 | OpenAI |
| text-embedding-ada-002 | 1536 | OpenAI |
| voyage-large-2 | 1536 | Voyage |
| embed-english-v3.0 | 1024 | Cohere |
| all-MiniLM-L6-v2 | 384 | HuggingFace |

---

## 2. Core Tables

### Documents Table (RAG Source)

```sql
create table documents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,  -- for multi-tenant isolation
  title text not null,
  content text not null,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for tenant queries
create index idx_documents_tenant on documents(tenant_id);
```

### Document Chunks with Embeddings

```sql
create table document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  tenant_id uuid not null,
  chunk_index integer not null,
  content text not null,
  token_count integer,
  embedding vector(1536),  -- adjust dimension for your model
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- Vector similarity index (choose one)
-- IVFFlat: faster build, good for < 1M vectors
create index idx_chunks_embedding_ivf on document_chunks
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- HNSW: slower build, better recall, good for production
create index idx_chunks_embedding_hnsw on document_chunks
  using hnsw (embedding vector_cosine_ops) with (m = 16, ef_construction = 64);

-- Tenant index for filtered queries
create index idx_chunks_tenant on document_chunks(tenant_id);
```

### Conversations Table

```sql
create table conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  user_id uuid,  -- optional, from your existing auth
  title text,
  model text not null,  -- e.g., 'anthropic/claude-3-opus'
  system_prompt text,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_conversations_tenant on conversations(tenant_id);
```

### Messages Table

```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  tenant_id uuid not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  model text,  -- model used for assistant messages
  tokens_input integer,
  tokens_output integer,
  cost_usd numeric(10, 6),
  latency_ms integer,
  metadata jsonb default '{}',  -- tool calls, citations, etc.
  created_at timestamptz default now()
);

create index idx_messages_conversation on messages(conversation_id);
create index idx_messages_tenant on messages(tenant_id);
```

### Usage Tracking

```sql
create table usage_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  user_id uuid,
  model text not null,
  operation text not null,  -- 'chat', 'embedding', 'rag_query'
  tokens_input integer default 0,
  tokens_output integer default 0,
  cost_usd numeric(10, 6),
  latency_ms integer,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create index idx_usage_tenant_date on usage_logs(tenant_id, created_at);
```

---

## 3. Similarity Search Functions

### Basic Vector Search

```sql
create or replace function match_documents(
  query_embedding vector(1536),
  match_tenant_id uuid,
  match_count int default 5,
  match_threshold float default 0.7
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    dc.id,
    dc.document_id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) as similarity
  from document_chunks dc
  where dc.tenant_id = match_tenant_id
    and 1 - (dc.embedding <=> query_embedding) > match_threshold
  order by dc.embedding <=> query_embedding
  limit match_count;
$$;
```

### Hybrid Search (Vector + Full-Text)

```sql
-- Add full-text search column
alter table document_chunks add column fts tsvector
  generated always as (to_tsvector('english', content)) stored;

create index idx_chunks_fts on document_chunks using gin(fts);

-- Hybrid search function
create or replace function hybrid_search(
  query_text text,
  query_embedding vector(1536),
  match_tenant_id uuid,
  match_count int default 5,
  vector_weight float default 0.7,
  text_weight float default 0.3
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  metadata jsonb,
  combined_score float
)
language sql stable
as $$
  with vector_results as (
    select
      id,
      document_id,
      content,
      metadata,
      1 - (embedding <=> query_embedding) as vector_score,
      row_number() over (order by embedding <=> query_embedding) as vector_rank
    from document_chunks
    where tenant_id = match_tenant_id
    limit match_count * 2
  ),
  text_results as (
    select
      id,
      ts_rank(fts, websearch_to_tsquery('english', query_text)) as text_score,
      row_number() over (order by ts_rank(fts, websearch_to_tsquery('english', query_text)) desc) as text_rank
    from document_chunks
    where tenant_id = match_tenant_id
      and fts @@ websearch_to_tsquery('english', query_text)
    limit match_count * 2
  )
  select
    v.id,
    v.document_id,
    v.content,
    v.metadata,
    (v.vector_score * vector_weight + coalesce(t.text_score, 0) * text_weight) as combined_score
  from vector_results v
  left join text_results t on v.id = t.id
  order by combined_score desc
  limit match_count;
$$;
```

### Search with Metadata Filter

```sql
create or replace function match_documents_filtered(
  query_embedding vector(1536),
  match_tenant_id uuid,
  filter jsonb default '{}',
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    dc.id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) as similarity
  from document_chunks dc
  where dc.tenant_id = match_tenant_id
    and dc.metadata @> filter
  order by dc.embedding <=> query_embedding
  limit match_count;
$$;
```

---

## 4. Batch Operations

### Batch Insert Embeddings

```sql
create or replace function batch_insert_chunks(
  chunks jsonb  -- array of {document_id, tenant_id, content, embedding, metadata}
)
returns int
language plpgsql
as $$
declare
  inserted_count int;
begin
  insert into document_chunks (document_id, tenant_id, chunk_index, content, embedding, metadata)
  select
    (item->>'document_id')::uuid,
    (item->>'tenant_id')::uuid,
    (item->>'chunk_index')::int,
    item->>'content',
    (item->>'embedding')::vector,
    coalesce(item->'metadata', '{}')::jsonb
  from jsonb_array_elements(chunks) as item;

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;
```

### Delete Document with Chunks

```sql
create or replace function delete_document_cascade(
  doc_id uuid,
  doc_tenant_id uuid
)
returns boolean
language plpgsql
as $$
begin
  delete from documents
  where id = doc_id and tenant_id = doc_tenant_id;

  return found;
end;
$$;
```

---

## 5. Performance Tips

### Index Selection

| Vectors | Recommended Index | Build Time | Query Speed | Recall |
|---------|------------------|------------|-------------|--------|
| < 100K | IVFFlat (lists=100) | Fast | Fast | Good |
| 100K-1M | IVFFlat (lists=500) | Medium | Fast | Good |
| > 1M | HNSW (m=16, ef=64) | Slow | Very Fast | Excellent |

### Query Optimization

```sql
-- Set probes for IVFFlat (higher = better recall, slower)
set ivfflat.probes = 10;

-- Set ef_search for HNSW (higher = better recall, slower)
set hnsw.ef_search = 100;
```

### Connection Pooling

Use Supabase's connection pooler for serverless:
- Transaction mode: `postgresql://...pooler.supabase.com:6543/postgres`
- Session mode: `postgresql://...pooler.supabase.com:5432/postgres`

---

## 6. LangChain Integration

### Supabase Vector Store

```python
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import OpenAIEmbeddings
from supabase import create_client

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

vector_store = SupabaseVectorStore(
    client=supabase,
    embedding=OpenAIEmbeddings(),
    table_name="document_chunks",
    query_name="match_documents"  # your custom function
)

# Search
results = vector_store.similarity_search(
    query="How does authentication work?",
    k=5,
    filter={"tenant_id": tenant_id}
)
```

### Custom Retriever with Tenant Isolation

```python
from langchain.schema import BaseRetriever

class TenantAwareRetriever(BaseRetriever):
    def __init__(self, supabase, tenant_id: str, match_count: int = 5):
        self.supabase = supabase
        self.tenant_id = tenant_id
        self.match_count = match_count

    def _get_relevant_documents(self, query: str):
        embedding = get_embedding(query)

        result = self.supabase.rpc(
            'match_documents',
            {
                'query_embedding': embedding,
                'match_tenant_id': self.tenant_id,
                'match_count': self.match_count
            }
        ).execute()

        return [Document(page_content=r['content'], metadata=r['metadata'])
                for r in result.data]
```

---

## 7. Real-time Subscriptions

### Stream New Messages

```python
# Subscribe to new messages in a conversation
def on_message(payload):
    message = payload['new']
    print(f"New message: {message['content']}")

supabase.channel('messages') \
    .on('postgres_changes',
        event='INSERT',
        schema='public',
        table='messages',
        filter=f'conversation_id=eq.{conversation_id}') \
    .subscribe(on_message)
```

### Typing Indicators (Presence)

```python
# Track typing status
channel = supabase.channel(f'conversation:{conversation_id}')

channel.on_presence_sync(lambda: print("Presence synced"))
channel.subscribe()

# Send typing status
channel.track({'user_id': user_id, 'typing': True})
```
