---
title: Configuring Zed for Vue 3 development
date: 2026-04-30
summary: Zed is fast, but its Vue 3 and TypeScript setup needs a few deliberate choices before it stops fighting you.
---

Zed is fast enough that the difference is noticeable immediately — startup is near-instant, scrolling is smooth, and LSP responses arrive before you finish typing. But out of the box, a Vue 3 project needs a few things adjusted before the editor feels complete.

## Enable Volar, not Vetur

Zed uses `@vue/language-server` (Volar) for `.vue` file support. Make sure it is active and Vetur is explicitly disabled in your workspace settings:

```json
{
  "languages": {
    "Vue": {
      "language_servers": ["vue-language-server", "!vetur"]
    }
  }
}
```

The `!vetur` entry forces Vetur off even if it was somehow activated. Running both at the same time causes duplicate diagnostics and hover conflicts.

## Point Volar at your local TypeScript

If you have split tsconfig references (`tsconfig.app.json`, `tsconfig.node.json`), Volar may not find TypeScript automatically. Add this to your workspace settings:

```json
{
  "lsp": {
    "vue-language-server": {
      "initialization_options": {
        "typescript": {
          "tsdk": "./node_modules/typescript/lib"
        }
      }
    }
  }
}
```

This tells the language server exactly where to find TypeScript rather than relying on a global install, which may be a different version than the one your project uses.

## Formatting

Zed has a built-in formatter for some file types but delegates `.vue` files to a language server or external tool. If you are using Prettier:

```json
{
  "formatter": {
    "language_server": { "name": "prettier" }
  }
}
```

If your project uses `oxfmt` (a faster Oxc-based formatter), note that Zed does not call CLI formatters directly yet. Run it via a task or pre-commit hook instead.

## Tasks for the dev workflow

Zed's task system removes most reasons to keep a separate terminal pane open. Create `.zed/tasks.json` at the repo root:

```json
[
  {
    "label": "Dev server",
    "command": "bun run dev",
    "allow_concurrent_runs": false
  },
  {
    "label": "Type check",
    "command": "bun run type-check"
  },
  {
    "label": "Format",
    "command": "bun run format"
  }
]
```

`Cmd+Shift+R` opens the task picker. `Cmd+R` reruns the last task. For a long-running Vite dev server the `allow_concurrent_runs: false` flag prevents accidentally spawning a second instance on a different port.

## What still falls short

Zed's Vue support is solid but not yet at VS Code + Volar parity on a few things:

- **Deep prop inference** across component hierarchies is occasionally slow or incomplete. Complex generics-based component props sometimes show no completions.
- **Scoped CSS class completion** inside `<template>` does not resolve across `<style scoped>` blocks. You will not get class name hints from your own component's styles.
- **Extension ecosystem** is much smaller. If you depend on specific VS Code extensions, check availability before committing fully.

The speed advantage is real and compounds over a full day of work. For a Vue 3 + TypeScript project the configuration above covers the majority of what you need.
