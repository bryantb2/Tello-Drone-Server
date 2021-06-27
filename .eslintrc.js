module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"],
      },
    },
  },
  extends: ["prettier", "airbnb", "airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "linebreak-style": 1,
    "comma-dangle": 0,
    quotes: [0, "double"],
    "implicit-arrow-linebreak": 1,
    "no-unused-vars": 0,
  },
};
