{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    "files": ["*.ts",
    "parserOptions": {
      "project": ["tsconfig.json"],
      "createDefaultProgram": true
    },
    "extends": ["plugin:@typescript-eslint/recommended", "prettier"],
    "rules": {}
  ]
}