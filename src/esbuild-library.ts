import { build } from 'esbuild';
import { swcMinify } from 'esbuild-plugin-swc-minify';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import { basename } from 'node:path';
import { cwd } from 'node:process';
import { moduleTransformer } from './esbuild-plugin-module-transformer.js';
import type { BuildOptions as ESBuildOptions } from 'esbuild';
import type { JsMinifyOptions } from 'esbuild-plugin-swc-minify';

type Override<T extends object, K extends { [P in keyof T]?: unknown }> = Omit<T, keyof K> & K;

type BuildOptions = Override<ESBuildOptions, { entryPoints: string[] }>;

type LibraryBuildOptions = {
	buildOptions?: BuildOptions;
	minifyOptions?: JsMinifyOptions;
	mode?: 'ts' | 'js';
	iife?: boolean;
};

type Exports = string | { [key: string] : string | ConditionalExport };

type ConditionalExport = {
	types?: string;
	import?: string;
	require?: string;
	default?: string;
}

/**
 * Used to replace the `dist/` directory in the entry points with `src/`
 */
const replacer: RegExp = /(?:dist\/)(.*)(\.js$)/;
/**
 * The exports from the package.json file
 * @see https://nodejs.org/api/esm.html#esm_conditional_exports
 * @see https://nodejs.org/api/esm.html#esm_exports
 */
const { exports } = JSON.parse(await readFile(new URL(`${cwd()}/package.json`, import.meta.url), 'utf-8')) as { exports: Exports };
/**
 * The entry point for the library
 * Defaults to the `exports` field in the package.json file or `./src`
 */
const entryPoint = typeof exports === 'string' ? exports : (exports['.'] as ConditionalExport)?.import ?? './src';
/**
 * The default minify options
 */
const defaultMinifyOptions: JsMinifyOptions = { ecma: 2022, module: true };
/**
 * The default build options
 */
const defaultBuildOptions: BuildOptions = { entryPoints: [ entryPoint ], outdir: './dist', outfile: basename(entryPoint), target: `es${defaultMinifyOptions.ecma}`, sourcemap: true, loader: {}, assetNames: '', logLevel: 'info' };
/**
 * The default library build options
 */
const defaultLibraryBuildOptions: LibraryBuildOptions = { buildOptions: defaultBuildOptions, minifyOptions: defaultMinifyOptions, mode: 'ts', iife: false };

/**
 * A class to build a library using ESBuild. It can clean the output directory, build the library, and clean and build the library.
 */
class LibraryBuilder {
	/**
	 * Clean the output directory
	 *
	 * @param outDir The output directory
	 */
	static async clean(outDir = defaultBuildOptions.outdir!) {
		if (existsSync(outDir)) { await rm(outDir, { recursive: true, force: true }) }

		await mkdir(outDir);
	}

	/**
	 * Build the library
	 *
	 * @param libraryBuildOptions The build options
	 * @returns The build result
	 */
	static async build(libraryBuildOptions: LibraryBuildOptions = {}) {
		const { mode, iife, buildOptions, minifyOptions } = Object.assign({}, defaultLibraryBuildOptions, libraryBuildOptions) as Required<LibraryBuildOptions>;
		const { entryPoints, outdir, outfile, logLevel, loader, sourcemap, assetNames } = Object.assign({}, defaultBuildOptions, buildOptions) as Required<BuildOptions>;
		const { ecma, module } = Object.assign({}, defaultMinifyOptions, minifyOptions) as Required<JsMinifyOptions>;

		if (!entryPoints?.length) { throw new Error('No entry points provided') }

		// If any of the entry points are directories, replace them with the files in the directory
		for (let i = 0, length = entryPoints.length, entryPoint: string; i < length; i++) {
			entryPoints[i] = entryPoints[i].replace(replacer, `src/$1.${mode}`);
			if ((await stat(entryPoint = entryPoints[i])).isDirectory()) {
				entryPoints.splice(i, 1, ...(await readdir(entryPoint)).map((file) => `${entryPoint}/${file}`));
			}
		}

		const buildMinifyOptions = [ { entryPoints: [ `./${outdir}/*.js` ], module, outdir } ];

		await build({ entryPoints, sourcemap, outdir, bundle: true, format: 'esm', logLevel, loader, assetNames });

		if (iife) {
			const iifeOutDir = `${outdir}/iife`;
			const iifeOutput = `${iifeOutDir}/${outfile}`;

			await mkdir(iifeOutDir);

			await build({ entryPoints: [ `${outdir}/${outfile}` ], write: false, outfile: iifeOutput, logLevel, plugins: [ moduleTransformer() ] });

			buildMinifyOptions.push({ entryPoints: [ iifeOutput ], module: false, outdir: iifeOutDir });
		}

		for (const { entryPoints, module, outdir } of buildMinifyOptions) {
			await build({ entryPoints, minify: true, sourcemap, outdir, outExtension: { '.js': '.min.js' }, logLevel, loader, assetNames, plugins: [ swcMinify({ ecma, module }) ] });
		}
	}

	/**
	 * Clean and build the library
	 *
	 * @param libraryBuildOptions The options
	 * @returns The build result after cleaning the output directory
	 * @see LibraryBuilder.clean
	 * @see LibraryBuilder.build
	 */
	static async cleanAndBuild(libraryBuildOptions: LibraryBuildOptions = {}) {
		await LibraryBuilder.clean(libraryBuildOptions.buildOptions?.outdir);
		await LibraryBuilder.build(libraryBuildOptions);
	}
}

export { LibraryBuilder };
export type { LibraryBuildOptions, BuildOptions, JsMinifyOptions, Exports, Override, ConditionalExport };