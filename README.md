# Good Friend

A **free, distributed wellness companion** promoting **positive mental health**, **tolerance**, and a **peaceful global society**.

Good Friend works entirely in your browser — no server needed, no accounts, no costs. Your data stays private on your device. Share the link, save the page, or host it yourself.

**Live:** [https://kevinrabun.github.io/good-friend/](https://kevinrabun.github.io/good-friend/)

## Features

### Daily Wellness Dashboard
A personalized daily view with today's affirmation, reflection prompt, kindness challenge, and your engagement streak.

### Affirmations
28+ positive affirmations across 7 themes: self-worth, resilience, compassion, tolerance, peace, gratitude, and connection.

### Mindfulness Exercises
7 guided exercises: breathing (4-7-8, Box), grounding (5-4-3-2-1), visualization, body scan, loving-kindness meditation, and gratitude reflection.

### Tolerance & Understanding
12+ perspective-taking prompts covering cultural awareness, empathy building, conflict resolution, inclusive language, and active listening.

### Acts of Kindness
15+ kindness suggestions at every scale — self, family, community, and global — with varying effort levels.

### Wellness Check-In
A mood-based self-assessment (1-5 scale with feelings) that provides tailored supportive responses and connects to crisis resources when needed.

### Guided Journeys
6 reflective guided journeys: self-compassion, empathy exploration, gratitude deepening, conflict healing, global connection, finding inner peace.

### Conflict De-escalation
5 strategies for navigating tense moments: the PAUSE Method, Bridge Building, Empathy Reset, Cooling Down, and Cross-Cultural Misunderstanding. Each includes helpful phrases and what to avoid.

### Community Stories
Anonymous stories of kindness, growth, and reconciliation. Share your own and encourage others.

### Peace Pledges
Make personal commitments to kindness, tolerance, listening, service, peace, and inclusion.

### Reflective Journal
Private journaling with guided prompts across 6 types: gratitude, reflection, kindness-log, growth, peace-intention, and free-write.

### My History
Track your wellness journey: engagement streaks, mood trends (SVG chart), check-in history, most common feelings, and lifetime statistics.

### Mental Health Resources
Curated crisis support services across US, UK, Australia, Canada, and international organizations.

## Use It — Three Ways

### 1. Visit the Live Site (Recommended)
Go to **[https://kevinrabun.github.io/good-friend/](https://kevinrabun.github.io/good-friend/)**. That's it. Free forever.

### 2. Download & Use Offline
Save `docs/index.html` to your computer. Open it in any browser. Works offline, no internet needed.

### 3. Run the API Server (Developers)
```bash
npm install
npm run build
npm start
```
The server starts on port 3000 (configurable via `PORT` environment variable).

## Architecture

Good Friend is **distributed by design** — no server costs, no accounts, no tracking.

- **Static Site** (`docs/index.html`): A single self-contained HTML file with all content, logic, and styling embedded. Uses `localStorage` for user data (journal, pledges, check-in history, stories). Hosted free on GitHub Pages.
- **API Server** (`src/`): A Node.js/TypeScript/Express server that wraps the same content as a REST API. Available as an npm package for developers who want to build on top of it.
- **CI/CD**: GitHub Actions runs tests on Node 18/20/22, builds artifacts, deploys the static site to GitHub Pages, publishes a Docker image to GHCR, and publishes to npm GitHub Packages.

### Privacy
All user data stays in the browser's `localStorage`. Nothing is sent to any server. No analytics, no cookies, no tracking.

## Development

```bash
npm run dev      # Run API server with ts-node
npm test         # Run tests (199 tests across 12 files)
npm run test:coverage  # Run tests with coverage
```

## Deployment

- **GitHub Pages**: The static site in `docs/` is automatically deployed to GitHub Pages on push to main. Free forever.
- **Docker**: `docker build -t good-friend . && docker run -p 3000:3000 good-friend`
- **npm**: Available as a package via GitHub Packages.

## Mission

Good Friend exists to make wellness, empathy, and peace accessible to **everyone** — free, offline, and private. Every interaction is an opportunity to support someone's mental health, broaden their perspective, or inspire an act of kindness.

> *"Peace in the world begins with peace within myself."*

## License

MIT
