import sveltePreprocess from 'svelte-preprocess'
import expressAdapter from "@sveltejs/adapter-node"

export default {
	preprocess: [
		sveltePreprocess({
			sourceMap: true,
			scss: {
				renderSync: true,
				outputStyle: 'expanded'
			}
		}),
	],
	kit: {
		adapter: expressAdapter({
			entryPoint: './adapter/index.ts',
			out: 'build',
			precompress: false,
			env: {
				host: 'HOST',
				port: 'PORT'
			}			
		})
	}
}