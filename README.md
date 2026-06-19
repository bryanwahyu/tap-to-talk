# Tap to Talk 🗣️

A free, offline-capable **tap-to-talk communication board** (AAC) for people who are
non-verbal or minimally verbal. Tap a picture → the device says it out loud. Tap a
few pictures → it speaks a whole sentence.

**Live demo:** https://tap-to-talk.vercel.app/

---

## What it is & how to run it

A single-page web app (Next.js + TypeScript). Speech uses the browser's built-in
`SpeechSynthesis` API — **no backend, no API keys, no account**. The board and any
custom buttons are saved in the browser's `localStorage`, so it keeps working
offline and remembers your setup on that device.

```bash
npm install
npm run dev      # http://localhost:3000
# production:
npm run build && npm start
```

Deploy: push to GitHub and import the repo on **Vercel** (zero config — it detects
Next.js). No environment variables required.

> Use a browser with speech support (Chrome, Edge, or Safari). The app detects an
> unsupported browser and tells you, but still lets you build sentences.

## Who it's for, and the one job

**For:** non-verbal and minimally-verbal people — and the parents, carers, teachers
and speech therapists who set boards up for them. Think a child with autism, an
adult recovering from a stroke, or someone non-speaking in a clinical setting.

**The one job it must do well:** let someone tap a picture and have a voice say the
word **immediately**, with zero friction. Everything else is secondary to that tap →
sound loop feeling instant and reliable.

## Why this problem & how I know it's worth solving

Around 1% of people have complex communication needs and benefit from AAC
(Augmentative and Alternative Communication). Not being able to ask for water, say
you're in pain, or tell someone you love them is a daily, high-stakes problem.
Dedicated AAC devices and the best apps are genuinely good — but they're often
**£150–£300, locked to iPad, or behind a paywall/login**. That cost and friction
leaves people without a voice exactly when they need one (a hospital visit, a
borrowed phone, a first try before committing money).

## What's already out there, and why I built this anyway

Proclaim2Go, Proloquo2Go, TouchChat, CoughDrop and others exist and are more
powerful. I built this because the **lightweight, instant, free, open-in-a-browser**
end of the spectrum is thin: most options need an install, a purchase, or a login
before a person can say a single word. This app's bet is that a board you can open
on *any* device via a URL — and that works offline once loaded — is useful as a
free first step, a backup, or a no-cost option for families who can't justify a
paid app yet.

## In scope / out of scope (and why)

**In scope (the core loop must be excellent):**
- Tap-to-speak with immediate audio feedback
- Sentence building (tap several, then "Speak"), backspace + clear
- A solid starter vocabulary: Core, Needs, Feelings, People, Places
- Add / edit / delete your own buttons (emoji, label, spoken text, colour, category)
- Voice / speed / pitch settings; saves automatically; works offline
- Big touch targets, high contrast, keyboard-focusable, ARIA labels, `aria-live`
  sentence

**Out of scope (deliberately, to ship something that works in the time):**
- Accounts / cloud sync across devices (kept it local — no login friction, no
  privacy concerns, but a board doesn't follow you to a new device yet)
- Symbol sets (PCS/SymbolStix) — used emoji to stay free and dependency-light
- Grammar/conjugation, predictive sentences, multi-language UI
- Switch-scanning / eye-gaze input (real AAC users need this — see "next")
- Reordering tiles by drag — edit exists, ordering doesn't yet

## Where I didn't have answers — what I assumed

- **Vocabulary:** I assumed a small "core words + needs/feelings" board is the right
  default. Real AAC practice has strong opinions (core-word vs. fringe, motor
  planning consistency). I'd validate this with an SLT (speech & language therapist).
- **Emoji as symbols:** assumed emoji are recognisable enough for a free tool. Some
  users need consistent, literal symbol sets — emoji may be ambiguous.
- **Local-only storage:** assumed "works on this device, no login" beats sync for a
  first version. For a shared family device that's fine; for a user with their own
  phone who upgrades, it loses data.
- **One voice per device:** assumed the OS default voice is acceptable; voice quality
  varies a lot by platform.

## Three questions I'd ask a real user before building more

1. When you reach for this, what's the situation — a planned daily tool, or a
   backup when the "real" device isn't around? (Tells me whether sync matters.)
2. Who sets up the buttons, and how often do they change them — the user, or a
   carer/therapist? (Shapes the edit experience and permissions.)
3. How do you physically select — finger, a single switch, or eye-gaze? (Decides
   whether scanning support is the most important next feature.)

## How I'd know it's working, and what's next

**Working looks like:** the tap → sound loop feels instant (< ~100ms perceived);
someone with no training can say something useful in their first minute; a carer can
add a needed word in under 30 seconds. I'd watch time-to-first-utterance and whether
people return / add custom buttons (a sign it became *theirs*).

**Next:**
1. **Switch-scanning input** — the biggest accessibility gap for motor-impaired users.
2. **Export / import a board** (JSON, or a share link) — moves boards between devices
   without building accounts.
3. **Drag-to-reorder** and resizable grids so motor-planning stays consistent.
4. Optional **symbol set** alongside emoji.

## How I used AI

I built this with AI assistance (Claude / Claude Code) for scaffolding the Next.js
app, the speech wrapper, the default vocabulary, and styling — which let me spend the
time on the *product* decisions (scope, vocabulary, accessibility) rather than
boilerplate.

**Where it got something wrong that I caught:** the first speech implementation just
called `speechSynthesis.getVoices()` on load and populated the voice menu from it. On
Chrome that returns an **empty array** on first load — voices populate asynchronously
and fire a `voiceschanged` event later — so the voice picker came up empty. I caught
it testing in Chrome and rewrote it to wait for `voiceschanged` (with a timeout
fallback) before reading the voice list. Also added a `speechSynthesis.cancel()`
before each utterance so rapid taps don't queue up and lag behind the user.

## Tech

Next.js 15 (App Router) · React 19 · TypeScript · Web Speech API · `localStorage`.
No backend, no database, no tracking.

## License

MIT
