import type { ESLint, Linter } from 'eslint'
import type { Point, Position } from 'unist'

const NAME: string = 'frontmatter-linter'

export type Msg = {
  message: string,
  position: Position,
  nameAndRule: string,
}

const getErrorMessages = (results: ESLint.LintResult[]): Msg[] => {
  return results.map(({ messages }: ESLint.LintResult): Msg[] => {
    return messages.map((message: Linter.LintMessage): Msg => {
      const ruleId: string = message.ruleId ?? 'unknown'
      const messageText: string = message.message ?? 'unknown'
      const position: Position = {
        start: {
          line: message.line ?? 1,
          column: message.column ?? 1,
        },
        end: {
          line: message.endLine ?? 1,
          column: message.endColumn ?? 1,
        }
      }

      return {
        message: messageText,
        position,
        nameAndRule: `${NAME} : ${ruleId}`
      }
    })
  }).flat()
}

export default getErrorMessages