import { ESLint } from 'eslint'

import * as utils from './utils'

import type { Msg } from './utils/get-error-messages'

import type { Linter } from 'eslint'
import type { Root, Yaml } from 'mdast'
import type { VFile } from 'unified-lint-rule/lib'

type Settings = {
  rules?: Linter.RulesRecord;
  extends?: string | string[];
}

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
    const yamlBlocks: Yaml[] = utils.filterInYAMLBlocks(tree)

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
