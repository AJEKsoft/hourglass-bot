module.exports = {
  extends: ['airbnb-typescript/base'],
  // plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    // Your environments (which contains several predefined global variables)
    //
    node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    'import/prefer-default-export': 0,
    '@typescript-eslint/object-curly-spacing': ['warn', 'never'],
    'no-return-assign': 0,
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'import/no-cycle': 0,
    'max-len': ['warn', 160],
    '@typescript-eslint/no-use-before-define': 0,
    'no-console': 0,
    'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
    'no-restricted-syntax': 0,
    '@typescript-eslint/no-unused-vars': ['off'],
  },
};
