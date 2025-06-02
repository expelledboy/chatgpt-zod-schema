import fs from 'fs'

// env sourced via .env.defaults (direnv)
const filePath =
  process.env.CHATGPT_CONVERSATION_FILE ||
  './data/chatgpt-export/conversations.json'

if (!fs.existsSync(filePath)) {
  throw new Error(`File not found: ${filePath}`)
}

const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as any

export default data
