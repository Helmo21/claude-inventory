---
name: llm-saas-backend
description: Complete workflow for building a secure, production-ready LangChain/LLM SaaS backend with multi-tenant architecture
---

# LLM SaaS Backend Development Workflow

A comprehensive, security-first workflow for building production-grade LangChain/LLM SaaS backends.

## Workflow Overview

```
Phase 1: Discovery & Planning ──► Phase 2: Architecture ──► Phase 3: Security Design
                                                                      │
Phase 6: Deployment ◄── Phase 5: Testing & Review ◄── Phase 4: Implementation
```

## Pre-Requisites Checklist

Before starting, gather:
- [ ] Target cloud provider (AWS/GCP/Azure)
- [ ] Expected scale (users, requests/day)
- [ ] LLM providers to support (OpenAI, Anthropic, local models)
- [ ] Compliance requirements (SOC2, GDPR, HIPAA)
- [ ] Budget constraints for infrastructure

---

## Phase 1: Discovery & Planning

### 1.1 Requirements Brainstorming (Sequential)

**Invoke skill:** `brainstorming`

**Context to provide:**
```
Building a LangChain/LLM SaaS backend with:

Core Features:
- Multi-tenant API with organization/user hierarchy
- RAG pipeline with document ingestion and vector search
- Conversation memory and session management
- Streaming responses (SSE/WebSocket)
- Usage tracking, billing integration, rate limiting

Security Requirements:
- API key management with scopes and rotation
- Data isolation between tenants
- PII detection and redaction in prompts/responses
- Audit logging for compliance
- Input validation and prompt injection protection

Performance Requirements:
- < 200ms latency for cached responses
- Support for 1000+ concurrent connections
- Horizontal scaling capability
- Circuit breakers for LLM provider failures
```

### 1.2 Technical Specification (Sequential)

**Invoke skill:** `writing-plans`

**Output:** Detailed technical specification document with:
- System boundaries and integration points
- Data flow diagrams
- API contract overview
- Technology stack decisions

---

## Phase 2: Architecture Analysis

### 2.1 Parallel Architecture Analysis

**Run these agents IN PARALLEL:**

| Agent | Task |
|-------|------|
| `backend-architect` | Design overall system architecture, service boundaries, communication patterns |
| `langchain-specialist` | LangChain/LangGraph patterns, chain composition, memory strategies |
| `database-architect-sql` | Multi-tenant data model, usage tracking schema, audit tables |
| `redis-specialist` | Caching strategy, session storage, rate limiting implementation |

**Prompt template for parallel execution:**
```
"Run these 4 agents in parallel for LLM SaaS architecture:
1. backend-architect: Design multi-tenant architecture with service boundaries
2. langchain-specialist: RAG pipeline and chain composition patterns
3. database-architect-sql: Multi-tenant schema with usage tracking
4. redis-specialist: Caching, sessions, and rate limiting design"
```

### 2.2 Architecture Patterns (Sequential)

**Invoke skills in order:**

1. `architecture-patterns` - Clean architecture, hexagonal design
2. `microservices-patterns` - Service decomposition if needed
3. `api-design-principles` - REST API design standards

---

## Phase 3: Security Design

### 3.1 Parallel Security Analysis

**Run these agents IN PARALLEL:**

| Agent | Task |
|-------|------|
| `security-auditor` | Threat modeling, OWASP top 10 review |
| `security-owasp-vulnerabilities` | Specific vulnerability analysis |
| `soc2-specialist` | Compliance requirements mapping |

**Prompt template:**
```
"Run security agents in parallel:
1. security-auditor: Threat model for multi-tenant LLM API
2. security-owasp-vulnerabilities: Injection risks in LLM context
3. soc2-specialist: Compliance checklist for SaaS platform"
```

### 3.2 Security Skills (Sequential)

**Invoke skills in order:**

1. `security-authentication-jwt` - JWT implementation for API auth
2. `security-api-security` - API hardening patterns
3. `security-input-validation` - Input sanitization strategies
4. `security-secrets-management` - API keys, LLM tokens storage

### 3.3 LLM-Specific Security Checklist

- [ ] Prompt injection detection and filtering
- [ ] Output sanitization (PII, harmful content)
- [ ] Token budget enforcement per tenant
- [ ] Model access control (which tenants can use which models)
- [ ] Conversation data encryption at rest
- [ ] Tenant data isolation in vector stores

---

## Phase 4: Implementation

### 4.1 Project Setup (Sequential)

**Invoke skill:** `superpowers-tdd`

**Initial structure:**
```
llm-saas/
├── src/
│   ├── api/           # FastAPI routes
│   ├── core/          # Business logic
│   ├── chains/        # LangChain components
│   ├── models/        # SQLAlchemy models
│   ├── repositories/  # Data access layer
│   ├── services/      # Application services
│   └── security/      # Auth, validation, rate limiting
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── infrastructure/
    ├── docker/
    ├── kubernetes/
    └── terraform/
```

### 4.2 Parallel Core Implementation

**Run these agents IN PARALLEL for core components:**

| Agent | Component | Output |
|-------|-----------|--------|
| `python-developer` | API Layer | FastAPI routes, middleware, error handling |
| `langchain-specialist` | LLM Service | RAG chains, memory, streaming |
| `postgresql-specialist` | Data Layer | Models, migrations, repositories |
| `redis-specialist` | Cache Layer | Caching service, rate limiter |

**Prompt template:**
```
"Implement these components in parallel:
1. python-developer: FastAPI API layer with auth middleware, streaming endpoints
2. langchain-specialist: RAG pipeline with LCEL, conversation memory, multi-provider support
3. postgresql-specialist: SQLAlchemy models for tenants, users, conversations, usage
4. redis-specialist: Caching layer, rate limiter, session store"
```

### 4.3 Sequential Integration

After parallel implementation, integrate with:

1. `testing-integration-patterns` - Integration test patterns
2. `error-handling-resilience` - Circuit breakers, retries, fallbacks

### 4.4 Infrastructure (Parallel)

**Run agents IN PARALLEL:**

| Agent | Task |
|-------|------|
| `terraform-specialist` | IaC for cloud resources |
| `kubernetes-architect` | K8s manifests, Helm charts |
| `github-workflow-specialist` | CI/CD pipelines |

---

## Phase 5: Testing & Review

### 5.1 Parallel Testing

**Run these agents IN PARALLEL:**

| Agent | Test Type |
|-------|-----------|
| `tdd-orchestrator` | Unit tests for all services |
| `test-engineer` | Integration tests for API |
| `load-testing-specialist` | Performance and load tests |
| `security-auditor` | Security penetration testing |

**Prompt template:**
```
"Run testing agents in parallel:
1. tdd-orchestrator: Unit tests for chains, services, repositories
2. test-engineer: Integration tests for full API flows
3. load-testing-specialist: Load test for 1000 concurrent users
4. security-auditor: Penetration test API endpoints"
```

### 5.2 Code Review (Parallel)

**Run these agents IN PARALLEL:**

| Agent | Focus |
|-------|-------|
| `code-reviewer` | Code quality, patterns, maintainability |
| `security-auditor` | Security vulnerabilities |
| `backend-architect` | Architecture compliance |

**Then invoke:** `requesting-code-review`

---

## Phase 6: Deployment

### 6.1 Pre-Deployment Checklist

- [ ] All tests passing (unit, integration, e2e)
- [ ] Security scan clean (SAST, DAST)
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] Monitoring and alerting configured
- [ ] Rollback procedure documented

### 6.2 Deployment Skills (Sequential)

1. `docker-best-practices` - Container optimization
2. `deployment-zero-downtime` - Blue-green or canary deployment
3. `kubernetes-deployment-patterns` - K8s deployment strategy

### 6.3 Observability (Parallel Agents)

**Run IN PARALLEL:**

| Agent | Task |
|-------|------|
| `observability-specialist` | Metrics, logging, tracing setup |
| `sre-specialist` | SLOs, alerting, runbooks |

---

## Quick Commands Reference

### Start Full Workflow
```
/claude-inventory:llm-saas-backend
```

### Individual Phases
```bash
# Planning only
/claude-inventory:brainstorming "LLM SaaS requirements"
/claude-inventory:writing-plans

# Architecture only
"Run backend-architect, langchain-specialist, database-architect-sql, redis-specialist in parallel"

# Security only
"Run security-auditor, security-owasp-vulnerabilities, soc2-specialist in parallel"

# Implementation
/claude-inventory:superpowers-tdd

# Testing
"Run tdd-orchestrator, test-engineer, load-testing-specialist, security-auditor in parallel"
```

---

## Customization Points

Modify this workflow for your needs:

| Aspect | Options |
|--------|---------|
| **LLM Providers** | OpenAI, Anthropic, Azure OpenAI, Local (Ollama) |
| **Vector Store** | Pinecone, Weaviate, Qdrant, pgvector |
| **Cache** | Redis, Memcached, DragonflyDB |
| **Database** | PostgreSQL, MySQL, MongoDB |
| **Deployment** | Kubernetes, ECS, Cloud Run, Lambda |
| **Compliance** | SOC2, GDPR, HIPAA, PCI-DSS |

---

## Output Artifacts

This workflow produces:

1. **Technical Specification** - Requirements and architecture doc
2. **Architecture Diagrams** - C4 diagrams, data flow
3. **API Specification** - OpenAPI/Swagger docs
4. **Security Assessment** - Threat model, controls
5. **Source Code** - Complete implementation
6. **Test Suite** - Unit, integration, e2e, load tests
7. **Infrastructure Code** - Terraform, K8s manifests
8. **CI/CD Pipeline** - GitHub Actions workflows
9. **Runbooks** - Deployment, incident response
