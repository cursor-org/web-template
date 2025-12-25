import { FlatCompat } from '@eslint/eslintrc'
import pkg from '@typescript-eslint/eslint-plugin'
import esLintConfigPrettier from 'eslint-config-prettier'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { configs } = pkg

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: configs.recommended,
})

const config = [
  ...compat.config({
    env: {
      node: true,
      browser: true,
    },
    globals: {
      google: 'readonly',
    },
    extends: [
      'plugin:react-hooks/recommended',
      // 'lint:recommended',
      'plugin:@typescript-eslint/recommended',
      'standard',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      // '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-interface': 'error',
      'max-len': [
        1,
        {
          code: 100,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'no-inline-comments': 0,
      'no-var': 'error',
      'no-alert': 2,
    },
  }),
  esLintConfigPrettier,
  {
    rules: {
      camelcase: ['warn', { ignoreDestructuring: true }],
    },
  },
]

export default config
