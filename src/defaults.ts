import type { Linter } from 'eslint'

export const defaultExtends: string | string[] = [
  'plugin:yml/standard',
]

export const defaultRules = {
  indent: ['error', 2],
} satisfies Linter.RulesRecord
