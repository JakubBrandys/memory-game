import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
    {
        ignores: ['dist', 'build'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier,
            '@typescript-eslint': tsPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'prettier/prettier': 'warn',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
        },
    }
);