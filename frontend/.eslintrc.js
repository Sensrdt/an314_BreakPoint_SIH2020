module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'import', 'jsx-a11y', 'react-hooks', 'prettier'],
  rules: {
    'react/prop-types': 0,
    'prettier/prettier': 1,
    quotes: [2, 'single', 'avoid-escape'],
    'import/no-useless-path-segments': [2, {
      noUselessIndex: true,
    }]
  },
};
