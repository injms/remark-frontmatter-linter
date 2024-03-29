# Remark Frontmatter linter

Uses [eslint-plugin-yml] to lint YAML frontmatter in a Markdown file.

Requirements:

* [remark-lint]
* [remark-frontmatter]

## 🏗️ Installation

Install this package -  `@injms/remark-frontmatter-linter` - and its dependencies - `remark-lint` and `remark-frontmatter` - with npm:

```bash
npm install remark-lint remark-frontmatter @injms/remark-frontmatter-linter
```

<!-- ## 🛠️ Set up -->

<!-- ...TODO -->

## ⌨️ Set up for [`remark-cli`][remark-cli]

Add the plugin in the list of plugins, [where ever that is being set][example-config-files], remembering to add it **after** the `remark-lint` and `remark-frontmatter` plugins.

```javascript
// .remarkrc.mjs
export default {
  "plugins": [
    "remark-lint",
    "remark-frontmatter",
    "remark-frontmatter-linter",
  ],
}
```

## ⚙️ Configuration

By default the rules are the [standard YML set of rules][standard-yml-rules] (`plugin:yml/standard`) but with indentation changed to be 2 spaces.

To change this, both the `extends` and `rules` properties can be set in the Remark config file, for example:

```javascript
// .remarkrc.mjs
export default {
  "plugins": [
    "remark-lint",
    "remark-frontmatter",
    [
      "remark-frontmatter-linter",
      {
        extends: [
          'yml:prettier',
        ],
        rules: {
          'yml/indent': ['error', 4],
          'yml/plain-scalar': 'off',
        }
      }
    ],
  ],
}
```

See the [`eslint-plugin-yml` configuration docs][eslint-plugin-yml-config-docs] for a list of available configs and rules.

Setting anything in `extends` will _overwrite_ the default use of `yml:standard`.

Setting anything in `rules` will _add_ to the rules - so unless `yml/indent` is set then the default of 2 spaces will be used.

## 🧪 Tests

```shell
npm run test
```

This plugin uses the [AVA test runner][ava].

[eslint-plugin-yml]: https://github.com/ota-meshi/eslint-plugin-yml
[remark-lint]: https://github.com/remarkjs/remark-lint
[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter
[remark-cli]: https://github.com/remarkjs/remark/tree/main/packages/remark-cli
[standard-yml-rules]: https://ota-meshi.github.io/eslint-plugin-yml/rules/
[example-config-files]: https://github.com/remarkjs/remark/tree/618a9ad1d44aa106bd2a8c61ebf8589cfe97fa16/packages/remark-cli#example-config-files-json-yaml-js
[ava]: https://github.com/avajs/ava
[eslint-plugin-yml-config-docs]: https://ota-meshi.github.io/eslint-plugin-yml/user-guide/#usage
