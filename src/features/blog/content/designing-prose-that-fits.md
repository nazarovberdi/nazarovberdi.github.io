---
title: Designing prose that fits the site
date: 2026-03-16
summary: Markdown should stay simple, while the website owns typography, spacing, and code block presentation.
---

# Markdown is content, not design

The markdown file should describe the content. The design should come from your CSS layer. That separation keeps writing portable and makes the final result look consistent across every post.

## How the styling works

Wrap the rendered HTML in a dedicated container like `blog-prose`, then target the elements that markdown usually produces:

- headings
- paragraphs
- lists
- links
- blockquotes
- inline code
- code fences

When that wrapper is scoped well, you can evolve the visual language of the whole blog without rewriting old posts.

## A code block should feel native too

Here is a simple example of the kind of snippet a post can include:

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

> The goal is not to style markdown generically. The goal is to make prose feel like a natural extension of the website.

## Adding images

You can embed images with the standard markdown syntax. Images stored in `/public` are served at the root path:

![A description of the image](/images/example.png)

Or link to any external URL:

![Vue.js logo](https://vuejs.org/logo.svg)
