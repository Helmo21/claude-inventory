---
name: llm-saas-backend
description: Planning, Architecture & Security workflow for LangChain/LLM SaaS with OpenRouter and Supabase
---

# LLM SaaS Backend - Planning & Design Workflow

A focused workflow for planning, architecting, and securing a LangChain/LLM SaaS backend.

**Stack:**
- **LLM Provider:** OpenRouter (multi-model access)
- **Vector Store:** Supabase (pgvector)
- **Framework:** LangChain / LangGraph

```
Phase 1: Discovery & Planning ──► Phase 2: Architecture ──► Phase 3: Security Design
                                                                      │
                                                                      ▼
                                                            Ready for Implementation
```

---

## Phase 1: Discovery & Planning

### 1.1 Requirements Brainstorming

**Invoke skill:** `brainstorming`

**Context template:**
```
Building a LangChain/LLM SaaS backend with:

Stack:
- LLM Provider: OpenRouter (access to Claude, GPT-4, Llama, Mistral, etc.)
- Vector Store: Supabase with pgvector extension
- Framework: LangChain with LCEL / LangGraph for complex flows

Core Features:
- Multi-tenant API with organization/user hierarchy
- RAG pipeline with Supabase vector search
- Conversation memory stored in Supabase
- Streaming responses via SSE
- Model routing (choose model per request via OpenRouter)
- Usage tracking and cost attribution per tenant
- Rate limiting per API key

OpenRouter Specific:
- Model fallback chains (if Claude fails, try GPT-4)
- Cost tracking per model per tenant
- Model availability monitoring
- Prompt caching for supported models

Supabase Specific:
- Row Level Security (RLS) for tenant isolation
- pgvector for embeddings storage
- Real-time subscriptions for conversation updates
- Edge Functions for webhooks
- Supabase Auth integration option
```

**Output:** Validated requirements document

---

### 1.2 Technical Specification

**Invoke skill:** `writing-plans`

**Deliverables:**
- [ ] System context diagram
- [ ] Core user journeys
- [ ] API endpoint inventory
- [ ] Data entities list
- [ ] Integration points (OpenRouter, Supabase)
- [ ] Non-functional requirements (latency, scale, security)

---

## Phase 2: Architecture Analysis

### 2.1 Parallel Architecture Analysis

**Run these 4 agents IN PARALLEL:**

```
"Run these agents in parallel for LLM SaaS architecture:

1. backend-architect: Design multi-tenant architecture for LLM SaaS with:
   - Service boundaries (API, LLM Service, Vector Service)
   - Communication patterns (sync for queries, async for ingestion)
   - Multi-tenant isolation strategy
   - Caching layers for responses and embeddings

2. langchain-specialist: Design LangChain/LangGraph patterns for:
   - RAG pipeline with Supabase pgvector retriever
   - OpenRouter integration with model routing
   - Conversation memory with Supabase backend
   - Streaming chain composition with LCEL
   - Fallback chains for model failures

3. postgresql-specialist: Design Supabase schema for:
   - Multi-tenant tables (orgs, users, api_keys)
   - Conversations and messages with metadata
   - pgvector embeddings table with tenant isolation
   - Usage tracking (tokens, costs per model)
   - RLS policies for tenant data isolation

4. redis-specialist: Design caching and rate limiting:
   - Response caching strategy (by prompt hash)
   - Embedding cache for frequent queries
   - Rate limiter per API key (sliding window)
   - Session/conversation state caching
   - OpenRouter API key rotation/pooling"
```

**Output:** 4 architecture documents to merge

---

### 2.2 Architecture Patterns (Sequential)

**Invoke skills in order:**

1. **`architecture-patterns`** - Apply to our context:
   - Clean Architecture for service layer
   - Repository pattern for Supabase access
   - Strategy pattern for model selection

2. **`api-design-principles`** - Design API with:
   - REST endpoints for CRUD operations
   - SSE endpoint for streaming completions
   - Webhook endpoints for async callbacks
   - OpenAPI specification

---

### 2.3 Architecture Decisions Document

**Create ADR (Architecture Decision Records) for:**

| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| LLM Provider | OpenAI direct, Anthropic direct, OpenRouter | **OpenRouter** | Multi-model access, unified API, fallbacks |
| Vector Store | Pinecone, Qdrant, Supabase pgvector | **Supabase** | Integrated auth, RLS, real-time, cost |
| Embedding Model | OpenAI ada-002, Cohere, local | TBD | Cost vs quality analysis |
| Auth Strategy | JWT custom, Supabase Auth, Auth0 | TBD | Based on requirements |
| Caching | Redis, Supabase cache, in-memory | TBD | Based on scale needs |

---

## Phase 3: Security Design

### 3.1 Parallel Security Analysis

**Run these 3 agents IN PARALLEL:**

```
"Run security agents in parallel for LLM SaaS:

1. security-auditor: Threat model for multi-tenant LLM API including:
   - STRIDE analysis for each component
   - Attack surface mapping (API, OpenRouter, Supabase)
   - Data flow security analysis
   - Trust boundary identification

2. security-owasp-vulnerabilities: Analyze LLM-specific risks:
   - Prompt injection vectors and mitigations
   - Data leakage between tenants
   - API key exposure risks
   - Rate limiting bypass attempts
   - SSRF via document ingestion

3. soc2-specialist: Compliance requirements for:
   - Data encryption (transit and rest)
   - Access control and audit logging
   - Incident response procedures
   - Data retention policies
   - Vendor security (OpenRouter, Supabase)"
```

**Output:** Security assessment document

---

### 3.2 Security Skills (Sequential)

**Invoke skills in order:**

1. **`security-authentication-jwt`** - API authentication:
   - JWT structure for tenant/user context
   - API key to JWT exchange flow
   - Token refresh strategy
   - Scope-based permissions

2. **`security-api-security`** - API hardening:
   - Input validation on all endpoints
   - Output encoding for responses
   - CORS configuration
   - Rate limiting headers

3. **`security-input-validation`** - LLM-specific validation:
   - Prompt length limits
   - Banned pattern detection
   - Encoding normalization
   - File upload validation for RAG

4. **`security-secrets-management`** - Secrets handling:
   - OpenRouter API key storage
   - Supabase service key protection
   - Tenant API key encryption
   - Key rotation procedures

---

### 3.3 LLM Security Checklist

#### Prompt Injection Protection
- [ ] System prompt isolation (never expose to users)
- [ ] User input sandboxing in prompts
- [ ] Output validation before returning
- [ ] Jailbreak attempt detection and logging

#### Tenant Isolation
- [ ] Supabase RLS policies tested
- [ ] Vector store namespace per tenant
- [ ] Conversation data encryption per tenant
- [ ] API key scoping to tenant resources

#### Data Protection
- [ ] PII detection in prompts (optional redaction)
- [ ] Sensitive data masking in logs
- [ ] Conversation data retention limits
- [ ] Right to deletion (GDPR) support

#### OpenRouter Specific
- [ ] API key never exposed to frontend
- [ ] Model access control per tenant
- [ ] Cost alerts and limits per tenant
- [ ] Fallback model security equivalence

#### Supabase Specific
- [ ] RLS enabled on all tenant tables
- [ ] Service key only on backend
- [ ] Anon key permissions minimized
- [ ] Real-time subscriptions scoped by RLS

---

## Phase 3 Output: Security Controls Matrix

| Threat | Control | Implementation |
|--------|---------|----------------|
| Prompt Injection | Input validation + output filtering | Middleware + LangChain callback |
| Tenant Data Leak | RLS + namespace isolation | Supabase policies + vector metadata |
| API Key Theft | Encryption + rotation | Vault/KMS + auto-rotation |
| Cost Attack | Rate limiting + quotas | Redis limiter + usage tracking |
| Model Abuse | Content filtering | Pre/post chain validators |

---

## Workflow Completion Checklist

At the end of these 3 phases, you should have:

### Phase 1 Outputs
- [ ] Requirements document (validated)
- [ ] Technical specification
- [ ] User journey maps

### Phase 2 Outputs
- [ ] System architecture diagram
- [ ] Service boundary definitions
- [ ] Database schema design (Supabase)
- [ ] API specification (OpenAPI)
- [ ] Caching strategy document
- [ ] Architecture Decision Records

### Phase 3 Outputs
- [ ] Threat model (STRIDE)
- [ ] Security controls matrix
- [ ] Authentication design
- [ ] Compliance checklist
- [ ] LLM security checklist (completed)

---

## Quick Start Commands

```bash
# Start full workflow
/claude-inventory:llm-saas

# Or run phases individually:

# Phase 1
/claude-inventory:brainstorming "LLM SaaS with OpenRouter and Supabase"
/claude-inventory:writing-plans

# Phase 2 (parallel)
"Run backend-architect, langchain-specialist, postgresql-specialist, redis-specialist in parallel for OpenRouter + Supabase architecture"

# Phase 2 (sequential)
/claude-inventory:architecture-patterns
/claude-inventory:api-design-principles

# Phase 3 (parallel)
"Run security-auditor, security-owasp-vulnerabilities, soc2-specialist in parallel"

# Phase 3 (sequential)
/claude-inventory:security-authentication-jwt
/claude-inventory:security-api-security
/claude-inventory:security-input-validation
/claude-inventory:security-secrets-management
```

---

## Next Steps (Separate Workflows)

After completing this workflow, continue with:
- **Implementation Workflow** - TDD, coding, integration
- **Testing Workflow** - Unit, integration, load, security tests
- **Deployment Workflow** - Infrastructure, CI/CD, monitoring
