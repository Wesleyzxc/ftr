import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: { prettier },
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "prettier/prettier": ["error"],
    },
  },
  { languageOptions: { globals: globals.browser } },
  { ignores: ["jest.config.js", "lib/*"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...prettierConfig,
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
