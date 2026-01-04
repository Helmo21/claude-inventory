# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Claude Code Lab** - an organized repository of agents, skills, and workflows for Claude Code development. Resources are organized by functional category for easy discovery and use.

## Directory Structure

```
claude-inventory/
├── agents/           # 169 AI agents by domain
├── skills/           # 140 reusable skills by practice area
├── workflows/        # 37 development workflows by activity type
├── INVENTORY.md      # Complete resource listing
└── CLAUDE.md         # This file
```

## Agents (169 total)

Organized by domain expertise:

| Category | Description |
|----------|-------------|
| `architecture` | System architects, infrastructure designers |
| `api` | API design (REST, GraphQL, gRPC, OpenAPI) |
| `backend` | Backend patterns, fullstack, Temporal |
| `frontend` | React, Vue, Angular, Next.js |
| `languages` | Python, TypeScript, Go, Rust, Java, C++, etc. |
| `database` | SQL, NoSQL, Redis, caching |
| `devops` | CI/CD, containers, SRE, observability |
| `cloud` | AWS, Azure, GCP, RunPod |
| `ai-ml` | ML, MLOps, LangChain, LlamaIndex |
| `security` | Security audit, compliance (GDPR, SOC2, PCI-DSS) |
| `testing` | QA, TDD, Playwright, load testing |
| `data` | Data engineering, pipelines |
| `mobile` | Android, iOS, React Native |
| `blockchain` | Web3, Solidity |
| `game` | Unity, Unreal, Godot |
| `messaging` | Kafka, RabbitMQ |
| `documentation` | Technical writing, tutorials |
| `code-quality` | Code review, debugging, research |
| `git` | Version control expertise |
| `seo` | SEO optimization |
| `claude-code` | MCP, plugins, orchestr8, agent design |

## Skills (140 total)

Organized by practice area:

| Category | Description |
|----------|-------------|
| `api-design` | API patterns and documentation |
| `architecture` | Architecture patterns (CQRS, microservices, sagas) |
| `testing` | TDD, E2E, integration testing |
| `git` | Git workflows, branching, commits |
| `security` | Security patterns (JWT, OAuth, OWASP) |
| `deployment` | Deployment, rollback, Docker |
| `kubernetes` | K8s patterns, Helm, GitOps |
| `performance` | Optimization techniques |
| `data` | Data modeling, pipelines |
| `observability` | Monitoring, logging, tracing |
| `compliance` | GDPR, HIPAA, SOC2 |
| `documentation` | Technical writing |
| `ai-ml` | ML practices, LangChain, prompt engineering |
| `cloud` | IaC, Terraform, RunPod |
| `development-process` | Agile, planning, brainstorming |
| `debugging` | Systematic debugging |
| `code-quality` | Code review, refactoring |
| `content-creation` | Medium articles, diagrams |
| `claude-code` | Orchestr8, fragments, JIT loading |
| `user` | User-defined skills |

## Workflows (37 total)

Organized by activity type:

| Category | Description |
|----------|-------------|
| `development` | Feature development, bug fixing, refactoring |
| `review` | Code review, PR review, architecture review |
| `deployment` | Deploy, CI/CD setup, monitoring |
| `research` | Research, benchmarking, pattern discovery |
| `security` | Security audit, diagnostics |
| `migration` | Legacy modernization, cloud migration, cost optimization |
| `creation` | Creating agents, skills, plugins, workflows |
| `knowledge` | Knowledge capture, search, reporting |
| `validation` | Architecture and assumption validation |
| `content` | Medium stories, ML pipelines, web UI testing |

## Using Resources

### Browse by category
```bash
ls agents/architecture/
ls skills/testing/
ls workflows/deployment/
```

### Read a resource
```bash
cat agents/languages/python-developer.md
cat skills/api-design/api-design-principles
```

### Use via Claude Code

Agents (via Task tool):
```
Task(subagent_type="backend-development:backend-architect", ...)
```

Skills (via slash commands):
```
/orchestr8:fix-bug
/superpowers:test-driven-development
/backend-development:api-design-principles
```

Workflows:
```
/orchestr8:review-code
/orchestr8:deploy
```

## Source Plugins

Resources are symlinked from these plugin caches:

| Plugin | Path |
|--------|------|
| orchestr8 | `~/.claude/plugins/cache/orchestr8/orchestr8/8.0.6/` |
| superpowers | `~/.claude/plugins/cache/superpowers-marketplace/superpowers/4.0.3/` |
| claude-code-workflows | `~/.claude/plugins/cache/claude-code-workflows/` |
| claude-code-templates | `~/.claude/plugins/cache/claude-code-templates/` |
| antoine-skills | `~/.claude/plugins/cache/antoine-skills-marketplace/` |
| huggingface-skills | `~/.claude/plugins/cache/huggingface-skills/` |
| user skills | `~/.claude/skills/` |
