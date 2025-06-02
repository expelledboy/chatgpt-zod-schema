import { createHash } from 'crypto'
import data from './data'

type PossibleSchema = {
  count: number
  keys: string[]
  example: Record<string, any>
  paths: string[]
}

const keySet = new Map<string, PossibleSchema>()

const hashKeys = (keys: string[]) => {
  return createHash('md5').update(keys.sort().join(',')).digest('hex')
}

const extractSchema = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, typeof value]),
  )
}

function visit(obj: any, path: string[] = []) {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    const keys = Object.keys(obj)
    const keyHash = hashKeys(keys)
    const pathStr = path.join('.') || '(root)'
    if (!keySet.has(keyHash)) {
      keySet.set(keyHash, {
        count: 1,
        keys,
        example: extractSchema(obj),
        paths: [pathStr],
      })
    } else {
      const entry = keySet.get(keyHash)!
      entry.count++
      if (!entry.paths.includes(pathStr)) entry.paths.push(pathStr)
    }
    for (const [k, v] of Object.entries(obj)) visit(v, [...path, k])
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) visit(obj[i], [...path, `[${i}]`])
  }
}

visit(data)

console.log('Unique key sets:', keySet.size)

keySet.forEach((v, h) => {
  const aPath = v.paths[0]

  // skip mappings
  if (aPath.endsWith('mapping')) return

  console.log('--------------------------------')
  console.log(aPath)
  console.log(v.example)
})
