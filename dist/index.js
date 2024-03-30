import { ESLint } from 'eslint';
import { is } from 'unist-util-is';

const filterInYAMLBloks = (tree) => {
    const yamlNodes = [];
    tree.children.forEach((node) => {
        if (is(node, 'yaml')) {
            yamlNodes.push(node);
        }
    });
    return yamlNodes;
};

const NAME = 'frontmatter-linter';
const getErrorMessages = (results) => {
    return results.map(({ messages }) => {
        return messages.map((message) => {
            const ruleId = message.ruleId ?? 'unknown';
            const messageText = message.message ?? 'unknown';
            // NOTE: because the markdown file has a frontmatter section, the line
            // number is off by one. So we add one to the line number to make the
            // position correct.
            const position = {
                start: {
                    line: message.line + 1 ?? 1,
                    column: message.column ?? 1,
                },
                end: {
                    line: (message.endLine ?? message.line) + 1 ?? 1,
                    column: message.endColumn ?? 1,
                }
            };
            return {
                message: messageText,
                position,
                nameAndRule: `${NAME} : ${ruleId}`
            };
        });
    }).flat();
};

// VFile.history type is Array[]
const getFilePath = (file) => file.history[0];

const defaultExtends = [
    'plugin:yml/standard',
];
const defaultRules = {
    indent: ['error', 2],
};

const mergeRules = (rules = {}) => {
    return {
        ...defaultRules,
        ...rules,
    };
};

const overrideExtends = (xtnds = []) => {
    const userExtends = Array.from(new Set(typeof xtnds === 'string' ? [xtnds] : xtnds)).filter(item => item !== '');
    return userExtends.length >= 1 ? userExtends : defaultExtends;
};

const frontmatterLinter = (settings = {}) => {
    return async (tree, vFile) => {
        const eslint = new ESLint({
            useEslintrc: false,
            baseConfig: {
                plugins: ['yml'],
                extends: overrideExtends(settings.extends),
                rules: mergeRules(settings.rules),
                overrides: [
                    {
                        files: ['*.md'],
                        parser: 'yaml-eslint-parser',
                    },
                ],
            },
        });
        const filePath = getFilePath(vFile);
        const yamlBlocks = filterInYAMLBloks(tree);
        if (yamlBlocks.length === 1) {
            const results = await eslint.lintText(yamlBlocks[0].value, {
                filePath,
            });
            const errorMessages = getErrorMessages(results);
            errorMessages.forEach(({ message, position, nameAndRule }) => {
                vFile.message(message, position, nameAndRule);
            });
        }
    };
};

export { frontmatterLinter as default };
