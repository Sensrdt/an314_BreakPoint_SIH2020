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
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'import', 'jsx-a11y', 'react-hooks'],
};
