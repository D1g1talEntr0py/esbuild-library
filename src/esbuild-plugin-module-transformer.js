import { writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const newLine = '\n'.charAt(0);
const tab = '\t'.charAt(0);
const dashes = /(^.)|-(.)/g;
const replacer = (match) => match.toUpperCase();
const indenter = (line) => `${tab}${line}`;
const errorHandler = (error) => { throw error };

/**
 * ESBuild plugin to transform an ES module into a globalThis script.
 * This is useful for ES modules that are going to be used in a legacy application.
 *
 * @param {string} [globalName] Name of the global variable to assign the module to.
 * Defaults to the name of the file converted to camel case. (i.e. 'my-module.js' becomes 'MyModule')
 * @returns {{ name: string, setup: (builder: import('esbuild').PluginBuild) => void }} ESBuildPlugin
 */
const moduleTransformer = (globalName) => {
	return {
		name: 'esbuild:module-transformer',
		setup: (builder) => {
			builder.onEnd(({ outputFiles: [{ text, path, lines = text.trimEnd().split(newLine).slice(0, -3) }] }) => {
				globalName ??= basename(path, '.js').replace(dashes, replacer);

				writeFileSync(path, Buffer.from(`(() => {${newLine}${lines.map(indenter).join(newLine)}${newLine}${tab}globalThis.${globalName} = ${globalName};${newLine}})();`), errorHandler);
			});
		}
	};
};

export default moduleTransformer;