# Contributing to Good Friend

Thank you for wanting to help make wellness, empathy, and peace more accessible worldwide! Here's how you can contribute.

## Quick Start

```bash
git clone https://github.com/KevinRabun/good-friend.git
cd good-friend
npm install
npm test        # Run 199 tests
npm run dev     # Start dev server on port 3000
```

Open `docs/index.html` directly in a browser for the static site — no server needed.

## Ways to Contribute

### Translate to Your Language
The single highest-impact contribution. Good Friend is currently English-only — translations unlock billions of potential users.

1. Copy `docs/lang/TEMPLATE.json` to `docs/lang/{code}.json` (e.g., `fr.json` for French)
2. Fill in every translation value
3. Set `direction` to `"rtl"` for Arabic, Hebrew, Farsi, or Urdu
4. Add your language to the `<select>` in the footer of `docs/index.html`
5. Submit a pull request

See `docs/lang/es.json` (Spanish) for a complete example.

### Add Content
- **Affirmations**: Add to the `AFFIRMATIONS` array in `docs/index.html`
- **World Cultures**: Add to `WORLD_CULTURES` — we want every culture represented
- **Empathy Scenarios**: Add to `EMPATHY_SCENARIOS` — diverse perspectives matter
- **Wisdom Quotes**: Add to `WISDOM` — from peace leaders and thinkers worldwide
- **Crisis Resources**: Add to `RESOURCES` — your country's crisis hotlines

### Improve Accessibility
- Test with screen readers (NVDA, VoiceOver, TalkBack)
- Report any keyboard navigation issues
- Improve ARIA labels and announcements
- Test with high contrast and zoom settings

### Fix Bugs or Improve UX
- File an issue describing the problem
- Submit a PR with the fix — include what you changed and why

## Architecture

Everything is in **one file**: `docs/index.html`. This is intentional — it keeps the app fully self-contained, downloadable, and hostable with zero dependencies.

- All CSS is in the `<style>` block
- All JavaScript is in the `<script>` block
- All content (affirmations, exercises, cultures, etc.) is in JS arrays
- User data lives in `localStorage` with a `gf_` prefix

## Guidelines

- **Keep it simple**: One HTML file. No build step for the frontend. No frameworks.
- **Keep it free**: No features that require a server or paid service.
- **Keep it private**: No analytics, tracking, or external requests (except optional notification permission).
- **Keep it inclusive**: Content should be welcoming to all cultures, religions, and backgrounds.
- **Keep it kind**: This is a wellness app. Every word should feel supportive.

## Testing

```bash
npm test              # Run all 199 tests
npm run test:coverage # Run with coverage report
npm run build         # TypeScript type-check
```

Tests are in `src/tests/` and cover the API layer. The static site (`docs/index.html`) is tested manually.

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `npm test` and ensure all tests pass
4. Submit a PR with a clear description

## Code of Conduct

Be kind. Be welcoming. Be patient. This project exists to promote mental health, tolerance, and peace — our community should reflect those values.

## License

MIT — do whatever you want with this code. Spread wellness.
