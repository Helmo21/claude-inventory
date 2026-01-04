---
name: llm-saas-backend
description: LLM Features Backend workflow with OpenRouter, Supabase pgvector, LangChain & LangGraph
---

# LLM Features Backend - Planning & Design Workflow

Build the AI/LLM features backend to integrate with your existing SaaS template.

**Stack:**
- **LLM Provider:** OpenRouter (multi-model access)
- **Vector Store:** Supabase (pgvector)
- **Framework:** LangChain + LangGraph

```
Phase 1: Discovery & Planning ──► Phase 2: Architecture ──► Phase 3: Security
                                                                    │
                                                                    ▼
                                                          Ready for Implementation
```

---

## Skills Used in This Workflow

| Skill | Phase | Purpose |
|-------|-------|---------|
| `brainstorming` | 1 | Requirements gathering |
| `writing-plans` | 1 | Technical specification |
| `langchain` | 2 | LangChain framework patterns |
| `langchain-architecture` | 2 | Agents, chains, memory design |
| `langgraph-docs` | 2 | LangGraph state machines |
| `supabase-pgvector` | 2 | Vector store & RAG patterns |
| `senior-prompt-engineer` | 2 | System prompts design |
| `architecture-patterns` | 2 | Clean architecture |
| `api-design-principles` | 2 | API design |
| `security-api-security` | 3 | API hardening |
| `security-input-validation` | 3 | LLM input validation |

---

## Phase 1: Discovery & Planning

### 1.1 Requirements Brainstorming

**Invoke skill:** `brainstorming`

**Context template:**
```
Building LLM features backend to integrate with existing SaaS:

Stack:
- LLM Provider: OpenRouter (Claude, GPT-4, Llama, Mistral)
- Vector Store: Supabase with pgvector
- Framework: LangChain + LangGraph

Core Features:
- RAG pipeline with document ingestion
- Conversation management with memory
- Streaming responses (SSE)
- Model routing via OpenRouter
- Usage tracking per tenant
- Rate limiting

OpenRouter Features:
- Multi-model support with unified API
- Model fallback chains
- Cost tracking per model
- Prompt caching

Supabase Features:
- pgvector for embeddings
- Conversations & messages storage
- Usage logs
- Real-time subscriptions for streaming UX

Integration Points:
- Will merge with existing SaaS template
- Auth handled by existing system
- Tenant isolation via tenant_id
```

### 1.2 Technical Specification

**Invoke skill:** `writing-plans`

**Deliverables:**
- [ ] LLM service boundaries
- [ ] API endpoints for AI features
- [ ] Data flow diagrams
- [ ] Integration points with existing SaaS

---

## Phase 2: Architecture Analysis

### 2.1 LangChain & LangGraph Skills (Sequential)

**Invoke these skills to understand the frameworks:**

1. **`langchain`** - Core framework understanding:
   - Chains and LCEL composition
   - Agent patterns (ReAct, tool calling)
   - Memory management
   - Vector store integration

2. **`langchain-architecture`** - Architecture patterns:
   - Service layer design
   - Chain composition patterns
   - Error handling in chains
   - Streaming patterns

3. **`langgraph-docs`** - For complex workflows:
   - State machines for multi-step flows
   - Conditional routing
   - Human-in-the-loop patterns
   - Persistence and checkpointing

### 2.2 Supabase & Prompt Design (Sequential)

4. **`supabase-pgvector`** - Vector store setup:
   - Schema for documents, chunks, embeddings
   - Similarity search functions
   - Hybrid search (vector + full-text)
   - LangChain integration code

5. **`senior-prompt-engineer`** - Prompt design:
   - System prompt templates
   - RAG prompt patterns
   - Few-shot examples
   - Output formatting

### 2.3 Parallel Architecture Analysis

**Run these 4 agents IN PARALLEL:**

```
"Run these agents in parallel for LLM features backend:

1. backend-architect: Design LLM service architecture:
   - Service boundaries (API, LLM Service, RAG Service)
   - Integration patterns with existing SaaS
   - Async processing for document ingestion
   - Caching strategy for responses

2. langchain-specialist: Design LangChain implementation:
   - RAG pipeline with Supabase retriever
   - OpenRouter LLM wrapper with model routing
   - Conversation memory using Supabase
   - Streaming chain with LCEL
   - Fallback chains for model failures

3. postgresql-specialist: Design Supabase schema:
   - documents and document_chunks tables
   - conversations and messages tables
   - usage_logs for cost tracking
   - pgvector indexes (IVFFlat vs HNSW)
   - Similarity search functions

4. redis-specialist: Design caching layer:
   - Response cache by prompt hash
   - Embedding cache for frequent queries
   - Rate limiter per tenant/API key
   - Conversation context cache"
```

### 2.4 Architecture Patterns (Sequential)

**Invoke skills in order:**

1. **`architecture-patterns`** - Apply patterns:
   - Repository pattern for Supabase
   - Strategy pattern for model selection
   - Chain of Responsibility for fallbacks

2. **`api-design-principles`** - API design:
   - REST endpoints for CRUD
   - SSE endpoint for streaming
   - Webhook endpoints for async
   - OpenAPI specification

---

## Phase 2 Outputs

### Data Models (from `supabase-pgvector`)

```
documents ─────► document_chunks (with embeddings)
                        │
conversations ──► messages (with token counts)
                        │
                 usage_logs (cost tracking)
```

### LangChain Components (from `langchain-architecture`)

```
OpenRouter LLM
      │
      ▼
┌─────────────────────────────────────┐
│           RAG Chain (LCEL)          │
│  ┌─────────┐  ┌─────────┐  ┌─────┐  │
│  │Retriever│─►│ Prompt  │─►│ LLM │  │
│  │Supabase │  │Template │  │     │  │
│  └─────────┘  └─────────┘  └─────┘  │
└─────────────────────────────────────┘
      │
      ▼
Streaming Response (SSE)
```

### LangGraph Workflows (from `langgraph-docs`)

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│   START    │────►│  Retrieve  │────►│  Generate  │
└────────────┘     └────────────┘     └────────────┘
                         │                   │
                         ▼                   ▼
                   ┌────────────┐     ┌────────────┐
                   │  No Docs?  │     │   Stream   │
                   │  Fallback  │     │  Response  │
                   └────────────┘     └────────────┘
```

---

## Phase 3: Security Design

### 3.1 Parallel Security Analysis

**Run these 2 agents IN PARALLEL:**

```
"Run security agents in parallel for LLM features:

1. security-auditor: Threat model for LLM API:
   - Prompt injection attack vectors
   - Data leakage via model responses
   - Cost attacks (token exhaustion)
   - RAG poisoning via document upload

2. security-owasp-vulnerabilities: LLM-specific OWASP:
   - LLM01: Prompt Injection
   - LLM02: Insecure Output Handling
   - LLM06: Sensitive Information Disclosure
   - LLM09: Overreliance on LLM"
```

### 3.2 Security Skills (Sequential)

**Invoke skills in order:**

1. **`security-api-security`** - API hardening:
   - Input validation on all endpoints
   - Output sanitization
   - Rate limiting headers
   - Request size limits

2. **`security-input-validation`** - LLM-specific:
   - Prompt length limits
   - Banned pattern detection
   - File upload validation for RAG
   - Encoding normalization

### 3.3 LLM Security Checklist

#### Prompt Injection Protection
- [ ] System prompt isolation
- [ ] User input sandboxing
- [ ] Output validation before returning
- [ ] Jailbreak detection logging

#### Data Protection
- [ ] Tenant isolation via tenant_id
- [ ] PII detection in prompts (optional)
- [ ] Sensitive data masking in logs
- [ ] Document access control

#### Cost Protection
- [ ] Token limits per request
- [ ] Daily/monthly quotas per tenant
- [ ] Model access control
- [ ] Cost alerts

#### OpenRouter Specific
- [ ] API key server-side only
- [ ] Model allowlist per tenant
- [ ] Fallback model security parity

---

## Workflow Completion Checklist

### Phase 1 Outputs
- [ ] Requirements document
- [ ] Technical specification
- [ ] Integration plan with existing SaaS

### Phase 2 Outputs
- [ ] LangChain architecture design
- [ ] LangGraph workflow diagrams
- [ ] Supabase schema (SQL ready)
- [ ] API specification (OpenAPI)
- [ ] Prompt templates
- [ ] Caching strategy

### Phase 3 Outputs
- [ ] Threat model
- [ ] Security controls list
- [ ] LLM security checklist (completed)

---

## Quick Start Commands

```bash
# Start workflow
/claude-inventory:llm-saas

# Phase 1 - Planning
/claude-inventory:brainstorming "LLM features backend with OpenRouter + Supabase"
/claude-inventory:writing-plans

# Phase 2 - Learn the stack (sequential)
/claude-inventory:langchain
/claude-inventory:langchain-architecture
/claude-inventory:langgraph-docs
/claude-inventory:supabase-pgvector
/claude-inventory:senior-prompt-engineer

# Phase 2 - Architecture (parallel agents)
"Run backend-architect, langchain-specialist, postgresql-specialist, redis-specialist in parallel"

# Phase 2 - Patterns (sequential)
/claude-inventory:architecture-patterns
/claude-inventory:api-design-principles

# Phase 3 - Security (parallel agents)
"Run security-auditor and security-owasp-vulnerabilities in parallel"

# Phase 3 - Security skills (sequential)
/claude-inventory:security-api-security
/claude-inventory:security-input-validation
```

---

## Next Steps

After completing this workflow:
1. **Merge** generated schemas/code with your SaaS template
2. **Implementation workflow** - TDD, coding
3. **Testing workflow** - Integration, load tests
4. **Deployment workflow** - Infrastructure, monitoring
