---
name: llm-saas
description: Start the LLM SaaS Backend development workflow - a comprehensive guide for building secure, production-ready LangChain/LLM applications
---

# LLM SaaS Backend Workflow

You are starting the **LLM SaaS Backend Development Workflow**.

## First, read the full workflow:

Read the workflow skill at: `plugins/claude-inventory/workflows/llm-saas/SKILL.md`

## Then ask the user:

1. **What phase would you like to start with?**
   - Phase 1: Discovery & Planning (brainstorming, requirements)
   - Phase 2: Architecture Analysis (parallel agents)
   - Phase 3: Security Design (threat modeling)
   - Phase 4: Implementation (TDD, coding)
   - Phase 5: Testing & Review (parallel test agents)
   - Phase 6: Deployment (infrastructure, CI/CD)

2. **What's your project context?**
   - Target cloud provider
   - Expected scale
   - LLM providers to support
   - Compliance requirements

## Execution Rules:

1. **Always use TodoWrite** to track progress through phases
2. **Parallel agents**: Launch with multiple Task tool calls in ONE message
3. **Sequential skills**: Invoke one at a time, wait for completion
4. **Security checkpoints**: Run security-auditor after each major phase
5. **Documentation**: Generate artifacts at each phase completion

## Start now:

Ask the user which phase they want to begin with and gather their project context.
