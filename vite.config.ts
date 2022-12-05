import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
        },
    },
    plugins: [
        vue(),
        laravel({
            // valetTls: 'laravel.test',
            input: ['resources/js/app.ts'],
            refresh: true,
        }),
    ],
})
