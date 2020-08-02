module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
    },
    env: {
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended'],
    plugins: ['prettier'],
    rules: {
        'prefer-const': 2,
        'prettier/prettier': 1,
    },
};
