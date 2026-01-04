---
id: workflow-resolve-diagnostics
category: pattern
tags: [workflow, diagnostics, resolution, remediation, triage, fix, audit-response, issue-fixing, systematic]
capabilities:
  - Systematic triage and prioritization of diagnostic findings
  - Structured remediation workflow from any diagnostic source
  - Batch issue resolution with validation and prevention
useWhen:
  - Resolving findings from security audits, code quality scans, or performance profilers requiring systematic triage, fix, and verification
  - Processing npm audit, ESLint, SonarQube, or SAST tool outputs into actionable remediation with prioritized fixes
  - Handling diagnostic reports from any analysis tool needing structured resolution workflow with regression prevention
  - Batch fixing multiple issues from audit results with categorization, prioritization, and incremental validation
  - Post-audit remediation requiring systematic approach to resolve findings while maintaining system stability
estimatedTokens: 580
---

# Resolve Diagnostics Pattern

**Phases:** Collect (0-15%) → Triage (15-35%) → Resolve (35-80%) → Validate (80-100%)

Transforms diagnostic outputs (audits, linters, analyzers) into systematic fixes with validation.

## Phase 1: Collect & Categorize (0-15%)

**→ JIT Load:** orchestr8://match?query=diagnostics+analysis+categorization&categories=skill&mode=index&maxResults=3

**Activities:**
- Gather all diagnostic outputs (audit reports, linter results, analyzer findings)
- Normalize findings into common format: source, severity, location, description
- Categorize by type: security, quality, performance, compatibility, deprecation
- Group related issues (same root cause, same component, same fix)
- Create issue inventory with unique identifiers

**Issue Format:**
```
ID | Severity | Category | Source | Location | Description
D1 | Critical | Security | npm audit | lodash | Prototype pollution CVE-2021-23337
D2 | High | Quality | ESLint | api/users.ts:45 | Unused variable 'response'
```

**→ Checkpoint:** All diagnostics collected and categorized

## Phase 2: Triage & Prioritize (15-35%)

**→ JIT Load:** orchestr8://skills/security-diagnostics-resolution

**Parallel tracks:**
- **Risk Assessment:** Evaluate severity, exploitability, blast radius per finding
- **Effort Estimation:** Assess fix complexity (patch, refactor, replace)
- **Dependency Analysis:** Identify fix order (blocking dependencies)

**Prioritization Matrix:**
| Priority | Severity | Effort | Action |
|----------|----------|--------|--------|
| P0 | Critical | Any | Fix immediately |
| P1 | High | Low-Med | Fix in current session |
| P2 | Medium | Low | Fix in current session |
| P3 | Medium | High | Plan for next session |
| P4 | Low | Any | Backlog with review date |

**Activities:**
- Apply prioritization matrix to each finding
- Group fixes by component/file for efficiency
- Identify quick wins (high impact, low effort)
- Flag false positives or accepted risks
- Create resolution order: P0 → P1 → P2 → P3

**→ Checkpoint:** Prioritized resolution plan ready

## Phase 3: Resolve (35-80%)

**→ JIT Load:** orchestr8://workflows/workflow-fix-bug

**For each issue (in priority order):**

1. **Understand:** Review finding context and root cause
2. **Test:** Write failing test capturing the issue (when applicable)
3. **Fix:** Apply targeted fix addressing root cause
4. **Verify:** Confirm fix resolves finding, test passes
5. **Commit:** Atomic commit with issue reference

**Resolution Strategies by Category:**

**Security:**
- Dependency updates, code fixes, configuration changes
- Load: orchestr8://match?query=security+remediation+${issue-type}&mode=index&maxResults=3

**Quality:**
- Refactoring, cleanup, pattern improvements
- Load: orchestr8://skills/quality-refactoring-techniques

**Performance:**
- Optimization, caching, algorithm improvements
- Load: orchestr8://match?query=performance+optimization&mode=index&maxResults=3

**Batch Processing:**
- Group same-type fixes for efficiency
- Apply automated fixes where safe (npm audit fix, eslint --fix)
- Manual review for breaking changes

**→ Checkpoint:** All P0-P2 issues resolved, tests pass

## Phase 4: Validate & Prevent (80-100%)

**→ JIT Load:** orchestr8://match?query=testing+validation+regression&categories=skill&mode=index&maxResults=3

**Parallel tracks:**
- **Verification:** Re-run all diagnostic tools, confirm zero findings for fixed issues
- **Testing:** Full test suite passes, no regressions introduced
- **Prevention:** Add CI checks, update linting rules, document patterns

**Activities:**
- Re-execute original diagnostic commands
- Verify finding counts reduced as expected
- Run full test suite (unit, integration)
- Update CI/CD to prevent recurrence
- Document accepted risks with justification and review dates
- Create team knowledge: common issues and fixes

**Prevention Checklist:**
- [ ] Diagnostic tools added to CI pipeline
- [ ] Severity thresholds configured (fail on high+)
- [ ] Pre-commit hooks for linting
- [ ] Dependency update automation enabled
- [ ] Team notified of new patterns/rules

**→ Checkpoint:** All fixes validated, prevention measures in place

## Parallelism

- **Independent:** Risk assessment + Effort estimation + Dependency analysis (Phase 2)
- **Independent:** Verification + Testing + Prevention (Phase 4)
- **Sequential:** Collect → Triage → Resolve → Validate (must complete in order)
- **Batch parallel:** Multiple non-conflicting fixes can be worked simultaneously

## Success Criteria

✅ All diagnostic outputs collected and categorized
✅ Prioritized resolution plan created
✅ P0-P2 issues resolved with tests
✅ Diagnostic tools show reduced/zero findings
✅ Full test suite passes
✅ Prevention measures implemented
✅ Accepted risks documented with review dates
