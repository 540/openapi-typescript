import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "*.gen.ts", "*.gen.js", ".prettierrc.js"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
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
  // Add a more specific configuration for test files if needed
  {
    files: ["**/*.test.{ts,tsx,js,jsx}"],
    rules: {
      // Relaxed rules for test files
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
