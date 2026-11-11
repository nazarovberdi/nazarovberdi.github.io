---
title: Bileje, paid invitations with no sign-up and no checkout
date: 2026-11-11
summary: Three decisions behind Bileje's paid links.
---

[Bileje](https://bileje.biz) lets you build a playful date invitation and send it as a link. The person who gets it opens an envelope or answers a fake incoming call, meets a No button that runs away, picks a time and a place, and their reply comes back to you. It started in October 2026, and since 1 November every link is paid. This is how it sells links with no account and no checkout page, and what I would change.

## The problem

An invitation is a one-off. Someone makes it in a few minutes, on a phone, for one person. Anything that slows that down loses them.

Payment is the other constraint. Buyers pay with a phone balance transfer or cash, which happens outside the site, so the site cannot see a payment arrive.

## Decision 1: no sign-up

Senders never create an account. On the first save the app quietly creates an anonymous Supabase user behind an invisible CAPTCHA, and the invitation belongs to that user. An email is optional, for people who want their invitations on another device.

I chose this over an account before paying for two reasons. A sign-up wall kills a short, playful flow. And an email address would not help match a phone transfer to an invitation anyway.

## Decision 2: match payments by a code, confirm them by hand

When a sender asks for a link, they get a six-character payment code. They send us the code, pay, and the purchase is confirmed on an admin page, which publishes the invitation. The sender's page switches to the link by itself.

The hard part is connecting a payment to an invitation. When money arrives on a phone, nothing says which invitation it is for. The payment code is that connection, and the way it travels changed three times in two weeks:

1. **Code in the transfer comment.** The sender would write the code in the comment of their transfer. But people pay by phone top-up, and a top-up has no comment field.
2. **Match by phone number.** The site showed our number and asked the sender which number they would pay from. On the admin page the code, the amount and that number were matched. But we had not settled which of our numbers would take payments, so the site could not show a fixed one.
3. **Arrange it in a chat.** The site stopped showing a number. The sender got the code and a link to our TikTok, sent the code there, and we replied with where to pay.
4. **SMS first.** Today the sender texts the code and the number they will pay from to one of our numbers, and we reply with where to pay. A three-picture guide on the screen shows the steps. TikTok and Instagram are the backup.

Two rules stayed fixed through all of it. Payment is checked inside the database functions, never only in the interface. And paid publishing is one setting in the database, so turning it on needed no deploy.

Pricing changed too. I sold a pack of three invitations next to the single one, and took it off sale after about a week. People read "3 invitations" as three copies of the one they were making, and the price has to be clear before anyone pays.

## Decision 3: the link gives nothing away, and locks on the first touch

The invitation is a surprise, so the link must not spoil it. Recipient links are served from their own HTML page with no title and no description. A messenger preview of the link shows nothing.

An invitation's content also locks once the recipient opens it. After that the sender can rename or delete it, but not change it.

At first "opened" meant the page loaded for anyone but the sender. Then links shared on Instagram were locking within minutes, before the recipient had seen them, because Instagram loaded the page itself. Now an invitation counts as opened on the recipient's first touch inside it: a tap, a press or a key. That is the same moment its song is allowed to start. The database function that records it ignores the sender's own user:

```sql
update public.invitations set opened_at = now()
  where share_token = p_token and status = 'published'
    and deleted_at is null and opened_at is null
    and owner_id is distinct from auth.uid();
```

## What I would change

Skipping sign-up has a cost. Every visitor who saves a draft leaves an anonymous user behind, and nothing removes the ones that never publish. I accepted that to keep the flow short, but it needs a clean-up job before the numbers grow.

## Result

Bileje has its first paying customer. It runs in Russian, Turkmen and English. Without backend keys the app falls back to a local demo mode that keeps everything in the browser, and the Playwright tests run against that mode at desktop and phone sizes.
