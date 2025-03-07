import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  ...compat.plugins('@typescript-eslint', 'prettier'),
  ...compat.config(
    { parser: '@typescript-eslint/parser' },
    {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
        createDefaultProgram: true,
      },
    }
  ),
  {
    settings: {
      workingDirectories: [
        {
          mode: 'auto',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'error',
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        },
      ],
      'import/prefer-default-export': 'off',
      'no-nested-ternary': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default eslintConfig;
