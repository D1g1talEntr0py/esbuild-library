# Release Process

## Overview

This project uses [git-cliff](https://git-cliff.org/) with [Conventional Commits](https://www.conventionalcommits.org). The release workflow determines release eligibility separately from changelog inclusion, then calculates the version, publishes to npm, and creates the GitHub release. There are no manual version bumps. CI installs git-cliff **2.14.2**; it is not a package dependency.

## Step-by-Step: Making a Release

### 1. Write Code on a Feature Branch

```sh
git checkout -b feat/my-feature
```

### 2. Commit Using Conventional Commit Messages

Every commit message must follow the format:

```
type(optional-scope): description
```

**Types that trigger a release:**

| Type | Bump | Example |
|---|---|---|
| `feat` | Minor (`1.x.0`) | `feat: add watch mode` |
| `fix` | Patch (`1.0.x`) | `fix: resolve path edge case` |
| `perf` | Patch (`1.0.x`) | `perf: cache module resolution` |
| `revert` | Patch (`1.0.x`) | `revert: undo feature X` |

**Types that do NOT trigger a release:**

| Type | Example |
|---|---|
| `docs` | `docs: update README` |
| `style` | `style: fix formatting` |
| `chore` | `chore: update deps` |
| `refactor` | `refactor: simplify bundler` |
| `test` | `test: add bundler tests` |
| `build` | `build: update esbuild config` |
| `ci` | `ci: fix workflow` |

**Breaking changes** (major bump `x.0.0`):

Any conventional commit type triggers a major release when it has `!` after the type or optional scope, or a `BREAKING CHANGE:` or `BREAKING-CHANGE:` footer:

```
refactor(bundler)!: remove the legacy API

BREAKING CHANGE: Callers must use the new API.
```

All commits appear in the changelog, including non-release types, unknown types, non-conventional messages, and release automation commits. Non-release commits do not cause a publish; they are included when the full changelog is regenerated at the next release.

### 3. Push and Open a Pull Request

```sh
git push -u origin feat/my-feature
```

Open a PR targeting `main`. The CI workflow runs lint, type-check, and build across Node.js 22, 24 and 26. All checks must pass. This project currently has no test script or audit gate.

### 4. Merge to `main`

Merge the PR (squash or merge commit — both work). The commit message(s) on `main` are what the release workflow reads, so:

- **Squash merge**: Edit the squash commit message to use the correct conventional commit format.
- **Merge commit**: Each individual commit on the branch is analyzed, so they should all follow the format.

### 5. Automated Release (Hands-Off)

After the merge, the [release workflow](../.github/workflows/publish.yml) triggers automatically. Releases are serialized without canceling an in-progress publish:

1. Fetches full Git history and tags, then checks commits since the latest release tag for release eligibility
2. Uses `git cliff --bumped-version` to calculate the version (or safely skips empty, unchanged, or "There is nothing to bump" results)
3. Generates separate release notes with `--unreleased --strip header` and regenerates the **full** `CHANGELOG.md` from Git history using [cliff.toml](../cliff.toml)
4. Strips the `v` prefix and updates `version` in `package.json` without creating an npm Git tag
5. Runs lint, type-check, build, and `pnpm pack`, and checks the package contains the exported JavaScript and declaration files
6. Publishes to npm with provenance attestation via Trusted Publishing; publish scripts are skipped because validation and build already ran
7. Commits `CHANGELOG.md` and `package.json` back to `main` with `[skip ci]`
8. Creates and pushes the release tag (e.g., `v1.2.0`) together with the release commit
9. Creates a GitHub release with the release notes and `esbuild-library-<version>.tgz` artifact

Changelog entries have scoped descriptions and commit links under one heading per group per release: Breaking Changes, Features, Bug Fixes, Performance Improvements, Reverts, Documentation, Styles, Chores, Code Refactoring, Tests, Build System, Continuous Integration, and Other Changes. Both generation commands use `--github-repo "$GITHUB_REPOSITORY"` for repository-aware links. Existing changelog content is left alone until the next release regenerates it. An untagged repository starts at `1.0.0`.

### 6. Verify

- Check the [Actions tab](../../actions) for the workflow run
- Check [npm](https://www.npmjs.com/package/esbuild-library) for the published version
- Check [Releases](../../releases) for the GitHub release

## Dry Run (Local Testing)

Install git-cliff 2.14.2 and preview the changelog without publishing or modifying tracked files:

```sh
git cliff --github-repo D1g1talEntr0py/esbuild-library --output /tmp/esbuild-library-changelog.md
git cliff --github-repo D1g1talEntr0py/esbuild-library --unreleased --strip header
```

After confirming there is an eligible commit since the latest release tag, preview the next version:

```sh
git cliff --github-repo D1g1talEntr0py/esbuild-library --bumped-version
```

These commands read local history; fetch all history and tags first if using a shallow checkout. git-cliff runs offline because only repository-aware URLs are needed, not GitHub contributor or PR metadata; no API token is required for previews. The bump command alone is not the eligibility gate: git-cliff can suggest a patch for non-release commits, but the workflow skips those commits before running it.

## Troubleshooting

**No release was created after merging:**
- The commits on `main` do not include any release-worthy changes. Only `feat`, `fix`, `perf`, and `revert` independently trigger releases; any conventional breaking change triggers a major release. `refactor` no longer independently triggers a patch.

**Wrong version bump:**
- Check the commit messages. A `feat` bumps minor, a `fix`/`perf`/`revert` bumps patch, and a conventional breaking change bumps major, including before `1.0.0`.

**npm publish failed:**
- Verify the `npm` environment exists in the repo's GitHub Settings → Environments.
- Verify Trusted Publishing is configured on npmjs.com for this repo and the `publish.yml` workflow.
