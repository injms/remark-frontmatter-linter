import type { ESLint } from 'eslint';
import type { Position } from 'unist';
export type Msg = {
    message: string;
    nameAndRule: string;
    position: Position;
};
declare const getErrorMessages: (results: ESLint.LintResult[]) => Msg[];
export default getErrorMessages;
