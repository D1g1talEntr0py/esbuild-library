# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.10](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.9...v1.0.10) - 2026-11-08


### Bug Fixes

* **deps:** upgrade dependencies to patch security advisories ([67fced7](https://github.com/D1g1talEntr0py/esbuild-library/commit/67fced7f69f5afded59bf594815436ee28e784ca))

* **ci:** simplify TypeScript ESLint configuration ([c4f919d](https://github.com/D1g1talEntr0py/esbuild-library/commit/c4f919d9bef39fb882e88a9280bc160ea9840d7b))


### Documentation

* **release:** document git-cliff release process ([b526798](https://github.com/D1g1talEntr0py/esbuild-library/commit/b526798f41330ede393ad339ecf39084d08837e9))


### Chores

* **ci:** add Node.js 26 to test matrix ([a63440b](https://github.com/D1g1talEntr0py/esbuild-library/commit/a63440b78095315d39cc8c0f1f9a903cb0673401))

* **ci:** upgrade actions/checkout and setup-node versions in CI workflows ([c891fa1](https://github.com/D1g1talEntr0py/esbuild-library/commit/c891fa1a87d27e1bdd5924dd9bb5b1597db24f78))


### Build System

* **eslint:** convert eslint config to TypeScript ([b2fafe5](https://github.com/D1g1talEntr0py/esbuild-library/commit/b2fafe572e2162061d419eba8b8b63cdf324447d))


### Continuous Integration

* **release:** replace semantic-release with git-cliff ([c8c2994](https://github.com/D1g1talEntr0py/esbuild-library/commit/c8c2994321170792b395324417403dd39175b06d))



## [1.0.9](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.6...v1.0.9) - 2026-03-08


### Chores

* sync package version to match npm ([1b64d08](https://github.com/D1g1talEntr0py/esbuild-library/commit/1b64d08d41431acc1b73108f1807cc823c85ae8b))

* **release:** 1.0.9 [skip ci] ([074a2b2](https://github.com/D1g1talEntr0py/esbuild-library/commit/074a2b256c030a11e8dde34859f04177b5a52fc4))

* **release:** 1.0.9 [skip ci] ([ba7eaac](https://github.com/D1g1talEntr0py/esbuild-library/commit/ba7eaac16fbdd53f1a99c9f9480aef812b2f81ca))


### Continuous Integration

* restore provenance and fix double build ([b60ddb1](https://github.com/D1g1talEntr0py/esbuild-library/commit/b60ddb17ea6649b5619460dcf250fcf0b7cce7e9))



## [1.0.6](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.8...v1.0.6) - 2026-03-08


### Bug Fixes

* broken lock file ([f6567e3](https://github.com/D1g1talEntr0py/esbuild-library/commit/f6567e37c24b4478114617b2eaafd5c15013895e))


### Chores

* **release:** 1.0.6 [skip ci] ([3c6d8b4](https://github.com/D1g1talEntr0py/esbuild-library/commit/3c6d8b43e7e0219e29fa5a0df65dd8f7b23f13ea))



## [1.0.8](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.5...v1.0.8) - 2026-03-08


### Documentation

* add release process documentation ([4b2b750](https://github.com/D1g1talEntr0py/esbuild-library/commit/4b2b750f5f0c92677ef06c4de1c3258b18fe87aa))


### Chores

* add git hooks and update project metadata ([7ac1b45](https://github.com/D1g1talEntr0py/esbuild-library/commit/7ac1b45045bc1c1e80910518ea408df7b41977ce))


### Code Refactoring

* migrate source from JS to TypeScript ([37ec0cf](https://github.com/D1g1talEntr0py/esbuild-library/commit/37ec0cf6b0356be66a8d8d0c804ef2b159fd4c58))


### Build System

* upgrade ESLint to flat config with TypeScript support ([4bf4c1b](https://github.com/D1g1talEntr0py/esbuild-library/commit/4bf4c1bbbf641ae8572eebcc025f90e88ed61fa9))

* overhaul package.json for TypeScript and new toolchain ([9615367](https://github.com/D1g1talEntr0py/esbuild-library/commit/9615367f55646c45c5e5e7b935c8ae0ed4c45e83))


### Continuous Integration

* add GitHub Actions workflows for CI and automated releases ([9426999](https://github.com/D1g1talEntr0py/esbuild-library/commit/9426999397b5bfd19c1864797fdfd95d22cb69a1))


### Other Changes

* Added 'loader' and 'assetNames' properties to pass to esbuild ([f86dac9](https://github.com/D1g1talEntr0py/esbuild-library/commit/f86dac92d37f768d2a3dda14b7d5345b7b256840))

* Maintenance release ([d787034](https://github.com/D1g1talEntr0py/esbuild-library/commit/d7870341f340e96ed5c8c57195983e80505e37d4))

* Maintenace Release: Dependency Updates and convert eslint config to YAML ([7ec6823](https://github.com/D1g1talEntr0py/esbuild-library/commit/7ec682326dee786eed0ee82971cd83f4d9ee7119))

* Bump cross-spawn from 7.0.3 to 7.0.6

Bumps [cross-spawn](https://github.com/moxystudio/node-cross-spawn) from 7.0.3 to 7.0.6.
- [Changelog](https://github.com/moxystudio/node-cross-spawn/blob/master/CHANGELOG.md)
- [Commits](https://github.com/moxystudio/node-cross-spawn/compare/v7.0.3...v7.0.6)

---
updated-dependencies:
- dependency-name: cross-spawn
  dependency-type: indirect
...

Signed-off-by: dependabot[bot] <support@github.com> ([19e2309](https://github.com/D1g1talEntr0py/esbuild-library/commit/19e230938d5fc2076125bfbf608cc70927506d93))

* Merge pull request #1 from D1g1talEntr0py/dependabot/npm_and_yarn/cross-spawn-7.0.6

Bump cross-spawn from 7.0.3 to 7.0.6 ([08f1be6](https://github.com/D1g1talEntr0py/esbuild-library/commit/08f1be6532ef311ef147fa7b91bc43d8129f022f))



## [1.0.5](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.4...v1.0.5) - 2023-12-18


### Other Changes

* Maintenance update ([ae4388f](https://github.com/D1g1talEntr0py/esbuild-library/commit/ae4388f98a1f7e120840cdd1e284b00dc16db363))



## [1.0.4](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.2...v1.0.4) - 2023-12-03


### Other Changes

* Maintenance release. Updated dependencies ([ed3e3d2](https://github.com/D1g1talEntr0py/esbuild-library/commit/ed3e3d2d31db3264c6882b1d38218f558e36f0da))

* Fixed bug where referencing a directory in the 'entryPoints' array that only has 1 file in it would cause the build to fail ([23436a3](https://github.com/D1g1talEntr0py/esbuild-library/commit/23436a3e16205445ffeffed87e35d4c4375239e0))



## [1.0.2](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.1...v1.0.2) - 2023-11-06


### Other Changes

* Maitenance release. Updated dependencies. ([8749ee8](https://github.com/D1g1talEntr0py/esbuild-library/commit/8749ee8d0d018fd90b8c9676bccf47a20f071879))



## [1.0.1](https://github.com/D1g1talEntr0py/esbuild-library/compare/v1.0.0...v1.0.1) - 2023-11-01


### Other Changes

* Fixed a bug with the package.json preventing the swc-minify plugin to be installed ([6b3b596](https://github.com/D1g1talEntr0py/esbuild-library/commit/6b3b59605a3228a4731579087172d9d736dced6f))



## [1.0.0](https://github.com/D1g1talEntr0py/esbuild-library/releases/tag/v1.0.0) - 2023-11-01


### Other Changes

* Initial commit ([e30c641](https://github.com/D1g1talEntr0py/esbuild-library/commit/e30c6414ffc06fb9ba89ecca7194ccb8e90dfb02))

* Initial Commit ([cca27b6](https://github.com/D1g1talEntr0py/esbuild-library/commit/cca27b6dc10f49f2adbfac33a56d49582ee90d90))


