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
        'prettier/prettier': 1,
    },
};
