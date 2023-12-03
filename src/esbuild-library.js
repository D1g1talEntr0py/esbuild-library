import * as esbuild from 'esbuild';
import swcMinify from 'esbuild-plugin-swc-minify';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rm, stat } from 'node:fs/promises';
import { basename } from 'node:path';
import { cwd } from 'node:process';
import moduleTransformer from './esbuild-plugin-module-transformer.js';

const { exports: { '.': entryPoint = './src', outFile = basename(entryPoint) } = {} } = JSON.parse(await readFile(new URL(`${cwd()}/package.json`, import.meta.url), 'utf-8'));
const defaults = { entryPoints: [entryPoint], outDir: 'dist', outFile, ecma: 2022, iife: false, logLevel: 'info' };

/**
 * @typedef {object} ESBuildLibraryOptions
 * @property {string[]} [entryPoints=['./src']] The entry points
 * @property {string} [outFile] The output file
 * @property {string} [outDir='dist'] The output directory
 * @property {number} [ecma=2016] The ecma version
 * @property {boolean} [iife=false] Whether to build an iife version with a global variable
 * @property {string} [logLevel='info'] The log level
 * @see https://esbuild.github.io/api/#log-levels
 * @see https://esbuild.github.io/api/#build-api
 * @see https://esbuild.github.io/api/#build-options
 */

export default class ESBuildLibrary {
	/**
	 * Clean the output directory
	 *
	 * @param {string} outDir The output directory
	 */
	static async clean(outDir = defaults.outDir) {
		if (existsSync(outDir)) { await rm(outDir, { recursive: true, force: true }) }

		await mkdir(outDir);
	}

	/**
	 * Build the library
	 *
	 * @param {ESBuildLibraryOptions} esBuildLibraryOptions The options
	 * @param {string[]} esBuildLibraryOptions.entryPoints The entry points
	 * @param {string} esBuildLibraryOptions.outFile The output file
	 * @param {string} [esBuildLibraryOptions.outDir] The output directory
	 * @param {number} [esBuildLibraryOptions.ecma] The ecma version
	 * @param {boolean} [esBuildLibraryOptions.iife] Whether to build an iife version
	 * @param {string} [esBuildLibraryOptions.logLevel] The log level
	 * @returns {Promise<void>}
	 */
	static async build({ entryPoints = defaults.entryPoints, outDir = defaults.outDir, outFile = defaults.outFile, ecma = defaults.ecma, iife = defaults.iife, logLevel = defaults.logLevel } = {}) {
		if (!entryPoints.length) { throw new Error('No entry points provided') }

		// If any of the entry points are directories, replace them with the files in the directory
		for (let i = 0, length = entryPoints.length, entryPoint; i < length; i++) {
			if ((await stat(entryPoint = entryPoints[i])).isDirectory()) {
				entryPoints.splice(i, 1, ...(await readdir(entryPoint)).map((file) => `${entryPoint}/${file}`));
			}
		}

		const minifyOptions = [{ entryPoints: [`./${outDir}/*`], module: true, outDir }];

		await esbuild.build({ entryPoints, outdir: outDir, bundle: true, format: 'esm', logLevel });

		if (iife) {
			const iifeOutDir = `${outDir}/iife`;
			const iifeOutput = `${iifeOutDir}/${outFile}`;

			await mkdir(iifeOutDir);

			await esbuild.build({ entryPoints: [ `${outDir}/${outFile}` ], write: false, outfile: iifeOutput, logLevel, plugins: [ moduleTransformer() ] });

			minifyOptions.push({ entryPoints: [ iifeOutput ], outDir: iifeOutDir });
		}

		for (const { entryPoints, module, outDir: outdir, outExtension } of minifyOptions) {
			await esbuild.build({ entryPoints, minify: true, sourcemap: true, outdir, outExtension: { '.js': '.min.js' }, logLevel, plugins: [ swcMinify({ ecma, module }) ] });
		}
	}

	/**
	 * Clean and build the library
	 *
	 * @param {ESBuildLibraryOptions} esBuildLibraryOptions The options
	 * @param {string[]} esBuildLibraryOptions.entryPoints The entry points
	 * @param {string} esBuildLibraryOptions.outFile The output file
	 * @param {string} [esBuildLibraryOptions.outDir] The output directory
	 * @param {number} [esBuildLibraryOptions.ecma] The ecma version
	 * @param {boolean} [esBuildLibraryOptions.iife] Whether to build an iife version
	 * @param {string} [esBuildLibraryOptions.logLevel] The log level
	 * @returns {Promise<void>}
	 * @see ESBuildLibrary.clean
	 * @see ESBuildLibrary.build
	 */
	static async cleanAndBuild({ entryPoints, outFile, outDir, ecma, iife, logLevel }) {
		await ESBuildLibrary.clean(outDir);
		await ESBuildLibrary.build({ entryPoints, outFile, outDir, ecma, iife, logLevel });
	}
}