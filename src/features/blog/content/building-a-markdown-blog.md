---
title: Building a markdown-powered blog
date: 2026-03-20
summary: Why simple content files are often the best long-term choice for a personal site.
---

# Why markdown fits a personal site

For a portfolio or personal website, markdown keeps the writing workflow lightweight. You can add a new post in one file, commit it with the rest of the project, and keep content close to the code that styles it.

## What I care about most

- Fast publishing without adding a CMS too early
- Clean routing and predictable file structure
- Styling that feels native to the site instead of pasted in

## The practical setup

Store posts in `src/features/blog/content`, add a small frontmatter block for metadata, and let the app render those files into a shared article layout.

```ts
---
title: Example post
date: 2026-03-20
summary: A short preview for the listing page.
---
```

That gives you a good base now, and it still leaves room to swap in a richer markdown pipeline later if the blog grows.
