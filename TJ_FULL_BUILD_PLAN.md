# TJ Jude Agent Onboarding — FULL PRD BUILD PLAN
## Complete Build with Sub-Agent Delegation | April 24–26, 2026

> **Status:** Full PRD scope — no cuts. Premium features included. Sub-agent swarm execution.
> **Trigger:** Sam directed: "You guys are computers. You can build all of it."

---

## Philosophy Shift

**Old approach:** Cut everything risky, ship a skeleton, polish later.
**New approach:** Build the full PRD experience. Use sub-agent swarms for parallel tracks. Every feature in the PRD ships.

---

## Sub-Agent Architecture

```
Sam's Angels (Main Group)
├── Kimi (Coordinator/COO) — routes, reviews, stitches
├── sam (CEO/Strategist) — copy, ops, sub-agent orchestration
│   └── Sub-Agent Swarm: Copywriters, Airtable schema designers, Telegram bot scripters
└── Kimi Claw Desktop (Senior Engineering Lead) — code, architecture, sub-agent delegation
    └── Sub-Agent Swarm: Frontend builders, animation specialists, backend engineers
```

---

## Parallel Build Tracks (4 Swarms)

### Track A: Frontend Experience Swarm
**Lead:** Kimi Claw Desktop  
**Sub-Agents:** 3-4 specialized frontend builders  
**Scope:** Every visual and interaction in PRD Sections 3–5

| Component | PRD Reference | Sub-Agent | Est. Hours |
|-----------|---------------|-----------|------------|
| **Ambient Background** | 3.1, 4.3 — Aurora gradient shifts, particles | Animation Specialist | 3 |
| **Floating Card** | 3.1, 4.3 — Sine-wave float, mouse parallax (5° tilt), ambient glow | Animation Specialist | 4 |
| **Card Flip Transition** | 3.2 — 180° rotateY, 600ms, cubic-bezier(0.23, 1, 0.32, 1) | Animation Specialist | 2 |
| **Landing Screen** | 3.1 — Profile photo, analytics preview, CTA pulse | Frontend Builder A | 2 |
| **Welcome Screen** | 3.2 — Typing text, progress bar, voice/type CTAs | Frontend Builder A | 2 |
| **Conversation Shell** | 3.3 — Chat-style, full-bleed, message staging | Frontend Builder B | 3 |
| **Open Text Input** | 5.1 Q1 — Auto-focus, enter-submit | Frontend Builder B | 1 |
| **Multi-Choice Cards** | 5.1 Q3/Q6/Q7/Q8/Q9 — Grid, icons, selection | Frontend Builder B | 3 |
| **Multi-Choice + Other** | 5.1 Q2 — Conditional text input | Frontend Builder B | 2 |
| **Toggle List** | 5.1 Q4 — Checklist with icons, toggle animation | Frontend Builder C | 2 |
| **Feature Cards** | 5.1 Q5 — Icon + title + description, multi-select | Frontend Builder C | 2 |
| **Progress Dots** | 3.3 — Bottom indicator, step count, completion % | Frontend Builder C | 1 |
| **Completion Screen** | 3.4 — Lottie checkmark, summary cards, ETA | Animation Specialist | 3 |
| **Swipe Navigation** | 3.3 — Left/right swipe, back/forward, keyboard arrows | Frontend Builder B | 2 |
| **Sound Integration** | 3.1, 3.4 — Load chime, success ding, message pop | Audio Engineer | 2 |
| **Mobile Responsive** | All — Touch targets, font scaling, safe areas | Frontend Builder A | 2 |
| **Voice UI Slot** | 3.3 — Waveform visualization, "voice coming soon" | Frontend Builder C | 1 |

**Track A Total: 37 hours** — parallelized across 4 sub-agents = ~10 hours wall-clock

---

### Track B: Backend & Data Swarm
**Lead:** Kimi Claw Desktop  
**Sub-Agents:** 2 backend engineers  
**Scope:** PRD Section 6 — API, storage, integrations

| Component | PRD Reference | Sub-Agent | Est. Hours |
|-----------|---------------|-----------|------------|
| **Next.js API Routes** | 6.2 — Export endpoint, session management | Backend Engineer A | 2 |
| **Session Persistence** | 6.2 — PostgreSQL or Supabase for session data | Backend Engineer A | 2 |
| **Data Schema** | 6.2 — 9-question structured JSON + agent config | Backend Engineer A | 2 |
| **Airtable Integration** | 6.3 — Auto-create base with tables, push schema | Backend Engineer B | 4 |
| **OpenClaw Config Gen** | 6.3 — JSON schema → agent config file | Backend Engineer B | 3 |
| **Telegram Notification** | 6.3 — @SamOperating_Bot webhook on completion | Backend Engineer A | 2 |
| **Admin Dashboard** | PRD Open Question #4 — Real-time view for Shapiro | Backend Engineer B | 4 |
| **Claw Messenger** | 6.3 — Register TJ's phone, send welcome text | Backend Engineer A | 2 |
| **Cron Job Setup** | 6.3 — Workflow automation for TJ | Backend Engineer B | 2 |

**Track B Total: 23 hours** — parallelized across 2 sub-agents = ~12 hours wall-clock

---

### Track C: Asset Production Swarm
**Lead:** sam  
**Sub-Agents:** Designers, copywriters, audio engineers  
**Scope:** PRD Section 7 — Assets, copy, sound

| Component | PRD Reference | Sub-Agent | Est. Hours |
|-----------|---------------|-----------|------------|
| **TJ Profile Photo** | 7.1 — Optimize, crop, web-ready | Designer | 0.5 |
| **Lottie Loading Animation** | 7.2 — Abstract morphing shapes | Motion Designer | 3 |
| **Lottie Success Checkmark** | 7.2 — Draws itself over 800ms | Motion Designer | 2 |
| **Card Flip CSS** | 7.2 — 3D transition, CSS-based | Animation Specialist | 1 |
| **Progress Bar Animation** | 7.2 — Smooth fill | Animation Specialist | 1 |
| **Background Ambient** | 7.2 — Gradient shifts, particles | Motion Designer | 2 |
| **Load Chime** | 7.3 — Soft, inviting | Audio Engineer | 1 |
| **Success Sound** | 7.3 — Apple Pay-style ding | Audio Engineer | 1 |
| **Message Pop Sound** | 7.3 — Subtle notification | Audio Engineer | 1 |
| **Voice Recording Cues** | 7.3 — Gentle start/stop sounds | Audio Engineer | 1 |
| **All Question Copy** | 7.4 — Conversational, warm | Copywriter | 3 |
| **Error State Copy** | 7.4 — Friendly, never technical | Copywriter | 1 |
| **Loading State Copy** | 7.4 — Entertaining, not boring | Copywriter | 1 |
| **Completion Screen Copy** | 7.4 — Celebratory | Copywriter | 1 |

**Track C Total: 20.5 hours** — parallelized across 4 sub-agents = ~6 hours wall-clock

---

### Track D: QA & Integration Swarm
**Lead:** sam + Kimi Claw Desktop  
**Sub-Agents:** Testers  
**Scope:** End-to-end validation, cross-browser, device testing

| Component | PRD Reference | Sub-Agent | Est. Hours |
|-----------|---------------|-----------|------------|
| **Chrome Desktop Testing** | 8 — Full flow, animations, export | Tester A | 2 |
| **Safari Desktop Testing** | 8 — Full flow, 3D flip validation | Tester A | 2 |
| **iPhone Safari Testing** | 8 — Touch, swipe, keyboard, glassmorphism | Tester B | 3 |
| **Chrome Android Testing** | 8 — Touch, performance, animations | Tester B | 3 |
| **End-to-End Flow** | 8 — Land → flip → 9 questions → completion → export | Tester C | 2 |
| **Performance Audit** | 8 — Lighthouse, animation FPS, bundle size | Tester C | 2 |
| **Accessibility Audit** | 8 — Screen readers, focus states, color contrast | Tester C | 1 |

**Track D Total: 15 hours** — parallelized across 3 sub-agents = ~5 hours wall-clock

---

## Master Timeline (Parallelized)

```
Friday Evening (4 hours)
├── Track A: Scaffold + Ambient Background + Floating Card shell
├── Track B: API scaffold + database setup
├── Track C: TJ photo optimized + copywriter starts questions
└── All sub-agents briefed, repos created

Saturday Day (12 hours)
├── Track A: Flip animation + Welcome screen + Question components (all 5 types)
├── Track B: Session persistence + Airtable integration + Telegram webhook
├── Track C: Lottie animations + sound design + all copy complete
└── Track D: Test plan written, devices ready

Sunday Day (12 hours)
├── Track A: Completion screen + swipe nav + sound integration + polish
├── Track B: Admin dashboard + OpenClaw config + Claw Messenger + cron jobs
├── Track C: Asset finalization + copy review + sound mixing
└── Track D: Full device testing + performance audit + bug fixes

Monday Morning (4 hours buffer)
└── Final deploy + Shapiro handoff + documentation
```

**Wall-Clock Total: ~32 hours over 3.5 days** (vs. 95.5 hours if done sequentially)

---

## Stack (Full PRD Spec)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14 (App Router) | PRD spec. API routes, SSR for SEO, Vercel deploy |
| **Styling** | Tailwind CSS | PRD spec. Rapid iteration, glassmorphism utilities |
| **Animations** | Framer Motion + GSAP | PRD spec. Framer for layout, GSAP for complex sequences |
| **3D Effects** | CSS transforms + perspective | PRD: "no Three.js needed" — but parallax + aurora ARE in |
| **Lottie** | lottie-react | PRD spec. Loading + success animations |
| **Sound** | Web Audio API + Howler.js | PRD spec. Chimes, dings, recording cues |
| **Voice** | Web Audio API + React | PRD Phase 2, but UI slot-ready with waveform |
| **State** | Zustand | 9-step wizard + auto-save + resume. Context insufficient |
| **Storage** | Supabase (PostgreSQL) | PRD mentions PostgreSQL. Real persistence, not localStorage |
| **Icons** | Lucide React | PRD spec |
| **UI Components** | shadcn/ui | Pre-built accessible components |
| **Export** | Next.js API + Supabase | Structured JSON, Airtable auto-gen, admin dashboard |
| **Deploy** | Vercel | PRD spec. Zero-config, preview URLs |

---

## IN (Full PRD — Nothing Cut)

- ✅ Landing page: floating card with parallax + ambient glow + aurora gradient
- ✅ 3D card flip: 600ms, exact PRD easing
- ✅ Welcome screen: typing text, progress bar, voice/type CTAs
- ✅ 9-question flow: all 5 UI types (open text, multi-choice + Other, multi-choice cards, toggle list, feature cards)
- ✅ Voice UI slot: waveform visualization, "voice coming soon" (ready for Phase 2)
- ✅ Progress dots + swipe navigation + keyboard arrows
- ✅ Completion screen: Lottie checkmark, summary cards, "Ready in 24 hours"
- ✅ Sound design: load chime, success ding, message pop, voice cues
- ✅ Mobile responsive: iPhone Safari, Chrome Android
- ✅ Session persistence: Supabase (not localStorage)
- ✅ JSON export: structured data for Shapiro
- ✅ Airtable auto-generation: create base with all tables
- ✅ Agent config file generation: JSON → OpenClaw config
- ✅ Claw Messenger: register TJ's phone, send welcome text
- ✅ Admin dashboard: real-time view for Shapiro during onboarding
- ✅ Telegram notification: @SamOperating_Bot on completion
- ✅ Cron jobs: workflow automation

---

## Data Flow Architecture

```
TJ opens URL
    ↓
Landing Page (parallax card, aurora bg, sound chime)
    ↓
Flip Animation (3D, 600ms, success sound)
    ↓
Welcome Screen (typing text, voice option)
    ↓
9 Questions (auto-saved to Supabase after each answer)
    ↓
Completion Screen (Lottie checkmark, success ding)
    ↓
POST /api/completion
    ↓
├→ Store session JSON in Supabase
├→ Auto-generate Airtable base (tables: Guest List, Brand Pipeline, Events, Dance Classes, Revenue)
├→ Generate OpenClaw agent config file
├→ Send Telegram notification to Shapiro (@SamOperating_Bot) with summary + admin link
└→ Schedule welcome text via Claw Messenger (24h)

Shapiro opens /admin/:sessionId
    ↓
Real-time dashboard: full transcript, structured JSON, Airtable link, agent config
```

---

## Definition of Done (Full PRD)

- [ ] TJ visits public URL on his phone
- [ ] Sees floating card with his photo, parallax tilt on mouse move, aurora gradient background
- [ ] Hears soft chime on load (mutable)
- [ ] Taps "Get Started" — card flips 180° with exact PRD easing + transition sound
- [ ] Welcome screen types out word by word, progress bar fills smoothly
- [ ] Answers all 9 questions with correct UI type (text, cards, toggles, features)
- [ ] Swipe left/right to navigate between questions
- [ ] Voice UI slot shows waveform visualization (even if deferred)
- [ ] Progress dots show exact position
- [ ] Completion screen: Lottie checkmark draws over 800ms, success chime plays
- [ ] "All Set" — "Shapiro is building your agent now. Ready in 24 hours."
- [ ] Shapiro receives Telegram notification with summary + link to admin dashboard
- [ ] Admin dashboard shows full transcript, structured JSON, Airtable base link, agent config
- [ ] Airtable base auto-generated with tables: Guest List, Brand Pipeline, Events, Dance Classes, Revenue
- [ ] TJ receives welcome text via Claw Messenger within 24 hours
- [ ] Works on iPhone Safari, Chrome Android, Chrome Desktop, Safari Desktop
- [ ] No console errors, no broken animations, sounds work when unmuted

---

## Sub-Agent Spawn Points

### Kimi Claw Desktop Spawns:
1. **Frontend Builder Alpha** — Landing + Card + Flip + Welcome
2. **Frontend Builder Beta** — Question components (all 5 types) + Conversation shell
3. **Animation Specialist** — Framer Motion + GSAP + Lottie + ambient effects
4. **Backend Engineer** — API routes + Supabase + Airtable + OpenClaw config

### sam Spawns:
1. **Copywriter** — All 9 questions + error states + loading + completion
2. **Airtable Designer** — Schema design + base template
3. **Telegram Scripter** — Bot messages + webhook + notification flow
4. **QA Tester** — Test plan + device matrix + bug tracking

---

## Risk Flags & Mitigations (Full Build)

| Risk | Severity | Mitigation |
|------|----------|------------|
| **95 hours of work in 32 wall-clock hours** | **HIGH** | Sub-agent swarm is the mitigation. If a sub-agent stalls, Coordinator reassigns. |
| **Lottie files not ready by Sunday** | Medium | Fallback: CSS/SVG animations. Build both paths in parallel. |
| **Sound assets not ready** | Medium | Fallback: Web Audio API generates simple tones. Not as premium, but functional. |
| **Safari 3D flip + glassmorphism + animations = perf nightmare** | **HIGH** | Tiered experience: detect device capability, reduce effects on low-end. |
| **Supabase setup + Airtable API + Telegram + Claw = integration hell** | **HIGH** | Backend sub-agent focuses purely on integrations. Test each independently before wiring. |
| **Sub-agent coordination overhead** | Medium | Clear interfaces defined upfront. Each sub-agent owns discrete components. |
| **Copy not ready when components are built** | Medium | Copywriter starts immediately Friday. Wire lorem ipsum only for structural tests. |

---

*Full PRD Build Plan — No Cuts, Sub-Agent Swarm Execution*
