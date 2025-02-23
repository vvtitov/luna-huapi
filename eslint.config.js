import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
export default {
  settings: { react: { version: "19.0" } },
  plugins: ["react"],
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    },
    {
      files: ["**/*.js"],
      languageOptions: {
        sourceType: "commonjs",
      },
    },
  ],
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ...pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...pluginReact.configs.flat.recommended,
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
