import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { rules } from "eslint-plugin-react/configs/all";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'prettier/prettier': [
        'warn', {
          endOfLine: 'auto'
        }
      ]
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
];