import type { Linter } from 'eslint'

export const defaultExtends: string | string[] = [
  'plugin:yml/standard',
]

export const defaultRules: Partial<Linter.RulesRecord> = {
  indent: ['error', 2],
}
