import adapterAuto from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: sveltePreprocess({
		postcss: {
			configFilePath: "./postcss.config.js"
		}
	}),

	kit: {
		adapter: adapterAuto()
	}
};
