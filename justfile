set shell := ["bash", "-euo", "pipefail", "-c"]

export CHATGPT_CONVERSATION_FILE := "data/chatgpt-export/conversations.json"

[private]
default:
    @just --list --unsorted

conversations-file-exists:
  test -f {{CHATGPT_CONVERSATION_FILE}}
