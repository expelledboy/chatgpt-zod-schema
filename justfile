set shell := ["bash", "-euo", "pipefail", "-c"]

[private]
default:
    @just --list --unsorted

data-exists:
  test -f $CHATGPT_CONVERSATION_FILE

analysis:
  bun run src/analysis.ts
