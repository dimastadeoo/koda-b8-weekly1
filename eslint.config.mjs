import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" },
    rules: {
      semi: ["error", "always"],
      indent: ["error", 2]
      // "no-unused-vars": ["error", {
      //   "vars": "all",
      //   "args": "after-used",
      //   "caughtErrors": "all",
      //   "ignoreRestSiblings": false,
      //   "ignoreUsingDeclarations": false,
      //   "reportUsedIgnorePattern": false
      //   }],
      // "no-undef": ["error", { "typeof": true }]

    },
  }
]);
