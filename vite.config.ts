import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const isProd = mode === 'production'

	return {
		base: isProd ? '/thecatapi/' : '/',
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		}
	}
})
