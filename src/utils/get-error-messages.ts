import type { ESLint, Linter } from 'eslint'
import type { Position } from 'unist'

const NAME: string = 'frontmatter-linter'

export interface Msg {
  message: string,
  nameAndRule: string,
  position: Position,
}

const getErrorMessages = (results: ESLint.LintResult[]): Msg[] => {
  return results.map(({ messages }: ESLint.LintResult): Msg[] => {
    return messages.map((message: Linter.LintMessage): Msg => {
      const ruleId: string = message.ruleId ?? 'unknown'
      const messageText: string = message.message ?? 'unknown'

      // NOTE: because the markdown file has a frontmatter section, the line
      // number is off by one. So we add one to the line number to make the
      // position correct.
      const position: Position = {
        start: {
          line: message.line + 1 ?? 1,
          column: message.column ?? 1,
        },
        end: {
          line: (message.endLine ?? message.line) + 1 ?? 1,
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