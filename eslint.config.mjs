import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import html from 'eslint-plugin-html'
import globals from 'globals'

export default [
    {ignores: ['build/**', 'dist/**', 'node_modules/**', '.vercel/**']},
    js.configs.recommended,
    prettier,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['**/*.html'],
        plugins: {html},
        languageOptions: {
            globals: {
                ...globals.browser,
                __APP_VERSION__: 'readonly',
            },
        },
    },
]
