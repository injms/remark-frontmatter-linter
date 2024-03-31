## Publishing

This package is published to both the [npm][npm] and [GitHub][github] package registries.

1. Update dependencies
1. Run tests, linting, and type checks
1. Create and publish a new version using [np] with a version number according to [SemVer][semver]
    * Note - check that the tag is signed. If not, set `npm config set sign-git-tag true` and try again
1. Publish this new version to GitHub packages using `npm run release:github` (alias for `npm publish --scope=@injms --registry=https://npm.pkg.github.com`)

[np]: https://github.com/sindresorhus/np
[semver]: https://semver.org/
[npm]: https://www.npmjs.com/package/@injms/remark-frontmatter-linter
[github]: https://github.com/injms/remark-frontmatter-linter/pkgs/npm/remark-frontmatter-linter
