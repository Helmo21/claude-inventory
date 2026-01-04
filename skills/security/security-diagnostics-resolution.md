---
id: security-diagnostics-resolution
category: skill
tags: [security, diagnostics, vulnerability-remediation, npm-audit, sast, code-scanning, security-fixes]
capabilities:
  - Systematic security diagnostic triage and prioritization
  - Dependency vulnerability remediation strategies
  - Static analysis finding resolution patterns
  - IDE security warning fix workflows
  - Security issue categorization and severity assessment
relatedResources:
  - orchestr8://skills/security-owasp-top10
  - orchestr8://skills/security-input-validation
  - orchestr8://skills/security-api-security
  - orchestr8://skills/security-secrets-management
estimatedTokens: 580
useWhen:
  - Resolving npm audit or yarn audit security vulnerabilities with systematic upgrade strategies and breaking change handling
  - Fixing IDE security diagnostics from ESLint security plugins, TypeScript strict mode, or VS Code security extensions
  - Remediating SAST findings from SonarQube, Semgrep, CodeQL, or Snyk Code with proper fix verification
  - Triaging security vulnerabilities by severity (critical, high, medium, low) and exploitability context
  - Creating remediation plans for multiple security issues balancing risk, effort, and breaking changes
  - Handling dependency conflicts during security upgrades with resolution strategies and testing
---

# Security Diagnostics Resolution

## Overview

This skill provides a systematic approach to resolving security issues identified by diagnostic tools including IDE warnings, dependency audits, and static analysis scanners. It covers triage, prioritization, and remediation strategies.

## Diagnostic Sources

### IDE/Editor Diagnostics
- **ESLint Security Plugins**: eslint-plugin-security, eslint-plugin-no-secrets
- **TypeScript Strict Mode**: Type safety preventing injection vectors
- **VS Code Extensions**: Security vulnerability highlights, CodeQL
- **SonarLint**: Real-time SAST feedback in IDE

### Dependency Audit Tools
- **npm audit / yarn audit**: Built-in package vulnerability scanning
- **Snyk**: Comprehensive dependency and container scanning
- **Dependabot**: GitHub automated security updates
- **OWASP Dependency-Check**: Java/Maven/Gradle focused

### Static Analysis (SAST)
- **SonarQube**: Multi-language code quality and security
- **Semgrep**: Pattern-based code scanning
- **CodeQL**: GitHub's semantic code analysis
- **Bandit**: Python-specific security linter

## Triage and Prioritization

### Severity Assessment Matrix

| Severity | CVSS Score | Response Time | Examples |
|----------|------------|---------------|----------|
| Critical | 9.0-10.0 | Immediate (hours) | RCE, SQL injection in auth |
| High | 7.0-8.9 | 1-3 days | Auth bypass, data exposure |
| Medium | 4.0-6.9 | 1-2 weeks | XSS, CSRF, info disclosure |
| Low | 0.1-3.9 | Next sprint | Minor info leaks, DoS |

### Prioritization Factors

1. **Exploitability**: Is the vulnerable code path reachable?
2. **Attack Surface**: Is the component exposed to untrusted input?
3. **Data Sensitivity**: What data could be compromised?
4. **Fix Complexity**: Breaking changes vs. patch updates
5. **Transitive vs. Direct**: Direct deps are higher priority

### Triage Questions

```markdown
For each finding, assess:
1. Is this code actually executed in production?
2. Does untrusted input reach the vulnerable code?
3. What's the blast radius if exploited?
4. Is there a simple fix or workaround available?
5. Are there compensating controls in place?
```

## Dependency Vulnerability Resolution

### npm audit Workflow

```bash
# Step 1: Run audit and capture output
npm audit --json > audit-report.json

# Step 2: View human-readable summary
npm audit

# Step 3: Attempt automatic fixes (safe patches)
npm audit fix

# Step 4: Review breaking changes (major versions)
npm audit fix --dry-run --force

# Step 5: Manual resolution for complex cases
npm update package-name
# OR
npm install package-name@specific-version
```

### Resolution Strategies

#### Strategy 1: Direct Upgrade (Preferred)
```bash
# Check available versions
npm view lodash versions

# Upgrade to patched version
npm install lodash@4.17.21

# Verify fix
npm audit
```

#### Strategy 2: Transitive Dependency Override
```json
// package.json - npm overrides (npm 8.3+)
{
  "overrides": {
    "vulnerable-package": "^2.0.0"
  }
}

// package.json - yarn resolutions
{
  "resolutions": {
    "**/vulnerable-package": "^2.0.0"
  }
}
```

#### Strategy 3: Package Replacement
```bash
# When package is unmaintained
npm uninstall vulnerable-package
npm install maintained-alternative

# Update imports throughout codebase
```

#### Strategy 4: Acceptable Risk Documentation
```markdown
<!-- SECURITY.md or audit exceptions -->
## Accepted Vulnerabilities

### CVE-2023-XXXXX in dev-only-package
- **Severity**: Medium
- **Justification**: Development dependency only, not shipped to production
- **Compensating Control**: CI environment isolated
- **Review Date**: 2024-06-01
```

### Handling Breaking Changes

```typescript
// Before: vulnerable API
import { parse } from 'old-package';
const result = parse(userInput);

// After: upgraded API with breaking changes
import { parse } from 'new-package';
const result = parse(userInput, {
  strict: true,  // New required option
  encoding: 'utf-8'
});
```

**Testing Checklist After Upgrades:**
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual smoke test critical paths
- [ ] Check for deprecation warnings
- [ ] Verify no runtime errors in logs

## IDE Security Diagnostics Resolution

### ESLint Security Rules

```javascript
// eslint-plugin-security warnings and fixes

// Rule: security/detect-object-injection
// Warning: Bracket notation with variable
obj[userInput] = value;
// Fix: Validate against whitelist
const allowedKeys = ['name', 'email', 'phone'];
if (allowedKeys.includes(userInput)) {
  obj[userInput] = value;
}

// Rule: security/detect-non-literal-fs-filename
// Warning: Dynamic file path
fs.readFile(userPath, callback);
// Fix: Validate and sanitize path
const safePath = path.join(UPLOAD_DIR, path.basename(userPath));
if (!safePath.startsWith(UPLOAD_DIR)) throw new Error('Invalid path');
fs.readFile(safePath, callback);

// Rule: security/detect-eval-with-expression
// Warning: eval() with dynamic content
eval(userCode);
// Fix: Use safer alternatives
const sandbox = new vm.Script(userCode);
// Or use a sandboxed interpreter
```

### TypeScript Security Patterns

```typescript
// Enable strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// Type-safe input handling
interface UserInput {
  email: string;
  role: 'user' | 'admin';  // Prevents injection of arbitrary roles
}

function processUser(input: unknown): UserInput {
  // Runtime validation with Zod
  return userSchema.parse(input);
}
```

## SAST Finding Resolution

### Common SAST Categories

#### SQL Injection (CWE-89)
```typescript
// Finding: SQL injection vulnerability
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Fix: Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

#### Cross-Site Scripting (CWE-79)
```typescript
// Finding: XSS vulnerability
element.innerHTML = userContent;

// Fix: Use textContent or sanitize
element.textContent = userContent;
// OR with sanitization
element.innerHTML = DOMPurify.sanitize(userContent);
```

#### Path Traversal (CWE-22)
```typescript
// Finding: Path traversal vulnerability
const filePath = `./uploads/${filename}`;

// Fix: Validate path stays within allowed directory
const safeName = path.basename(filename);
const filePath = path.join(UPLOAD_DIR, safeName);
const resolved = path.resolve(filePath);
if (!resolved.startsWith(path.resolve(UPLOAD_DIR))) {
  throw new Error('Invalid file path');
}
```

#### Hardcoded Secrets (CWE-798)
```typescript
// Finding: Hardcoded credentials
const apiKey = 'sk-abc123...';

// Fix: Use environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error('API_KEY not configured');
```

### Verification After Fixes

```bash
# Re-run the specific scanner
npx semgrep --config=auto ./src

# Verify finding is resolved
npx semgrep --config=auto ./src | grep -i "sql injection"
# Should return no results

# Run full security test suite
npm run test:security
```

## Resolution Workflow

### Step-by-Step Process

1. **Collect Diagnostics**
   ```bash
   npm audit --json > npm-audit.json
   npx semgrep --json --output=sast.json ./src
   ```

2. **Categorize by Source**
   - Dependency vulnerabilities
   - Code-level security issues
   - Configuration problems

3. **Prioritize by Risk**
   - Critical/High: Fix immediately
   - Medium: Schedule for current sprint
   - Low: Add to backlog with review date

4. **Apply Fixes**
   - Start with automated fixes
   - Manual remediation for complex issues
   - Document accepted risks

5. **Verify Resolution**
   - Re-run diagnostic tools
   - Execute test suite
   - Peer review changes

6. **Prevent Recurrence**
   - Add to CI/CD pipeline
   - Update linting rules
   - Document patterns for team

## Best Practices

### Do's
- Fix critical vulnerabilities immediately
- Test thoroughly after dependency upgrades
- Document accepted risks with justification
- Use automated tools in CI/CD pipeline
- Keep dependencies up to date proactively

### Don'ts
- Don't ignore findings without assessment
- Don't force-upgrade without testing
- Don't disable security rules globally
- Don't commit secrets even temporarily
- Don't skip transitive dependency analysis

## Common Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Blindly running `npm audit fix --force` | May introduce breaking changes | Review changes with `--dry-run` first |
| Ignoring dev dependencies | Can affect CI/CD security | Assess all vulnerabilities |
| Suppressing without review | Hidden vulnerabilities accumulate | Require justification for suppressions |
| One-time audit only | New vulnerabilities emerge | Schedule regular audits |
| Fixing symptoms not causes | Issue recurs | Address root cause patterns |

## Related Skills

- **OWASP Top 10**: `orchestr8://skills/security-owasp-top10` - Understanding vulnerability categories
- **Input Validation**: `orchestr8://skills/security-input-validation` - Prevention patterns
- **API Security**: `orchestr8://skills/security-api-security` - Securing API endpoints
- **Secrets Management**: `orchestr8://skills/security-secrets-management` - Handling credentials
