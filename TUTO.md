Chaining Skills (Sequential)

  Skills are invoked one after another. Here's an example workflow:

  User: I need to add a user authentication feature

  # Step 1: Planning skill
  /orchestr8:brainstorming "user authentication feature"
  → Produces: Requirements, approach, considerations

  # Step 2: Design skill
  /backend-development:architecture-patterns
  → Produces: Architecture decisions

  # Step 3: Implementation skill
  /orchestr8:add-feature "implement JWT auth based on plan"
  → Produces: Code implementation

  # Step 4: Testing skill
  /superpowers:test-driven-development
  → Produces: Test suite

  # Step 5: Review skill
  /orchestr8:review-code
  → Produces: Code review feedback

  In practice, just ask naturally:
  "Add JWT authentication. Use brainstorming first, then architecture-patterns, then add-feature, then TDD"

  ---
  Parallel Agents (Simultaneous)

  Agents CAN run in parallel using multiple Task calls in one message:

  Example: Parallel Code Analysis

  Me: "Review this PR from multiple angles in parallel"

  I launch simultaneously:
  ├── Task(subagent_type="code-reviewer", prompt="Review code quality")
  ├── Task(subagent_type="backend-security-coder", prompt="Security audit")
  └── Task(subagent_type="backend-architect", prompt="Architecture review")

  All 3 run at the same time, return results together.

  Example: Parallel Research

  Me: "Compare React vs Vue vs Svelte"

  I launch simultaneously:
  ├── Task(subagent_type="Explore", prompt="Find React patterns in codebase")
  ├── Task(subagent_type="Explore", prompt="Find Vue patterns in codebase")
  └── Task(subagent_type="Explore", prompt="Find Svelte patterns in codebase")

  How to Request Parallel Execution

  Just tell me explicitly:
  "Run these agents in parallel: code-reviewer for quality, security audit for vulnerabilities, and architecture review for design patterns"