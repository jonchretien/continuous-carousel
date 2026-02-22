module.exports = {
    "env": {
        "amd": true,
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "rules": {
    },
    "overrides": [
        {
            "files": ["*.ts"],
            "parser": "@typescript-eslint/parser",
            "plugins": ["@typescript-eslint"],
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended"
            ]
        }
    ]
};
