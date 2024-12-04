export default {
    env: {
        browser: true,
        es2024: true,
        node: true,
    },
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        "linebreak-style": ["error", "unix"],
        "eol-last": "error",
        "no-trailing-spaces": "error",
        semi: ["error", "always"],
        camelcase: ["error", { properties: "never" }],
        curly: ["error", "all"],
        "brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "no-with": "error",
        "keyword-spacing": ["error", {}],
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "ignore",
                named: "never",
            },
        ],
        "comma-spacing": [
            "error",
            {
                after: true,
                before: false,
            },
        ],
        "semi-spacing": [
            "error",
            {
                before: false,
                after: true,
            },
        ],
        "key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true,
                mode: "minimum",
            },
        ],
        "padded-blocks": ["error", "never"],
        "max-len": ["error", { code: 100 }],
        "comma-style": ["error", "last"],
        "no-multi-str": "error",
        "wrap-iife": ["error", "any"],
        "no-console": "off",
    },
};
