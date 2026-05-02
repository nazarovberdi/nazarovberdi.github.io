---
title: Using zed editor for vue projects
date: 2026-04-30
summary: Lightweight zed editor
---

# Zed editor config for vue projects

```ts
const proseSelectors = [
  'h1',
  'h2',
  'p',
  'ul',
  'blockquote',
  'pre code',
]

function applyProseTheme(className: string) {
  return proseSelectors.map((selector) => `${className} ${selector}`)
}
```
