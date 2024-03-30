import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    define: {
        __VUE_PROD_DEVTOOLS__: 'false', // Определение флага для devtools
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' // Определение флага для гидратации
    },
    plugins: [
        vue(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
