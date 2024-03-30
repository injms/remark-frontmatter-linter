import type { Linter } from 'eslint';
import type { Root } from 'mdast';
import type { VFile } from 'unified-lint-rule/lib';
type Settings = {
    rules?: Linter.RulesRecord;
    extends?: string | string[];
};
declare const frontmatterLinter: (settings?: Settings) => (tree: Root, vFile: VFile) => Promise<void>;
export default frontmatterLinter;
