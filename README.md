# Good Friend

A **free, distributed wellness companion** promoting **positive mental health**, **tolerance**, and a **peaceful global society**.

Good Friend works entirely in your browser — no server needed, no accounts, no costs. Your data stays private on your device. Share the link, save the page, or host it yourself.

**Live:** [https://kevinrabun.github.io/good-friend/](https://kevinrabun.github.io/good-friend/)

## Features

### Daily Wellness Dashboard
A personalized daily view with affirmation, wisdom quote, reflection prompt, kindness challenge, world culture spotlight, daily challenge, achievement badges, quick mood check, streak milestones, and weekly reflection (Sundays).

### Wellness & Mindfulness
- **Affirmations**: 50 affirmations across 9 themes (self-worth, resilience, compassion, tolerance, peace, gratitude, connection, healing, hope)
- **Mindfulness**: 7 exercises with interactive breathing timers (4-7-8 and Box Breathing SVG animations)
- **Loving-Kindness Meditation**: Guided 3.5-minute timer through 5 phases (self, loved one, neutral person, difficult person, all beings)
- **Reflective Journal**: Private journaling with 16 guided prompts across 6 types
- **Gratitude Wall**: Masonry display with 8 prompts for daily gratitude practice
- **Gratitude Letters**: Write and save letters to specific people (research-backed happiness intervention)
- **Values Discovery**: Identify your top 5 values from 24 options and reflect on alignment
- **Guided Journeys**: 6 multi-step reflective journeys

### Peace & Empathy
- **Understanding**: 12 perspective-taking prompts for tolerance building
- **Acts of Kindness**: 15 suggestions across self, family, community, and global scales
- **Kind Words Generator**: 15 templates across 5 categories (encouragement, appreciation, support, connection, celebration)
- **Empathy Scenarios**: 8 interactive "walk in their shoes" exercises with reflection prompts
- **World Cultures**: 15 cultural traditions from around the globe with daily rotation
- **Community Stories**: Share and encourage anonymous stories of kindness and growth
- **Peace Pledges**: 12 templates for personal commitments to peace

### Skills & Growth
- **De-escalation Guide**: 5 strategies with helpful phrases and what to avoid
- **Conflict Resolution**: 6 evidence-based tools (active listening, "I" statements, finding common ground, cool-down protocol, perspective swap, repair conversation)
- **Forgiveness Practice**: 6-phase guided timer (~5 min) plus self-forgiveness exercise and journal
- **Peace Actions Log**: Track and categorize your concrete acts of peace, kindness, tolerance, service
- **Wisdom Quotes**: 21 quotes from global peace leaders (MLK, Gandhi, Dalai Lama, Mandela, and more)

### Engagement & Tracking
- **Mood Check-In**: 5-level scale with feelings, tailored responses, and mood-based section recommendations
- **Streak Tracking**: Daily engagement streaks with 7 milestone celebrations (7, 14, 30, 60, 90, 180, 365 days)
- **Achievement Badges**: 9 badges earned through engagement milestones
- **Daily Challenges**: 12 rotating challenges linking to different sections
- **Weekly Reflection**: 8 deep reflection prompts (shown Sundays)
- **Personal Insights**: Automated mood trend analysis, feeling pattern detection, best-day analysis, progress dashboard
- **My History**: Mood chart (SVG), reflection calendar, engagement statistics
- **Data Export/Import**: Full JSON portability — take your data anywhere
- **Daily Reminders**: Browser notification reminders
- **Dark Mode**: With OS preference detection and manual toggle

### Support
- **Crisis Resources**: 24/7 crisis support across US, UK, Australia, Canada, and internationally
- **Welcome Onboarding**: Guided introduction for first-time users

### Technical
- **PWA**: Installable with offline support (service worker + manifest)
- **Accessibility**: Skip-to-content link, ARIA live regions, focus-visible styling
- **Share**: Web Share API with clipboard fallback for sharing content

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
