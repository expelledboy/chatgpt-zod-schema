1. Determine different types of objects in `./data/chatgpt-export/conversations.json`

- Recursively traverse the json file
- Extract the keys and their types
- Hash the keys
- Count the number of unique key sets
- Print all the "apparent" schemas found

2. Use the analysis to generate zod schemas

- Write a test which traverses the json file
- Use the zod error message to determine the schema
- Generate a zod schema for each "apparent" schema