module.exports = {
  root: true,
  env: {
    es2024: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2024,  
    sourceType: "module"
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {
    "indent": "off",
    "quotes": "off",
    "semi": "off",
    "max-len": "off",
    "object-curly-spacing": "off",
    "no-unused-vars": "off",
    "prefer-arrow-callback": "warn",
    "no-restricted-globals": ["error", "name", "length"],
    "template-curly-spacing": "off",
    "no-template-curly-in-string": "off",
    "prefer-template": "off"
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true
      },
      rules: {}
    }
  ]
};
