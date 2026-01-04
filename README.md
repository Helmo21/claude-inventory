# Claude Inventory

A complete Claude Code plugin with **169 agents**, **140 skills**, and **37 workflows** for software development.

## Installation

### Quick Install

```bash
# Add the marketplace
/plugin marketplace add Helmo21/claude-inventory

# Install the plugin
/plugin install claude-inventory@antoine-inventory
```

### Manual Install

Add to your `~/.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "claude-inventory@antoine-inventory": true
  },
  "extraKnownMarketplaces": {
    "antoine-inventory": {
      "source": {
        "source": "github",
        "repo": "Helmo21/claude-inventory"
      }
    }
  }
}
```

Then restart Claude Code.

### Verify Installation

```bash
/plugin list
```

You should see `claude-inventory@antoine-inventory` in the list.

## Usage

### Skills (Slash Commands)

```bash
# Development process
/claude-inventory:brainstorming
/claude-inventory:systematic-debugging
/claude-inventory:superpowers-tdd

# Architecture
/claude-inventory:architecture-patterns
/claude-inventory:microservices-patterns
/claude-inventory:api-design-principles

# Git workflows
/claude-inventory:git-workflow
/claude-inventory:git-pr-workflow
```

### Agents (via Task tool)

Agents are invoked through Claude's Task tool:

```
Task(subagent_type="claude-inventory:python-developer", prompt="...")
Task(subagent_type="claude-inventory:backend-architect", prompt="...")
Task(subagent_type="claude-inventory:security-auditor", prompt="...")
```

Or simply ask Claude:
> "Use the python-developer agent to review this code"

### Workflows

Workflows combine multiple skills and agents:

```bash
/claude-inventory:workflow-add-feature
/claude-inventory:workflow-fix-bug
/claude-inventory:workflow-code-review
/claude-inventory:workflow-security-audit
```

## Chaining Skills (Sequential)

Skills are designed to be chained together:

```bash
# Step 1: Plan the feature
/claude-inventory:brainstorming "user authentication"

# Step 2: Design architecture
/claude-inventory:architecture-patterns

# Step 3: Implement with TDD
/claude-inventory:superpowers-tdd

# Step 4: Review code
/claude-inventory:requesting-code-review
```

## Parallel Agents

Run multiple agents simultaneously for faster analysis:

> "Run code-reviewer, security-auditor, and backend-architect agents in parallel on this PR"

Claude will launch all three agents at once and combine their results.

## Contents

### Agents (169)

| Category | Count | Examples |
|----------|-------|----------|
| Languages | 28 | python-developer, typescript-developer, go-developer, rust-developer |
| Architecture | 14 | backend-architect, kubernetes-architect, event-sourcing-architect |
| Frontend | 9 | react-specialist, vue-specialist, nextjs-specialist |
| Backend | 2 | fullstack-developer, temporal-python-pro |
| Database | 14 | postgresql-specialist, mongodb-specialist, redis-specialist |
| DevOps | 9 | terraform-specialist, github-workflow-specialist, sre-specialist |
| Cloud | 4 | aws-specialist, azure-specialist, gcp-specialist |
| Security | 10 | security-auditor, gdpr-specialist, soc2-specialist |
| Testing | 10 | playwright-specialist, tdd-orchestrator, load-testing-specialist |
| AI/ML | 8 | langchain-specialist, mlops-specialist, ml-engineer |
| API | 6 | graphql-specialist, grpc-specialist, openapi-specialist |
| Data | 5 | data-engineer, data-engineer-big-data |
| Mobile | 4 | mobile-react-native, swiftui-specialist |
| Game | 5 | unity-specialist, unreal-specialist, godot-specialist |
| Blockchain | 4 | solidity-specialist, web3-specialist |
| Documentation | 4 | tutorial-engineer, medium-writer-expert |
| Claude Code | 14 | mcp-expert, plugin-developer, orchestr8-expert |
| Code Quality | 11 | code-reviewer, debugger, legacy-system-analyst |
| Git | 2 | git-expert, git-troubleshooter |
| SEO | 4 | seo-meta-optimizer, seo-keyword-strategist |
| Messaging | 2 | kafka-specialist, rabbitmq-specialist |

### Skills (140)

| Category | Examples |
|----------|----------|
| API Design | api-design-principles, api-design-rest, error-handling-api-patterns |
| Architecture | architecture-patterns, microservices-patterns, saga-orchestration, cqrs-implementation |
| Testing | superpowers-tdd, testing-strategies, testing-integration-patterns |
| Git | git-workflow, git-pr-workflow, git-branching-strategies |
| Security | security-owasp-top10, security-authentication-jwt, security-api-security |
| Deployment | docker-best-practices, deployment-zero-downtime, cicd-pipeline-optimization |
| Kubernetes | kubernetes-deployment-patterns, helm-chart-scaffolding, gitops-workflow |
| Performance | performance-optimization, performance-api-optimization |
| Observability | observability-distributed-tracing, observability-metrics-prometheus |
| Compliance | compliance-gdpr-implementation, compliance-soc2-controls |
| AI/ML | langchain, langgraph-docs, model-trainer |
| Claude Code | using-superpowers, writing-skills, subagent-driven-development |
| Debugging | systematic-debugging, error-handling-resilience |
| Development Process | brainstorming, writing-plans, executing-plans |

### Workflows (37)

| Category | Workflows |
|----------|-----------|
| Development | workflow-add-feature, workflow-fix-bug, workflow-refactor, workflow-new-project |
| Review | workflow-code-review, workflow-review-pr, workflow-review-architecture |
| Deployment | workflow-deploy, workflow-setup-cicd, workflow-setup-monitoring |
| Security | workflow-security-audit, workflow-resolve-diagnostics |
| Research | workflow-research, workflow-benchmark, workflow-compare-approaches |
| Migration | workflow-modernize-legacy, workflow-cloud-migration-planning, workflow-optimize-costs |
| Creation | workflow-create-agent, workflow-create-skill, workflow-create-plugin |
| Knowledge | workflow-knowledge-capture, workflow-knowledge-search, workflow-knowledge-report |
| Validation | workflow-validate-architecture, workflow-validate-assumptions |
| Content | workflow-create-medium-story, workflow-build-ml-pipeline, workflow-test-web-ui |

## Browse Resources

```bash
# List all agents by category
ls agents/

# List all skills by category
ls skills/

# List all workflows by category
ls workflows/

# Read a specific resource
cat agents/languages/python-developer.md
cat skills/testing/superpowers-tdd/SKILL.md
```

## Updates

To update the plugin after new releases:

```bash
/plugin marketplace update
```

## License

MIT
