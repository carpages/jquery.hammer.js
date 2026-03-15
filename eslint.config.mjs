import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import babelParser from '@babel/eslint-parser';
import carpagesConfig from 'eslint-config-carpages/flat';
import globals from 'globals';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),

  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env'],
        },
      },
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  carpagesConfig,
  js.configs.recommended,
]);
