---
title: Using ESLint as linter and formatter
date: 2026-05-07
summary: ESLint is a linter, but with the Stylistic plugin it replaces Prettier entirely — one tool, one config, zero conflicts.
---

ESLint catches code problems; Prettier fixes whitespace. Running both means maintaining two configs that inevitably disagree on spacing, trailing commas, or bracket placement, and then spending time on tooling instead of code. The [ESLint Stylistic](https://eslint.style) project moves all formatting rules into ESLint, making one tool do both jobs.

## Why not Prettier

Prettier's formatting is intentionally opinionated: it reformats code its way and offers few knobs to turn. The conflict with ESLint arises because ESLint has its own style rules — `quotes`, `semi`, `comma-dangle` — and Prettier overrides them on save. The common fix is `eslint-config-prettier`, which disables the conflicting ESLint rules, but now Prettier owns formatting and ESLint owns everything else. When a rule exists in both, you configure it twice and hope they agree.

Anthony Fu covers this in detail in [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier).

## Setup

Install the Stylistic plugin:

```sh
npm install -D @stylistic/eslint-plugin
```

Then configure it in `eslint.config.js`:

```js
import stylistic from '@stylistic/eslint-plugin'

export default [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    commaDangle: 'always-multiline',
    arrowParens: false,
  }),
]
```

`stylistic.configs.customize` returns a flat config object with all formatting rules set to your preferences. You can override individual rules on top of it the same way you would any ESLint rule.

## Editor config

### VS Code

Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), then add this to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "eslint.format.enable": true,
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

`eslint.format.enable` tells the extension to act as a formatter, not just a diagnostics provider. Without it, format-on-save falls back to VS Code's built-in formatter and ESLint fixes are not applied.

### Zed

Zed uses LSP code actions rather than a dedicated formatter slot for ESLint. Disable Prettier and enable the ESLint fix action per language in `.zed/settings.json`:

```jsonc
{
  "prettier": {
    "allowed": false
  },
  "format_on_save": "on",
  "languages": {
    "JavaScript": {
      "formatter": [],
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    },
    "TypeScript": {
      "formatter": [],
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    },
    "Vue.js": {
      "formatter": [],
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  }
}
```

`"formatter": []` disables any external formatter for that language — Zed then relies solely on the ESLint code action to reformat on save. The file uses JSONC syntax, so trailing commas are valid here.

## CSS

ESLint Stylistic covers JavaScript and TypeScript formatting only. For CSS, SCSS, or Less files you still need a separate tool. [Stylelint](https://stylelint.io) is the closest equivalent — it lints and formats stylesheets with the same rule-based approach, and integrates with the same editor extensions.

If your project uses scoped styles inside `.vue` files, `vue-eslint-parser` handles the `<script>` and `<template>` blocks while Stylelint handles the `<style>` block independently.

## Resources

- [ESLint Stylistic — Why?](https://eslint.style/guide/why)
- [Anthony Fu's Why I don't use Prettier](https://antfu.me/posts/why-not-prettier)
- [Stylelint getting started](https://stylelint.io/user-guide/get-started)
