import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: 'src/adaptive-image.js',
			name: 'AdaptiveImage',
			formats: ['es'],
			fileName: 'adaptive-image',
		},
		rollupOptions: {
			// Prevent bundling of dependencies if you have any
			external: [],
		},
	},
});
