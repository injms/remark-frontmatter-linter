import { ESLint } from 'eslint'

import * as utils from './utils/index'

import type { Msg } from './utils/get-error-messages'

import type { Linter } from 'eslint'
import type { Root, YAML } from 'mdast'
import type { VFile } from 'unified-lint-rule/lib'

interface Settings {
  rules?: Partial<Linter.RulesRecord>,
  extends?: string | string[],
}

const NAME: string = 'frontmatter-linter'

const frontmatterLinter = (settings: Settings = {}) => {
  return async (tree: Root, vFile: VFile): Promise<void> => {
    const eslint: ESLint = new ESLint({
      useEslintrc: false,
      baseConfig: {
        plugins: ['yml'],
        extends: utils.overrideExtends(settings.extends),
        rules: utils.mergeRules(settings.rules),
        overrides: [
          {
            files: ['*.md'],
            parser: 'yaml-eslint-parser',
          },
        ],
      },
    })

    const filePath: string = utils.getFilePath(vFile)

    const yamlBlocks: YAML[] = utils.filterInYAMLBlocks(tree)

    if (yamlBlocks.length > 1) {
      vFile.fail(
        `More than one block of YAML - expected 1, received ${yamlBlocks.length}`,
        { line: 1, column: 1 },
        NAME,
      )
    }

    if (yamlBlocks.length === 1) {
      const results: ESLint.LintResult[] = await eslint.lintText(
        yamlBlocks[0].value,
        {
          filePath,
        },
      )

      const errorMessages: Msg[] = utils.getErrorMessages(results)

      errorMessages.forEach(({ message, position, nameAndRule }: Msg): void => {
        vFile.message(message, position, nameAndRule)
      })
    }
  }
}

export default frontmatterLinter
