module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react-refresh'
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'react/jsx-key': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      ignoreRestSiblings: true,
      varsIgnorePattern: '^(Prestataires|RessourcesHRS|RadioField|TextAreaField|SelectField|PropsWithChildren|_)',
      argsIgnorePattern: '^(request|error|t|lng|i18n|router|_)'
    }],
    'no-var': 'warn',
    'react-refresh/only-export-components': 'off'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  ignorePatterns: [
    'node_modules/*',
    '.next/*',
    'out/*',
    'public/*',
    '**/*.d.ts'
  ]
};
