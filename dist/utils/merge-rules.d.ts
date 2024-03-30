import type { Linter } from 'eslint';
declare const mergeRules: (rules?: Partial<Linter.RulesRecord>) => Partial<Linter.RulesRecord>;
export default mergeRules;
