---
name: llm-saas
description: Planning, Architecture & Security workflow for LangChain/LLM SaaS with OpenRouter + Supabase
---

# LLM SaaS Backend - Planning & Design Workflow

**Stack:** OpenRouter (LLM) + Supabase (pgvector) + LangChain

## Read the workflow first:

Load: `plugins/claude-inventory/workflows/llm-saas/SKILL.md`

## Workflow Phases

| Phase | Type | Description |
|-------|------|-------------|
| **1. Discovery** | Sequential | Brainstorming → Technical Spec |
| **2. Architecture** | Parallel + Sequential | 4 agents parallel → Skills sequential |
| **3. Security** | Parallel + Sequential | 3 agents parallel → Skills sequential |

## Ask the user:

**Which phase do you want to start?**

1. **Phase 1: Discovery & Planning**
   - Brainstorm requirements for OpenRouter + Supabase stack
   - Write technical specification

2. **Phase 2: Architecture Analysis**
   - Run 4 agents in parallel (backend, langchain, postgresql, redis)
   - Apply architecture patterns and API design

3. **Phase 3: Security Design**
   - Run 3 security agents in parallel
   - Apply security skills sequentially

4. **Full workflow** - Run all 3 phases in order

## Execution Rules:

1. Use **TodoWrite** to track progress through each phase
2. **Parallel agents**: Launch with multiple Task calls in ONE message
3. **Sequential skills**: Invoke one at a time
4. Generate **output documents** at each phase completion

## Start:

Ask user which phase to begin, then follow the workflow exactly.
