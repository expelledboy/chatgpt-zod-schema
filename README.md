# ChatGPT Zod Schema

This project provides Zod schemas for validating ChatGPT conversation exports. The goal is to collaboratively build a comprehensive schema for type-safe data handling.

## How to Contribute

Help us improve the schema by testing it with your ChatGPT export.

### 1. Get Your ChatGPT Export

1.  In ChatGPT: `Settings` > `Data controls` > `Export data`.
2.  Download the `.zip` file from the email and extract `conversations.json`.

### 2. Set Up the Project

```bash
# Install bun (if you haven't already)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Install just (if you haven't already)
# See https://just.systems/man/en/chapter_4.html for installation instructions
# e.g. on macOS:
brew install just
```

Alternatively, if you use Nix and direnv:
```bash
direnv allow . # uses flake.nix
```

### 3. Configure Your Data File

The application reads the path to your `conversations.json` file from the `CHATGPT_CONVERSATION_FILE` environment variable.

1.  Place your `conversations.json` file in the project (e.g., in the root directory or a `data/` subdirectory).
2.  Set the `CHATGPT_CONVERSATION_FILE` environment variable to point to this file.
    You can do this by creating a `.env` file in the project root with the following content:
    ```env
    CHATGPT_CONVERSATION_FILE=./path/to/your/conversations.json
    ```
    If you use `direnv`, it will automatically load this `.env` file (as configured in `.envrc`).
    The `src/data.ts` script will fall back to `./data/chatgpt-export/conversations.json` if the environment variable is not set.

### 4. Run Tests

Execute the tests to validate your data against the schema:
```bash
just test
```

### 5. Improve the Schema

If tests fail:
1.  Examine the Zod validation errors in the test output (they show the problematic `path` and `message`).
2.  Update the Zod schemas in `src/schema.ts` to accommodate your data structure (e.g., add missing fields, mark fields as optional, adjust types).
3.  Re-run `just test` until all tests pass.

### 6. (Optional) Analyze Data Structure

To understand the structure of your export, run the analysis script:
```bash
just analysis
```
This script identifies unique object shapes in your data, which can help in refining or adding new schemas.

### 7. Share Your Improvements

Open a Pull Request with your changes to `src/schema.ts`.

## Project Structure

*   `README.md`: This file.
*   `justfile`: Task definitions for `just`.
*   `flake.nix`, `.envrc`: For Nix and direnv based environment setup.
*   `src/`:
    *   `schema.ts`: **The Zod schema definitions (the main file you'll edit).**
    *   `schema.test.ts`: Tests for the schemas.
    *   `analysis.ts`: Script for data structure analysis.
    *   `data.ts`: Loads your `conversations.json` based on the `CHATGPT_CONVERSATION_FILE` environment variable.
*   `conversations.json`: (You provide this) Your exported ChatGPT data.

---

Let's build the most accurate Zod schema for ChatGPT exports together!
