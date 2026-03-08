## [1.0.6](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.5...v1.0.6) (2026-03-08)

### Bug Fixes

* broken lock file (f6567e37c24b4478114617b2eaafd5c15013895e)

### Code Refactoring

* migrate source from JS to TypeScript (37ec0cf6b0356be66a8d8d0c804ef2b159fd4c58)
Converts the main library and plugin transformer from plain JavaScript
to TypeScript, enabling strict type checking, explicit type exports, and
better IDE integration.

Removes the old JS source files and replaces them with typed TS
equivalents. Adds tsconfig.json for compiler configuration and removes
the now-obsolete jsconfig.json.


### Documentation

* add release process documentation (4b2b750f5f0c92677ef06c4de1c3258b18fe87aa)
Describes the end-to-end release workflow driven by semantic-release
and Conventional Commits, covering commit types, version bump rules,
the automated release steps, dry-run instructions, and common
troubleshooting scenarios.


### Miscellaneous Chores

* add git hooks and update project metadata (7ac1b45045bc1c1e80910518ea408df7b41977ce)
Adds a commit-msg hook that enforces Conventional Commits format on
every commit, preventing non-conforming messages from being committed.

Updates .gitignore to exclude the TypeScript build cache directory,
and adds an empty CHANGELOG.md placeholder for semantic-release to
populate. Updates the LICENSE file line endings for consistency.


### Build System

* overhaul package.json for TypeScript and new toolchain (9615367f55646c45c5e5e7b935c8ae0ed4c45e83)
Bumps the package to v2.0.0, updates exports to include TypeScript
declaration files, moves esbuild and SWC to direct dependencies, adds
TypeScript and updated ESLint tooling as dev dependencies, and removes
the now-obsolete peer dependencies section.

Also sets a minimum Node.js engine requirement, adds packageManager
field, and configures build/lint/type-check scripts using the tsbuild
tool. Updates pnpm-workspace.yaml to allow native builds for esbuild
and @swc/core.

* upgrade ESLint to flat config with TypeScript support (4bf4c1bbbf641ae8572eebcc025f90e88ed61fa9)
Replaces the legacy `.eslintrc.yml` and `.eslintignore` configuration
with a modern flat config using ESLint v10, typescript-eslint, and
updated jsdoc plugin rules.

Adds TypeScript-aware linting rules including strict type-checked
recommended rules, enforces consistent method signature style, and
improves unused-vars detection. Updates VSCode settings to use the
workspace TypeScript SDK.


### Continuous Integration

* add GitHub Actions workflows for CI and automated releases (9426999397b5bfd19c1864797fdfd95d22cb69a1)
Adds a CI workflow that runs lint, type-check, and build on pull
requests and pushes to main across Node.js 22 and 24.

Adds a release workflow powered by semantic-release with conventional
commits, automating changelog generation, npm publishing with
provenance attestation, and GitHub release creation. Configures
.releaserc.json with detailed release rules and commit groupings.
