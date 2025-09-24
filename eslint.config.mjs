import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig(
	{
    // Ignore files/folders here
    ignores: ["tsconfig.json", "dist", "node_modules", "build", "data/*.json", ".env"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
	files: ["src/**/*.test.ts", "src/__test__/**/*.ts"],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unused-vars": "warn",
	},
});

// export default defineConfig([
// 	{
// 		files: ["src/**/*.{ts,tsx}"],
// 		plugins: {
// 			js,
// 			'@typescript-eslint': import('@typescript-eslint/eslint-plugin')
// 		},
// 		extends: ["js/recommended"],
// 		rules: {
// 			"no-unused-vars": "warn",
// 			"no-undef": "warn",
// 		},
//         ignores: ["tsconfig.json", "dist", "node_modules", "build", "data/*.json", ".env"],
// 	},
// ]);
