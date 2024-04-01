import type { ESLint, Linter } from 'eslint'
import type { Position } from 'unist'

const NAME: string = 'frontmatter-linter'

export type Msg = {
  message: string;
  nameAndRule: string;
  position: Position;
}

const getErrorMessages = (results: ESLint.LintResult[]): Msg[] => {
  return results.map(({ messages }: ESLint.LintResult): Msg[] => {
    return messages.map((message: Linter.LintMessage): Msg => {
      const ruleId: string = message.ruleId ?? 'unknown'
      const messageText: string = message.message ?? 'unknown'

      // NOTE: The line number we need to report needs 1 added to it -  this is
      // because the markdown file has a line of dashes (or pluses, or something
      // else) to indicate the start of the frontmatter section before the
      // actual YAML starts.
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