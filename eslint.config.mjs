import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// IMPORT PLUGINS (IMPORTANT)
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**"
  ]),

  {
    // FIXED: plugins as object
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort
    },

    rules: {
      /* -------------------- AUTO CLEAN -------------------- */

      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "off",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      /* -------------------- IMPORTANT ERRORS -------------------- */

      "no-console": "warn",
      "no-alert": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unsafe-optional-chaining": "error",

      // "eqeqeq": ["warn", "always"],
      "no-var": "error",
      "prefer-const": "error",

      "@typescript-eslint/no-explicit-any": "off", // warn

      /* -------------------- DISABLED -------------------- */

      "curly": "off",
      "sort-imports": "off",
      "arrow-body-style": "off",
      "react/self-closing-comp": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "jsx-a11y/alt-text": "warn",

      /* -------------------- FORMATTING -------------------- */

      "semi": "off",
      "quotes": "off",
      "indent": "off",
      "comma-dangle": "off"
    }
  }
]);

export default eslintConfig;