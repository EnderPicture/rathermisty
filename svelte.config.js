/** @type {import('@sveltejs/kit').Config} */

import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: "@import 'src/lib/styles/_global';"
		}
	}),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
};

export default config;
