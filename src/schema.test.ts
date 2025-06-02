import { expect, test } from 'bun:test'
import { ContentPartsSchema, parseChatExport } from './schema'
import data from './data'

test('parseContentParts', () => {
  const allObjectParts = data
    .flatMap((thread: any) =>
      Object.values(thread.mapping).flatMap((mapping: any) =>
        !mapping.message ? [] : mapping.message.content.parts,
      ),
    )
    .filter((part: any) => typeof part === 'object')

  expect(allObjectParts.length).toBeGreaterThan(0)

  for (const part of allObjectParts) {
    const result = ContentPartsSchema.safeParse(part)

    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join('.')
        console.log(path, issue.message, part.content_type)
      }
    }
  }

  for (const part of allObjectParts) {
    expect(() => ContentPartsSchema.parse(part)).not.toThrow()
  }
})

test('parseChatExport', () => {
  expect(() => parseChatExport(data)).not.toThrow()
})
