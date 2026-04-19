# Workout Tracker

A coaching app for people with non-standard health needs — those managing medical restrictions, chronic conditions, recovery from injury, or late-life fitness starts. The goal is adaptive, medically-aware, AI-powered coaching that works around the user's medical reality rather than assuming a healthy baseline.

For full product vision, personas, and phased plan, see [`requirements.md`](./requirements.md).

## Status

**v1 — Local prototype.** A single-user workout logger running entirely in the browser with `localStorage`. No accounts, no sync, no coach yet.

**v2 — In planning.** Rebuild on React + TypeScript + Supabase with email/password auth, per-user data isolation, and an AI coach powered by the Anthropic Claude API. See the phased rollout in `requirements.md` §11.

## What v1 does

- Log workouts with a name, a list of exercises, and sets of reps / weight / RPE
- View chronological history, expand a session to see its sets, delete sessions
- Toggle between lbs and kg (stored canonically in lbs, converted on display)
- Persist everything in `localStorage` — no backend

Out of scope for v1: accounts, routines, the coach, analytics, unstructured activity logging, offline sync, editing past workouts. All covered in later phases.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Plain JavaScript (TypeScript introduced in v2)
- ESLint with `react-hooks` and `react-refresh` plugins

## Running locally

Prerequisites: Node.js (any recent LTS) and npm.

```bash
npm install
npm run dev      # start Vite dev server with HMR
npm run build    # production build to ./dist
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Project structure

```
src/
  main.jsx                       # React entry point
  App.jsx                        # top-level shell + two-tab nav
  index.css                      # Tailwind import
  components/
    WorkoutContext.jsx           # state + localStorage persistence + unit conversion
    NewWorkout.jsx               # create-workout form (exercises, sets, reps, weight, RPE)
    WorkoutHistory.jsx           # chronological list with expand / delete / unit toggle
```

## Owner

Ram — building for friends and family first, with eventual migration to Raime LLC. This is not (yet) a commercial product.

## Related docs

- [`requirements.md`](./requirements.md) — full product requirements, personas, and phased rollout
- `coach-spec.md` — LLM system prompt for the AI coach (to be created in Phase 5C)
- `data-model.md` — database schema (to be created during implementation)
