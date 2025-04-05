import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import eslintParserTs from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.env',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: eslintParserTs,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-console': 'off',
      'comma-dangle': ['error', 'only-multiline'],
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
]
