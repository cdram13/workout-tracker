# Workout Tracker / AI Coaching App — Requirements

**Status:** Draft v1 (April 2026)
**Owner:** Ram
**Purpose:** Product requirements for the v2 rebuild, targeting friends-and-family use with an AI coaching feature, eventual migration to Raime LLC.

---

## Table of Contents

1. [Vision and Goals](#1-vision-and-goals)
2. [User Personas](#2-user-personas)
3. [Product Philosophy](#3-product-philosophy)
4. [AI Coach](#4-ai-coach)
5. [Core Features](#5-core-features)
6. [Analytics and Insights](#6-analytics-and-insights)
7. [Social Features (Deferred)](#7-social-features-deferred)
8. [Settings and Preferences](#8-settings-and-preferences)
9. [Infrastructure and Non-Functional Requirements](#9-infrastructure-and-non-functional-requirements)
10. [Non-Goals](#10-non-goals)
11. [Phased Rollout Plan](#11-phased-rollout-plan)

---

## 1. Vision and Goals

### Vision

A coaching app for people with non-standard health needs — those managing medical restrictions, chronic conditions, recovery from injury, or late-life fitness starts — that goes beyond workout tracking to provide adaptive, medically-aware, AI-powered coaching.

### Goals

- Build an app that works around the user's medical reality rather than assuming a healthy baseline
- Use conversational AI to gather each user's specific needs, limitations, and goals
- Generate personalized workout programs for strength training, mobility, and PT-style rehab
- Allow real-time mid-session adjustments based on how the user is feeling
- Adapt and suggest progressions based on logged progress over time
- Serve as a supplement to (not replacement for) licensed medical and physical therapy professionals
- Ship something the creator's friends and gym buddies can actually use

### Non-vision

- Not a generic fitness tracker competing with Strong, Hevy, or similar apps
- Not a replacement for PTs, doctors, or trainers
- Not a social fitness platform (v1)
- Not a commercial SaaS product (yet)

---

## 2. User Personas

### Persona 1: Ram — The Recovering Multi-Sport Athlete

**One-liner:** 37-year-old former athlete and climber managing cervical spine stenosis and TOS while trying to maintain fitness and push climbing progress.

**Health situation:**
- Cervical spine stenosis (moderate to severe) causing nerve compression
- Thoracic Outlet Syndrome (TOS) affecting left arm
- Left-side lower back QL strain (slowly recovering)
- Compromised left arm limits upper-body lifting
- Symptoms fluctuate day-to-day

**Current activity:** Climbing (primary), Orange Theory Fitness, commercial gym available but underutilized.

**Goals (priority order):**
1. Lower body fat percentage
2. Restore full range of mobility
3. Eliminate pain
4. Push climbing progress

**Frustrations with existing apps:**
- No custom program generation for specific restrictions
- No feedback mechanism on how exercises feel
- No daily adjustments based on condition
- No integration with PT recommendations
- Generic progression schemes don't fit health realities

**Killer feature:** Real-time workout adjustments + intelligent progression suggestions.

---

### Persona 2: The Late-Start Active Retiree (modeled on Ram's dad)

**One-liner:** Mid-60s retiree with significant structural restrictions, never lifted weights, wants to stay active and functional without making existing conditions worse.

**Health situation:**
- Shoulder pain requiring eventual surgery
- Fused cervical vertebrae (similar spinal condition to Ram, further progressed)
- Age-related wear, no formal arthritis diagnosis

**Current activity:** Walks around house, extended computer time, no structured exercise.

**Goals:**
1. Build consistent physical activity habit
2. Introduce very light resistance training safely
3. Maintain cardiovascular health (walking, rowing)
4. Avoid worsening existing conditions
5. Stay functional and independent

**Killer feature:** Coach that says "given your shoulder and your spine, here are 4 exercises you can safely do today with just a resistance band."

---

### Persona 3: Morgan — The Mid-Career Professional Rebuilding Fitness

**One-liner:** 38-year-old knowledge worker with a demanding desk job, rebuilding fitness after years of letting it slide, dealing with posture-related aches and chronic stress.

**Health situation:**
- No major diagnosed conditions
- Posture-related aches (lower back, shoulders, hips)
- Possibly tennis elbow from typing
- 15-25 lbs heavier than athletic peak
- Chronic stress affects recovery

**Current activity:** Inconsistent gym visits, dusty Peloton, intermittent running phases.

**Goals:**
1. Consistency above all
2. Feel better day-to-day
3. Lose weight and rebuild muscle
4. Avoid injury
5. Reclaim athletic identity

**Killer feature:** Coach that responds to "I only have 20 minutes and I'm tired" with a genuinely useful short workout — the minimum effective dose.

---

### Persona 4: Alex — The Chronic PT Patient Expanding into Strength Training

**One-liner:** Mid-30s desk worker managing a chronic musculoskeletal condition through ongoing PT, comfortable with cardio, ready to add structured weightlifting for the first time.

**Health situation:**
- Chronic musculoskeletal condition requiring ongoing PT management
- Stable but not going away — long-term reality
- Has specific exercises prescribed by PT
- Day-to-day variability

**Current activity:** PT homework (consistent), occasional running, zero strength training experience.

**Goals:**
1. Continue PT work consistently
2. Add strength training safely
3. Build foundational strength
4. Keep running enjoyable
5. Long-term: feel strong and in control despite the condition

**Killer feature:** Coach that generates a safe beginner strength program designed around their PT restrictions, coordinated with their running, and adjusts as the body responds.

---

## 3. Product Philosophy

Core design principles that emerged during requirements gathering:

- **Chat as the primary interface for nuance.** Structured UI for browsing and quick actions; chat for everything complex or conversational.
- **User agency above all.** The user is in charge; the coach informs, suggests, and responds to requests. Overrides are respected.
- **Low friction.** Minimize required fields, avoid nagging, respect time.
- **Proactive by default, easily silenced.** Coach engages actively; users can disable any proactive behavior permanently.
- **Medical awareness with humility.** Coach knows each user's conditions and restrictions; defers to real medical professionals.
- **Restrictions as hard constraints.** Restricted movements are respected by default; users can override with a single flagged concern.
- **Respect for variability.** Day-to-day body condition matters more than rigid plans.

---

## 4. AI Coach

### 4.1 Coach Philosophy and Tone

**What the coach is:**
- Knowledgeable training partner
- Medically aware, medically humble
- Supplement to (not replacement for) PTs and doctors
- Adaptive — learns from performance data and conversation
- Always available via chat

**What the coach is not:**
- Not a doctor (no diagnosis)
- Not a PT (doesn't prescribe rehab protocols)
- Not a nutritionist (out of scope for specific plans)
- Not a drill sergeant (no shame or pressure)
- Not omniscient (acknowledges uncertainty)
- Not a therapist (surfaces appropriate resources instead)

**Scope:**
- In-scope: training, mobility, PT-style work, recovery, warmups, cooldowns, exercise selection, progression, form cues, sleep and stress as they affect training, returning from injury, equipment choices, general fitness goals
- Out-of-scope: specific nutrition programming, medical diagnosis, therapy, detailed supplement advice

**Tone principles:**
- Respectful of user agency
- Calibrated to the user (advanced language for experienced users, gentler for beginners)
- Direct but warm
- Evidence-aware, not evidence-preachy
- Comfortable with uncertainty
- Humor is okay if the user initiates

**PT interaction:**
- If user has a PT: defers to their plan; suggests modifications only on clear progress or user request
- If user has no PT but presents with musculoskeletal issues: can build conservative PT-style routines with appropriate disclaimers
- Recommends seeing a licensed PT for persistent issues
- User can override; coach flags concern once, then yields

---

### 4.2 Intake and Onboarding

**Approach:** conversational, pointed, variable-length.

**First experience:** coach intake chat is the first thing new users see after signup, with a clear "more on this later" skip option.

**Required context to gather:**
- Primary goals
- Current activity level
- Training experience
- Medical conditions and current limitations
- Medical team presence (PT, doctor, etc.)
- PT-prescribed exercises if applicable
- Equipment access
- Typical time availability

**Optional context:**
- Medications affecting training
- Age and life context
- Past injuries (even healed)
- Activity-specific goals
- Preferences and motivation style
- What's worked or hasn't before

**Progressive intake:**
- Coach extracts context from any conversation, not just initial intake
- Targeted follow-up questions when relevant
- Acknowledges new information
- Periodically revisits assumptions

**Skip behavior:** coach operates in "learning as we go" mode; first interactions prioritize gathering context naturally; coach can acknowledge limited context and note that suggestions will become more personalized.

---

### 4.3 User Context Model

Two layers:

**Layer 1 — Structured fields:**
- Goals
- Medical conditions
- Medications affecting training
- Medical team
- PT-prescribed exercises (active list)
- Restricted movements (coach-managed, invisible)
- Equipment access
- Time availability
- Training experience level
- Age and life context
- Preferences

**Layer 2 — Conversational summary:**
- Running narrative capturing nuance that structured fields can't
- Updated as conversations happen
- Periodically consolidated

**Chat history:** separate from context; summarized into context layer after ~60 days.

**Update mechanism:**
- Coach silently updates context from conversations (no confirmation required)
- Users can correct via chat
- Profile is read-only to users; corrections happen conversationally

**Profile visibility:** users can see a "what does the coach know about me" view on request, but not directly edit it.

**Restricted movements:**
- Invisible to user, coach-managed
- Populated from conditions, user statements, PT guidance, and trial-and-error
- User can temporarily override any entry with a single flagged concern

---

### 4.4 Routine Generation

**Routine types:** strength, mobility, PT. (Cardio is unstructured.)

**Parallel routines:** users can have multiple active routines running simultaneously with different schedules.

**Distinctions:**
- Routine = the plan
- Workout session = the event
- Log = the memory

**Routines are user-modifiable:** same rich UI for both coach-generated and manual routines.

**Coach-generated flow:**
1. User requests a routine (or coach prompts)
2. Coach gathers routine-specific context
3. Coach drafts the routine (name, schedule, exercises, targets, progression plan)
4. User reviews, modifies, or rejects
5. Routine becomes active
6. Coach checks in after first few sessions

**Manual creation:** fully supported, first-class path, same UI as coach-generated.

**Coach on/off toggle:**
- Users can disable the coach entirely
- At toggle-off, user is asked whether to keep building context (for re-enabling later) or stop collecting
- Logging-only mode must work well standalone

**Schedule coordination:** coach considers total training load across all active routines.

**Versioning:** significant changes create a new routine version; small modifications just edit in place.

**PT-prescribed integration:** users can walk the coach through their PT plan; coach captures as a routine with source = "PT-prescribed" and respects it as baseline.

---

### 4.5 Mid-Session Interaction

**Common scenarios:** pain, equipment unavailable, low energy, good day, form questions, time pressure, substitutions, clarification, environmental constraints.

**Chat access during workouts:**
- Prominent button on active workout screen
- Opening chat does not end session
- Session state visible to coach automatically (routine, completed exercises, remaining, time elapsed)

**Modification scope:**
- Affects current session only by default
- Underlying routine unchanged
- Completed sets preserved
- Log records what actually happened

**Coach actions on remaining portion:** substitute exercises, adjust volume, adjust intensity, remove exercises, add exercises, shorten/extend, switch focus, end session early.

**Explicit user confirmation required** for coach-proposed modifications.

**Exercise substitutions:** go through the coach; user can accept, reject, or request alternatives. If user's choice conflicts with medical context, coach flags concern once, then yields.

**Quick action buttons** (non-LLM):
- Skip remaining
- Add rest time
- End session early
- Open chat with coach for everything else

**Pattern detection:** repeated modifications trigger coach offering routine-level updates ("want me to swap this in the routine itself?").

**Post-session check-in:**
- Coach sends brief context-aware message after each workout by default
- Captures "how'd that feel?" signal
- User can disable permanently

---

### 4.6 Progression Logic (Strength Only)

*(PT and mobility progression deferred to later phases.)*

**Dimensions in order:**
1. Complete prescribed work (all sets, good form, RPE within target)
2. Add reps within prescribed range
3. Add weight when top of range is hit (small increments)
4. Add sets (usually for hypertrophy focus)
5. Adjust exercise difficulty (harder variations)

**Triggers for progression:**
- Consistent completion across sessions
- Time-based defaults
- User request
- Positive post-session feedback
- Plateau signals combined with readiness indicators

**Non-triggers:** single good session, user feeling motivated without data support.

**Calibration per user:**
- Training experience + conditions + goals + history + recent data
- User sets preference at routine setup (aggressive / moderate / conservative)
- Actual results override preference when they conflict

**RPE logging:** optional field; coach uses when available.

**Plateaus:** acknowledged and diagnosed, not automatically "fixed." User decides if change is wanted.

**Regressions:** understood before acted on. One-offs ignored; patterns discussed.

**Deloads:** proposed when performance drops or ~6-12 weeks of consistent progressive training. User can decline.

**Proposal pattern:** coach surfaces suggestions conversationally; user accepts, adjusts, or declines; decisions are remembered.

---

### 4.7 Guardrails and Safety

**Hard rules (coach never violates):**
- Never diagnose medical conditions
- Never contradict explicit medical advice
- Never claim to replace medical care
- Never recommend ignoring concerning symptoms
- Never prescribe medications, supplements, or medical treatments
- Never dismiss reported pain
- Never give weight-cut or disordered-eating advice
- Never assume user's body or identity

**Soft rules (flag once, yield to user):**
- Discourage training through acute pain
- Discourage rapid progression for users with conditions
- Discourage removing PT-prescribed exercises from active PT routines
- Discourage skipping warmups entirely
- Discourage training while very unwell

**Red-flag symptoms triggering medical recommendation:**
- Sharp, sudden, severe pain (especially joint or spinal)
- Numbness, tingling, or weakness
- Radiating pain down a limb
- Chest pain or difficulty breathing
- Dizziness, fainting, vision changes
- Sudden loss of range of motion
- Significant swelling
- Severe headache with neck pain
- Fever with pain
- Bowel or bladder changes with back pain

**Red-flag response:** not alarmist, not dismissive; recommend appropriate action; no diagnostic speculation; no training modifications offered as alternatives to medical evaluation for serious symptoms.

**Distress handling:** listen, normalize, recommend professional support for non-training issues. Crisis resources surfaced contextually when distress signals appear (not posted permanently in UI).

**Disclaimers:** contextual, scattered through app at relevant moments. Not on every message.

**Privacy:**
- Medical information is per-user, never shared without explicit consent
- User can delete data at any time
- Future sharing features will be opt-in only
- Medical data never part of future social sharing defaults

**Legal note:** Terms of Service and Privacy Policy must be in place before opening beyond personal use. Consult a lawyer before monetizing.

**Coach behavior spec:** maintained as a separate document (`coach-spec.md`) that becomes the LLM system prompt.

---

### 4.8 Multi-Agent Architecture (Deferred)

**Parked for future phase.** Concept preserved:
- Multiple specialized agents (strength, mobility, PT-style, potentially others)
- Agents ingest current research to stay up-to-date beyond base training data
- User experience question open: single coach facade vs. multiple identities
- Starting point when revisited: research-aware single agent via RAG pipeline, not full multi-agent

---

## 5. Core Features

### 5.1 Workout Logging

**Starting a workout:**
- Tap into scheduled workout from dashboard (pre-populates from routine)
- Start blank workout (add exercises ad hoc)
- Workouts are timestamped; duration tracked automatically

**Logging sets:**
- Reps, weight (lbs storage), optional RPE
- Fast entry with minimal taps
- Previous session's numbers visible for reference
- Add/remove sets mid-exercise
- Mark set as failed or partial

**Mid-workout additions:** full support; coach notified via session context if chat is open.

**Skipping exercises:** marked with optional reason; preserves data integrity.

**Rest timer:** deferred to later phase.

**Ending a workout:**
- User explicitly ends
- Summary shown (duration, exercises, volume)
- Post-session coach check-in if enabled
- Session saved to history

**Auto-save:** incomplete workouts persist; no data loss from crashes.

---

### 5.2 Unstructured Activity Logging

**Required fields:**
- Activity type (user-created or existing)
- Duration
- Intensity (easy / moderate / hard / brutal)
- Date/time

**Optional:** notes (free text), distance where applicable.

**Custom activity types:** user can create on the fly; existing types suggested; normalized where possible (e.g., BJJ vs. Brazilian Jiu-Jitsu).

**Coach integration:** feeds into training load awareness; no mandatory check-in.

---

### 5.3 Routine Management

- View all active routines on dashboard
- Create (coach-generated or manual) via same rich UI
- Edit any field; major changes create new version
- Pause routines (useful for injury, travel, disruption)
- Archive routines (preserves history)
- Delete with confirmation (medical data retention concerns)

---

### 5.4 History

- Chronological list of workouts and activities (reverse chronological default)
- Filterable by routine, activity type, date range
- Expandable session detail cards
- Edit capability (silent updates, no "edited" indicator)
- "Repeat this workout" action — creates new session pre-populated with same structure

---

### 5.5 Units

- Storage: always lbs
- Display: user preference (lbs or kg)
- Entry in preferred unit; converted on save
- All historical data re-displays correctly when preference changes

---

### 5.6 Search and Filters

- Search across exercises
- Filter history by routine, activity type, date range, exercise
- "My exercises" view with last-performed date and max weight

---

### 5.7 Offline Behavior

- v1: online-only acceptable
- Later phase: offline logging with sync

---

## 6. Analytics and Insights

### 6.1 Philosophy

Coach is the primary consumer of analytics; user gets focused, minimal insights.

---

### 6.2 v1 User-Facing Analytics

**Per-exercise chart** — the only v1 analytics feature:
- Accessed from exercise list (only exercises performed more than once appear)
- Single exercise displayed at a time
- Two metrics plotted over time:
  - **Actual weight used:** heaviest set of each session
  - **Estimated 1RM (e1RM):** Brzycki formula, best set of session by e1RM
- Brzycki formula: `1RM = weight × 36 / (37 - reps)`
- X-axis: session date; Y-axis: weight in user's preferred unit
- Standard chart library (Recharts)
- Note: e1RM less reliable above ~12 reps; label as estimated, consider limiting to sets ≤12 reps in computation

**Deferred:** consistency heatmap, PRs list, volume summary, advanced charts, cross-exercise comparisons, body measurements.

---

### 6.3 Coach-Facing Analytics (Internal)

- Per-exercise trends on demand
- Plateau, regression, and consistency detection
- Training load across routines + unstructured activity
- Response to progressions
- Pain pattern detection (from chat history)

---

### 6.4 Pain and Symptom Tracking

- No formal pain log in v1
- Pain captured through chat with coach
- Coach maintains trend awareness via conversational context

---

### 6.5 Coach-Surfaced Insights

- Proactive observations about trends, plateaus, patterns
- Enabled by default; user can toggle off in settings
- Examples: "you've hit a PR 3 times this month," "overall volume is down 20%"

---

## 7. Social Features (Deferred)

**Not in v1.** Future vision preserved:

- Friend connections via username, link, QR code, or email invite (mutual)
- Granular sharing controls (activity yes/no, summary, full details)
- Medical context never shared, no toggle for it
- Reactions, light comments
- Shared routines, workout buddies
- Group challenges
- Audit trail of what's shared with whom
- Opt-in by default; easy to revoke

---

## 8. Settings and Preferences

**Profile & Account:**
- Email, display name, password change, sign out, delete account

**Coach Preferences:**
- Coach on/off toggle (with data-handling prompt at toggle time)
- Post-session check-in toggle
- "Coach's view of me" (read-only context view)
- Progression speed preference (coach can override based on data)

**Data & Privacy:**
- View stored data
- Delete routines/workouts individually
- Delete all workout history
- Chat retention preference (default ~60 days)
- Sharing preferences placeholder (for future social)

**Display & Units:**
- Theme: dark (default) / light / system
- Weight unit: lbs / kg
- Time format: 12h / 24h

**About / Help:**
- Version info, Terms of Service, Privacy Policy, contact/feedback

**Deferred:**
- Notifications (basic push later, rich notifications much later)
- Data export (later phase)
- Rest timer defaults

**Behaviors:**
- Changes save immediately
- Destructive actions require confirmation
- Coach-relevant changes update its context

---

## 9. Infrastructure and Non-Functional Requirements

### 9.1 Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS v4
- **Backend:** Supabase (Postgres + Auth + Edge Functions + Realtime + Storage)
- **Database:** Postgres via Supabase
- **Hosting:** Vercel (frontend) + Supabase (backend)
- **LLM:** Anthropic Claude API
- **Package management:** npm

### 9.2 TypeScript

- TypeScript from v2 start
- Supabase schema auto-generates TypeScript types
- Start with loose settings, tighten as codebase stabilizes

### 9.3 Authentication

- Supabase Auth
- v1: email + password only
- Email verification required
- Session management handled by Supabase
- Additional methods (magic link, Google, etc.) in later phases

### 9.4 Data Model (High-Level)

Planned tables (full schema designed separately during implementation):
- `users`, `user_context`, `user_context_summary`, `restricted_movements`
- `routines`, `routine_exercises`
- `workouts`, `workout_exercises`, `workout_sets`
- `activities`, `activity_types`
- `chat_messages`, `chat_sessions`

### 9.5 Row-Level Security

- Every user-data table has `auth.uid() = user_id` policy
- Enforced at database level
- Critical for medical-info-adjacent app
- Tested carefully during development

### 9.6 Data Security

- At rest: Supabase-managed encryption (cloud standard)
- In transit: TLS everywhere
- API keys in environment variables only
- Supabase service role key never exposed to frontend
- Sensitive medical fields: standard storage protected by RLS; column-level encryption possible later if warranted

### 9.7 LLM Integration

- Model selection:
  - Claude Sonnet 4 for default coach interactions
  - Claude Opus for complex reasoning (routine generation, progression decisions)
  - Claude Haiku for quick/cheap exchanges (future optimization)
- API calls made from backend (Supabase Edge Functions), not frontend
- Context assembly: structured fields + conversational summary + relevant chat history + current session state
- Response parsing for structured updates (context changes, routine modifications)

### 9.8 Performance Targets

- Page loads: under 2 seconds
- Workout logging (set entry): under 500ms
- Coach responses: 3-10 seconds acceptable; under 3 seconds ideal for short exchanges
- Chart rendering: smooth on mobile

### 9.9 Deployment and CI/CD

- Vercel auto-deploy on push to main
- Preview deployments per PR
- Supabase migrations versioned in repo
- Dev / staging / production environment separation
- Secrets managed via platform tools

### 9.10 Monitoring

- Sentry (free tier) for frontend errors
- Supabase logs for database and function errors
- Lightweight privacy-respecting analytics (PostHog or Plausible) for usage
- Graceful fallbacks on user-facing errors
- Coach failure: "having trouble reaching coach" retry-friendly message

### 9.11 Cost Controls

- Soft per-user spending warnings
- Owner notified via email/webhook on threshold crossing
- Target: $50/month or so total for friends-and-family scale
- No hard caps in v1; revisit if moving beyond personal use

---

## 10. Non-Goals

Things the app will NOT do:

**Medical/clinical:**
- Diagnose conditions
- Prescribe medications, supplements, or treatments
- Replace PTs, doctors, or specialists
- Interpret medical tests or imaging
- Clinical-grade pain/symptom tracking

**Nutrition/body comp:**
- Meal planning, macro tracking, calorie counting
- Detailed nutrition coaching
- Body measurement tracking (weight, body fat, circumferences)
- Progress photos, aesthetic tracking

**Sport-specific programming:**
- Running-specific programming (pace, race prep)
- Climbing grade tracking, sends, route logging
- Powerlifting meet prep, marathon periodization
- Heart rate, VO2 max, HRV integration
- Wearable device syncing

**Social (deferred with vision):**
- Friend connections, in-app sharing
- Leaderboards, challenges
- Public profiles, discovery
- Group training coordination

**Business:**
- Payments, subscriptions, pricing tiers
- Marketing beyond simple landing page
- Referrals, affiliates
- Trainer-to-client features

**Advanced coaching (deferred):**
- Multi-agent coach architecture
- Research-literature-aware coach
- PT or mobility routine progression logic
- Exercise demonstration library
- Pre-built routine templates

**Offline/mobile-native:**
- Offline workout logging
- Native iOS/Android apps
- Apple Watch or wearable apps
- Push notifications

**Enterprise:**
- Gym/facility partnerships
- Clinical integrations
- HIPAA as a product feature
- EHR integration

---

## 11. Phased Rollout Plan

### Phase 5A — Foundation Migration

**Goal:** v1 features on Supabase with auth, ready for multiple users.

- React + Vite + TypeScript + Tailwind v4 setup
- Supabase project, schema, RLS policies
- Email + password auth
- Migrate v1 features: workout logging, history, unit toggle
- Per-user data isolation end-to-end
- Vercel deployment
- Test with 2-3 real users

**Done when:** you and one other person can independently sign up and use the app, seeing only their own data.

---

### Phase 5B — Routines and Activity Logging

**Goal:** full non-coach data model working.

- Routine data model and management UI (create, edit, pause, archive, version)
- Manual routine creation with full-featured editor
- Structured workout logging tied to routines
- Auto-save during logging
- Unstructured activity logging with user-defined types
- Per-exercise chart (actual weight + Brzycki e1RM)
- Repeat-last-workout action

**Done when:** multi-routine training week works; meaningful per-exercise charts render.

---

### Phase 5C — Coach Foundation

**Goal:** coach exists, does intake, builds and modifies routines.

- Coach chat UI (floating, accessible from everywhere)
- Claude API integration via Supabase Edge Function
- User context model (structured + summary)
- Intake flow as first-run with skip option
- Coach generates strength routines
- Coach modifies routines conversationally
- Restricted movements managed invisibly
- Basic disclaimers and guardrails

**Done when:** a new user can complete intake, get a personalized strength routine, and modify it through conversation.

---

### Phase 5D — Mid-Session Coaching

**Goal:** real-time workout adjustments (Ram's killer feature).

- Coach chat accessible during active workouts
- Session state auto-available to coach
- Coach proposes modifications to remaining exercises
- User confirmation flow for applied changes
- Quick action buttons (skip remaining, end early, add rest)
- Post-session check-in with disable option
- Pattern detection for repeated modifications

**Done when:** user can open coach mid-workout, describe how they're feeling, get useful modifications to the rest of the session.

---

### Phase 5E — Progression and Insights

**Goal:** coach evolves with the user.

- Strength progression logic
- Coach-surfaced insights with opt-out
- Plateau and regression detection
- Deload suggestions
- Progression speed preference setting
- RPE logging as optional field

**Done when:** after a month of use, coach suggests appropriate progressions and feels adaptive.

---

### Phase 5F — Polish and Settings

**Goal:** app feels like a real product.

- Settings UI (all categories)
- Light mode support
- Chat retention settings with summarization
- Context visibility screen
- Error handling and graceful failures
- Sentry integration, analytics
- Cost tracking with soft warnings
- Contextual disclaimers at key moments

**Done when:** invited friend can use app end-to-end without explanation and it feels trustworthy.

---

### Phase 6+ — Later Additions

Backlog, not prioritized against each other:
- PT routine logic (capture prescribed exercises; coach-generated PT-style)
- Mobility routine logic with appropriate progression
- Rest timer
- Offline logging with sync
- Data export
- Consistency heatmap, PRs list, other analytics
- Additional auth methods
- Exercise library with tags
- Routine templates
- Research-aware coach (RAG pipeline)
- Multi-agent architecture
- Social features (full vision rollout)
- Migration to Raime LLC GitHub account
- Mobile app (if warranted)

### Between-Phase Discipline

- Use the app yourself; invite one or two friends
- Collect pain points
- Revise priorities for the next phase based on real usage
- Resist the urge to skip this step

---

## Appendix: Document Conventions

- This document is the source of truth for product requirements
- The `coach-spec.md` document (to be created) will hold the LLM system prompt version of coach behavior
- Schema design details go in a separate `data-model.md` during implementation
- Update this document as decisions change; add dated notes for significant revisions
