---
title: How Lyne resumes a book on the exact line
date: 2026-11-11
summary: Three decisions behind Lyne's position sync.
---

[Lyne](https://lyne.page) is an EPUB reader for the web and Android. Its one promise is that you can stop reading on your phone and carry on from the same line on your laptop. The first commit was in late July 2026 and the app went public on Google Play in mid-September. This is how the position sync works, and what I would change.

## The problem

I set three requirements before writing any code:

- The library and the reading position sync across devices.
- A book reopens on the exact line, even if the other device has a different screen or font size.
- It runs on free hosting and a free backend.

The second one is the hard part. A page number means nothing when the page size changes, and a percentage is only close: one percent of a novel is three or four pages.

## Decision 1: one reader engine on both platforms

EPUB has a format for exact places, the CFI. It is a path through the book's markup down to a character, so it does not depend on layout. Lyne saves one with every position:

```ts
interface ReadingPosition {
  book_id: string
  cfi: string | null // the exact place
  href: string | null // the chapter
  progression: number | null // 0 to 1 over the whole book, the fallback
  device_id: string
  updated_at: string
}
```

The catch is that two different reader engines can produce different CFIs for the same place. My first plan for Android was a fully native reader, with `progression` as the bridge between engines. That would have meant "close to where you were", not the exact line.

So the Android app is native Kotlin and Compose for the library, files, sign-in and sync, but the page itself is a WebView running the same `reader-core.js` as the web app. The build copies that file into the app's assets. Both platforms now produce identical CFIs, and highlights and saved words use the same addresses.

The engine changed early too. I started on epub.js, but in scroll mode it did not report where the reader was, so nothing was saved. I replaced it with [foliate-js](https://github.com/johnfactotum/foliate-js), which tracks position while scrolling.

## Decision 2: save on the device first, sync second

The first Android version wrote the position 600 ms after the last scroll, and leaving the book cancelled that timer. Close a book quickly while offline and it reopened at the cover.

Now the position is written to the device on every move, and only the network push waits for the pause.

Syncing had a second fault. On reconnect the app pushed every queued position without looking at the server, so an old offline position could overwrite newer reading done on another device. The fix has three parts:

- Read the server's rows first, and push only the positions that are newer.
- If that read fails, skip the push. Pushing blind is how the overwrite happened.
- Compare timestamps as times, not as text. The phone wrote `...Z` and the server returned `...+00:00` for the same instant, and as strings those do not match.

One rule does not need a clock at all. A queued position exists only because it never reached the server. If the server's row came from this same device, the queued one is newer.

## Decision 3: restore what is on screen, not what was saved

On Android, tapping the page hides the header. That tap sometimes threw the reader back to where they had opened the book, and kept doing it on every tap.

The header change resized the WebView, which made the engine lay the chapter out again. After a new layout the engine returned to its remembered anchor, and that anchor lagged behind where the reader actually was.

The fix was to stop trusting the remembered place. Before anything that changes layout, Lyne captures the text range on screen and restores that. If the width did not change, the text does not reflow, so it restores nothing. Resize events are also grouped per frame, because the header animation had turned one tap into about 25 layouts.

## What I would change

- **Stop trusting device clocks blindly.** Both apps stamp `updated_at` themselves, because only the device knows when offline reading happened. The server should refuse a write older than the row it holds and cap any timestamp that is in the future.
- **Bring the web app level with Android.** The web app still saves a position only after a 600 ms pause, so a quick exit loses the last move. Its queue pushes without reading the server first, and it forgets a position once it has synced. Offline, the web library cannot show progress for a book.

## Result

Lyne has 100+ installs on Google Play and runs entirely on free tiers. You can try it at [lyne.page](https://lyne.page).
