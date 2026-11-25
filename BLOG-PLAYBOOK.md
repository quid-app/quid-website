# Quid blog playbook

How a new blog post gets researched, written, built and published on quidapp.co.uk. The scheduled blog task follows this file. Edit it to change how the task behaves.

## Who the posts are for

International students moving to, or already in, the UK. Most are from India and China. London first (King's, UCL, Northeastern London), then the rest of the UK.

Their real problems:
- Money runs out before term ends, and prices only make sense in their home currency.
- The bank account takes weeks, and everything else waits on it.
- Admin nobody explained: eVisa and share codes, GP, National Insurance, council tax, Oyster, SIM.
- Loneliness, and not wanting to ask for help.
- Not knowing which student deals are worth having.

Every post answers one question a student actually types into a search box, and ends on what Quid does about it.

## What Quid can claim

Only features that are live in the app today:
- Daily allowance from a monthly budget, in pounds and the home currency at a live rate
- Spend logging, including from the home-screen widget
- First-week checklist (bank, SIM, GP, NI number if working, 18+ Oyster, council tax, eVisa, Railcard), with links and reminders
- Before-you-fly mode: halls that fit your rent, travel eSIM, money sent for less, arrival-date countdown
- Student deals, Community (your uni, your country, The Lineup for events), Quid AI (not offered on the China App Store from version 1.0.4, so never promise it to readers in mainland China)
- Income, recurring costs and savings goals

Not built: automatic logging from Apple Wallet (may only be called "coming soon"), Android, tuition payment, guarantor, anything bank-connected. Quid is not a bank and gives no financial or immigration advice. If unsure whether a feature exists, do not mention it.

## Choosing a topic

1. List what is already published: every file in `blog/` and its title. Never write a post that targets the same search as an existing one.
2. Research what students are searching and asking now, from public sources: Google results and "People also ask" for international-student queries, Reddit and The Student Room threads, UKCISA, university international-student pages, GOV.UK news. Use forums only to find questions, never as a source of facts.
3. Prefer questions with a clear, checkable answer and a seasonal reason to publish now (January intake, council tax bills in spring, summer work hours, September arrivals, Graduate route deadlines).
4. Keep a spread across Money, Paperwork, and Phone and travel. Check the topics of the last four posts and pick a different one.
5. Write down, in the commit message, the target search phrase and why now.

## Facts: the rule that cannot bend

Posts publish without human review, so nothing goes out unverified.

- Every number, date, price, rule, eligibility condition and timescale must be read in this run from a primary source: GOV.UK, NHS, HMRC, TfL, Ofcom, Ofgem, ONS, UKCISA, a named university page, or the provider's own page for its own prices.
- No facts from memory, forums, blogs, news rewrites or AI summaries. No invented or estimated numbers. No rounding that changes meaning.
- If a fact cannot be confirmed on a primary source page, cut the sentence. If the post's main answer cannot be confirmed, drop the topic and pick another.
- Where rules differ by nation, visa type, course length or age, say so, or scope the post to the case that was checked.
- Never tell a student what their visa allows in their own case. State the published rule and link the official page.
- List every source in the Sources section with its URL and the date checked (today).
- After drafting, do a second pass with fresh eyes: go through the post claim by claim and re-open the source for each one. Fix or cut anything that does not match exactly.
- If two primary sources disagree, cut the claim.
- Publishing one post instead of none is fine. Publishing nothing is better than publishing something unverified.

## Writing

- Voice: a friend who has already done the move. Warm, practical, no lecturing.
- Open with the answer in the first paragraph. Then the detail. Then "Quick answers" (4 to 6 short FAQs). Then Sources.
- Lead with the student's problem, then the fix.
- UK spelling. No em dashes. No generic AI phrasing, no filler openers, no "in today's world".
- 3 to 5 minute read. Short paragraphs, plain words, real examples in pounds.
- Do not copy wording from sources. Quote at most a short phrase, and only when the exact words matter.
- Link to 2 or 3 related Quid posts and to `/deals` where a deal is relevant.

## Calls to action for the app

Each post carries both:
1. One sentence inside the article, near the end of the body, saying what Quid does about this exact problem, using only live features, with a link to the App Store: `https://apps.apple.com/gb/app/quid-uk-student-life/id6791167493`.
2. The lime "Your UK move, minus the panic." section with the "Download on the App Store" button at the bottom, as in the existing posts.

No more than that. The post has to be useful to someone who never downloads the app.

## Building the page

Copy the newest post in `blog/` as the template and change only the content. Keep the layout, CSS, scripts, nav, footer and cookie banner untouched.

For each new post:
- `blog/<slug>.html`. Slug in lowercase words with hyphens, built from the target search phrase.
- Head: title, meta description, canonical `https://quidapp.co.uk/blog/<slug>`, og and twitter tags, og:type `article`, and the JSON-LD (Article, FAQPage for the Quick answers, breadcrumbs) with today's date. The FAQ JSON-LD must match the visible text.
- Visible date and "Checked <date>" line set to today. Section ids and the "On this page" lists renumbered to match.
- Related posts row at the bottom pointing at three real posts.
- Cover `blog/covers/<slug>.png` and `.webp` at 1200 x 630, in the same style as the existing covers: dark green grid background, "QUID · BLOG" top left, headline bottom left in white with the second half in lime italic serif, one simple flat illustration on the right, `quidapp.co.uk` bottom right. No photos, no logos of other brands, no people.
- Thumbnail `thumbs/<slug>.webp` at 480 x 480 in the same style.
- `blog/index.html`: add a card to the "Everything else" grid, newest first, with the right `data-topic` (money, paperwork or travel).
- `sitemap.xml`: add the URL with today's date.
- `llms.txt`: add the post under Blog.
- Open the page in a browser or render it, at desktop and mobile widths, and look at it before publishing. Check every link returns 200.

## Publishing

1. Work on a branch named `blog/<slug>`.
2. Commit, push, open a pull request, and merge it into `main` (squash).
3. The "Deploy to Cloudflare" workflow publishes `main` to quidapp.co.uk.
4. A few minutes later, fetch `https://quidapp.co.uk/blog/<slug>` and confirm it is live. If it is not, say so clearly in the run summary and do not retry the deploy by other means.

## Run summary

End each run with a short note: the post title and URL, the target search phrase, why it was chosen, the sources used, anything that was cut because it could not be verified, and whether the page is live.
