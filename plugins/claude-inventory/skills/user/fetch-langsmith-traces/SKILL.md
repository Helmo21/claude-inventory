---
name: fetch-langsmith-traces
description: Fetch and analyze LangSmith traces and threads using the langsmith-fetch CLI. Use when the user says "grab the langsmith trace", "fetch langsmith trace", "get the trace from langsmith", "show me the langsmith logs", or similar requests to retrieve LangSmith execution data.
allowed-tools: Bash, Read, Glob
---

# Fetching LangSmith Traces

Use the `langsmith-fetch` CLI to retrieve traces and threads from LangSmith for analysis.

## Prerequisites

- `LANGSMITH_API_KEY` environment variable set, OR stored via `langsmith-fetch config set api-key <key>`
- For threads: Project UUID required (via config or `--project-uuid` flag)

## Common Commands

### Fetch Recent Traces (Recommended)

Save traces to a directory (preferred approach):

```bash
langsmith-fetch traces ./traces --limit 1      # Most recent trace
langsmith-fetch traces ./traces --limit 10     # Last 10 traces
```

### Fetch a Specific Trace by ID

```bash
langsmith-fetch trace <trace-id>
langsmith-fetch trace <trace-id> --format json
langsmith-fetch trace <trace-id> --include-metadata --include-feedback
```

### Fetch Recent Threads

```bash
langsmith-fetch threads ./threads --limit 1
langsmith-fetch threads ./threads --limit 10
```

### Fetch a Specific Thread by ID

```bash
langsmith-fetch thread <thread-id>
langsmith-fetch thread <thread-id> --project-uuid <uuid>
```

## Temporal Filtering

Filter by time to get recent traces only:

```bash
langsmith-fetch traces ./traces --last-n-minutes 30
langsmith-fetch traces ./traces --since 2025-12-09T10:00:00Z
langsmith-fetch traces ./traces --limit 10 --last-n-minutes 60
```

## Output Formats

- `--format pretty` - Human-readable with Rich panels (default)
- `--format json` - Pretty-printed JSON with syntax highlighting
- `--format raw` - Compact single-line JSON for piping/parsing

## Configuration

View and manage settings:

```bash
langsmith-fetch config show
langsmith-fetch config set project-uuid <uuid>
langsmith-fetch config set api-key <key>
langsmith-fetch config set base-url <url>  # For EU: https://eu.api.smith.langchain.com
```

## Workflow

1. **Fetch traces to a directory**: `langsmith-fetch traces ./traces --limit 1`
2. **Read the JSON file**: The trace is saved as `<trace-id>.json`
3. **Analyze the messages**: Review the conversation flow, tool calls, and responses

## Understanding Trace Output

A trace JSON file contains a list of messages with:
- `role`: user, assistant, or tool
- `content`: The message content
- `tool_calls`: Array of tool invocations (for assistant messages)
- `tool_call_id`: Reference to the tool call being responded to (for tool messages)

## Additional Options

- `--include-metadata`: Include run status, timing, token counts, and costs
- `--include-feedback`: Include feedback data (requires extra API call)
- `--no-progress`: Disable progress bar
- `--max-concurrent N`: Control parallel fetches (default: 5)
