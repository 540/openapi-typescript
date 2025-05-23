import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "*.gen.ts", "*.gen.js", ".prettierrc.js"] },
  // Base configuration for all files
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.server.json", "./tsconfig.frontend.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Base ESLint rules
      "no-console": "warn",
      "no-unused-vars": "off", // TypeScript handles this
      "no-undef": "off", // TypeScript handles this

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Style rules are handled by Prettier
    },
  },
  // Frontend specific configuration
  {
    files: ["**/src/frontend/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  // Test files configuration
  {
    files: ["**/*.test.{ts,tsx,js,jsx}"],
    rules: {
      // Relaxed rules for test files
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
