import type { Linter } from 'eslint'

import { defaultRules } from '../defaults'

const mergeRules = (rules: Partial<Linter.RulesRecord> = {}): Partial<Linter.RulesRecord> => {
  return {
    ...defaultRules,
    ...rules,
  }
}

export default mergeRules
