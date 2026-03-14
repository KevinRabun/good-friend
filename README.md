# Good Friend

A wellness companion API promoting **positive mental health**, **tolerance**, and a **peaceful global society**.

Good Friend provides curated content and interactive tools to help individuals build emotional resilience, practice empathy, celebrate diversity, and contribute to a more compassionate world.

## Features

### Affirmations
Daily positive affirmations across themes: self-worth, resilience, compassion, tolerance, peace, gratitude, and connection.

### Mindfulness Exercises
Guided breathing, grounding, meditation, body scan, loving-kindness, and gratitude practices with step-by-step instructions.

### Tolerance & Understanding
Perspective-taking prompts covering cultural awareness, empathy building, conflict resolution, inclusive language, and active listening.

### Acts of Kindness
Suggested kindness activities at every scale — self, family, community, and global — with varying effort levels.

### Wellness Check-In
A mood-based self-assessment that provides tailored supportive responses and, when needed, connects to crisis resources.

### Mental Health Resources
A curated directory of crisis support services across multiple countries and contact methods.

### Daily Digest
A combined daily endpoint delivering an affirmation, perspective prompt, and kindness suggestion in one request.

## Quick Start

```bash
npm install
npm run build
npm start
```

The server starts on port 3000 (configurable via `PORT` environment variable).

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/daily` | Daily digest (affirmation + prompt + kindness act) |
| GET | `/api/affirmations` | All affirmations |
| GET | `/api/affirmations/daily` | Today's affirmation |
| GET | `/api/affirmations/random` | Random affirmation (optional `?theme=`) |
| GET | `/api/affirmations/themes` | Available themes |
| GET | `/api/affirmations/theme/:theme` | Affirmations by theme |
| GET | `/api/mindfulness` | All exercises |
| GET | `/api/mindfulness/random` | Random exercise (optional `?category=`) |
| GET | `/api/mindfulness/categories` | Available categories |
| GET | `/api/mindfulness/category/:cat` | Exercises by category |
| GET | `/api/mindfulness/exercise/:id` | Specific exercise |
| GET | `/api/mindfulness/short` | Short exercises (optional `?maxMinutes=`) |
| GET | `/api/tolerance` | All perspective prompts |
| GET | `/api/tolerance/daily` | Today's prompt |
| GET | `/api/tolerance/random` | Random prompt (optional `?category=`) |
| GET | `/api/tolerance/categories` | Available categories |
| GET | `/api/tolerance/category/:cat` | Prompts by category |
| GET | `/api/kindness` | All kindness acts |
| GET | `/api/kindness/daily` | Today's kindness act |
| GET | `/api/kindness/random` | Random act (optional `?scope=`) |
| GET | `/api/kindness/scopes` | Available scopes |
| GET | `/api/kindness/scope/:scope` | Acts by scope |
| GET | `/api/kindness/effort/:level` | Acts by effort level |
| POST | `/api/wellness/checkin` | Submit wellness check-in (`{mood: 1-5, feelings: []}`) |
| GET | `/api/wellness/feelings` | Available feeling words |
| GET | `/api/wellness/moods` | Mood level descriptors |
| GET | `/api/resources` | All mental health resources |
| GET | `/api/resources/crisis` | 24/7 crisis resources |
| GET | `/api/resources/regions` | Available regions |
| GET | `/api/resources/region/:region` | Resources by region |

## Development

```bash
npm run dev      # Run with ts-node
npm test         # Run tests
npm run test:coverage  # Run tests with coverage
```

## Deployment

- **GitHub Actions CI/CD**: Tests run on Node 18, 20, and 22. On push to main, artifacts are built and a Docker image is published to GitHub Container Registry.
- **Docker**: `docker build -t good-friend . && docker run -p 3000:3000 good-friend`
- **npm**: Publishable as a package for use in other applications.

## Mission

Good Friend exists to make wellness, empathy, and peace accessible to everyone. Every API call is an opportunity to support someone's mental health, broaden their perspective, or inspire an act of kindness.

> *"Peace in the world begins with peace within myself."*

## License

MIT
