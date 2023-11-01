# esbuild-library
esbuild utility class to build libraries.

## Purpose
I know, I know. Why create a library just to remove some boiler-plate code? Well, I'm lazy and I don't want to write the same code over and over again. I also want to be able build different projects the same way. So, I created this library to do just that.

## Features
In order to remove boiler-plate code, this library favors convention over configuration.

This library will look for the following:
- A `package.json` file with an `"exports"` field configured something like this. The builder will look in the `package.json` file for the `"exports"` field and use the `"."` entry for the `./src/library.js` file as the entry point for the build if you don't specify `entryPoints` in the options. If you do specify `entryPoints` in the options, it will use that instead. I did this, because for simple libraries where a single script is what most users would import.

```json
"exports": {
  ".": "./src/library.js",
  "./dist/*": "./dist/*"
},
```

- A `src` folder in your root folder of your project. If you don't provide `entryPoints` in the options, and you don't have an entry of `"."` in the `"exports"` field in the `package.json` file, then `entryPoints` will default to `['./src']` and will iterate each script in the folder and create a esmodule and minified copy. Note: If you provide an directory as an entry in the `entryPoints` array, this is the behavior you will get.
- If you don't provide `outDir` in the options, then `outdir` will default to `./dist`.


 and does the following:
- Clean dist folder
- Build esmodules with esbuild
- Optionally creates iife scripts that exposes the library to the global scope using `globalThis`
- Minify with swc

## Install
```bash
# if using pnpm 😎
pnpm add -D esbuild-library

# if using npm
npm i -D esbuild-library
```

## Options

```js
/**
 * @typedef {object} ESBuildLibraryOptions
 * @property {string[]} [entryPoints=['./src']] The entry points
 * @property {string} [outFile] The output file
 * @property {string} [outDir='dist'] The output directory
 * @property {number} [ecma=2022] The ecma version for minification using swc
 * @property {boolean} [iife=false] Whether to build an iife version with a global variable
 * @property {string} [logLevel='info'] The log level
 * @see https://esbuild.github.io/api/#log-levels
 * @see https://esbuild.github.io/api/#build-api
 * @see https://esbuild.github.io/api/#build-options
 */

const esBuildLibraryOptions = {
  entryPoints: [ './src/index.js' ],
  outFile: './dist/index.js',
  outDir: './dist',
  ecma: 2022,
  iife: true,
  logLevel: 'debug'
};
```

## Usage example
If you have the following file structure
```file-tree
└── src
    ├── library.js
    └── library-helper.js
├── esbuild.js
└── package.json
```
And your package.json looks like this
```json
"exports": {
  ".": "./src/library.js",
  "./dist/*": "./dist/*"
}
```
In the esbuild.js file, running the following
```js
import ESBuildLibrary from 'esbuild-library';

await ESBuildLibrary.cleanAndBuild();
```
outputs:

```file-tree
dist
├── library.js
├── library.min.js
└── library.min.js.map
```
Is roughly equivalent to this:
```js
// instead of this - Don't forget to add rimfaf to your devDependencies to clean your /dist folder first.

import * as esbuild from 'esbuild';
import swcMinify from 'esbuild-plugin-swc-minify';

await esbuild.build({
  entryPoints: [ './src/library.js' ],
  outfile: './dist/library.js',
  bundle: true,
  format: 'esm',
  logLevel: 'info'
});

await esbuild.build({
  entryPoints: [ './dist/library.js' ],
  outdir: './dist',
  minify: true,
  sourceMap: true,
  module: true,
  logLevel: 'info'
  plugins: [ swcMinify({ ecma: 2022 }) ]
});
```
You can also do this is you have subfolders in /dist for additional output
```js
import ESBuildLibrary from 'esbuild-library';

await ESBuildLibrary.clean();

await ESBuildLibrary.build({ entryPoints: [ './src/library.js' ] });

await ESBuildLibrary.build({ entryPoints: [ './locale' ], outDir: 'dist/locale' });
```
Output
```file-tree
└── dist
    ├── locale
    │   ├── en-us.js
    │   ├── en-gb.js
    │   └── ja.map
    ├── library.js
    ├── library.min.js
    └── library.min.js.map
```
```js
import ESBuildLibrary from 'esbuild-library';

await ESBuildLibrary.cleanAndBuild({ iife: true });
```

Output
```file-tree
└── dist
    ├── iife
    │   ├── library.js
    │   ├── library.min.js
    │   └── library.min.js.map
    ├── library.js
    ├── library.min.js
    └── library.min.js.map
```
I know, this is life changing... 😂 No one is going to use this anyway, but I need the README practice because clearly I'm not good at documentation.