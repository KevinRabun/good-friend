import express, { Request, Response } from 'express';
import * as affirmations from './modules/affirmations';
import * as mindfulness from './modules/mindfulness';
import * as tolerance from './modules/tolerance';
import * as kindness from './modules/kindness';
import * as wellness from './modules/wellness';
import * as resources from './modules/resources';
import * as companion from './modules/companion';
import * as journal from './modules/journal';
import * as pledges from './modules/pledges';

export function createApp() {
  const app = express();
  app.use(express.json());

  // --- Health Check ---
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Good Friend is here for you.' });
  });

  // --- Affirmations ---
  app.get('/api/affirmations', (_req: Request, res: Response) => {
    res.json(affirmations.getAllAffirmations());
  });

  app.get('/api/affirmations/daily', (_req: Request, res: Response) => {
    res.json(affirmations.getDailyAffirmation());
  });

  app.get('/api/affirmations/random', (req: Request, res: Response) => {
    const theme = req.query.theme as string | undefined;
    try {
      const result = affirmations.getRandomAffirmation(
        theme as affirmations.AffirmationTheme | undefined
      );
      res.json(result);
    } catch {
      res.status(400).json({ error: `Invalid or empty theme: ${theme}` });
    }
  });

  app.get('/api/affirmations/themes', (_req: Request, res: Response) => {
    res.json(affirmations.getThemes());
  });

  app.get('/api/affirmations/theme/:theme', (req: Request, res: Response) => {
    const results = affirmations.getAffirmationsByTheme(
      req.params.theme as affirmations.AffirmationTheme
    );
    res.json(results);
  });

  // --- Mindfulness ---
  app.get('/api/mindfulness', (_req: Request, res: Response) => {
    res.json(mindfulness.getAllExercises());
  });

  app.get('/api/mindfulness/random', (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    try {
      const result = mindfulness.getRandomExercise(
        category as mindfulness.ExerciseCategory | undefined
      );
      res.json(result);
    } catch {
      res.status(400).json({ error: `Invalid or empty category: ${category}` });
    }
  });

  app.get('/api/mindfulness/categories', (_req: Request, res: Response) => {
    res.json(mindfulness.getCategories());
  });

  app.get('/api/mindfulness/category/:category', (req: Request, res: Response) => {
    const results = mindfulness.getExercisesByCategory(
      req.params.category as mindfulness.ExerciseCategory
    );
    res.json(results);
  });

  app.get('/api/mindfulness/exercise/:id', (req: Request, res: Response) => {
    const exercise = mindfulness.getExerciseById(req.params.id as string);
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.json(exercise);
  });

  app.get('/api/mindfulness/short', (req: Request, res: Response) => {
    const maxMinutes = parseInt(req.query.maxMinutes as string) || 5;
    res.json(mindfulness.getExercisesByMaxDuration(maxMinutes));
  });

  // --- Tolerance & Understanding ---
  app.get('/api/tolerance', (_req: Request, res: Response) => {
    res.json(tolerance.getAllPrompts());
  });

  app.get('/api/tolerance/daily', (_req: Request, res: Response) => {
    res.json(tolerance.getDailyPrompt());
  });

  app.get('/api/tolerance/random', (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    try {
      const result = tolerance.getRandomPrompt(
        category as tolerance.PerspectiveCategory | undefined
      );
      res.json(result);
    } catch {
      res.status(400).json({ error: `Invalid or empty category: ${category}` });
    }
  });

  app.get('/api/tolerance/categories', (_req: Request, res: Response) => {
    res.json(tolerance.getCategories());
  });

  app.get('/api/tolerance/category/:category', (req: Request, res: Response) => {
    const results = tolerance.getPromptsByCategory(
      req.params.category as tolerance.PerspectiveCategory
    );
    res.json(results);
  });

  // --- Kindness ---
  app.get('/api/kindness', (_req: Request, res: Response) => {
    res.json(kindness.getAllKindnessActs());
  });

  app.get('/api/kindness/daily', (_req: Request, res: Response) => {
    res.json(kindness.getDailyKindnessAct());
  });

  app.get('/api/kindness/random', (req: Request, res: Response) => {
    const scope = req.query.scope as string | undefined;
    try {
      const result = kindness.getRandomKindnessAct(
        scope as kindness.KindnessScope | undefined
      );
      res.json(result);
    } catch {
      res.status(400).json({ error: `Invalid or empty scope: ${scope}` });
    }
  });

  app.get('/api/kindness/scopes', (_req: Request, res: Response) => {
    res.json(kindness.getScopes());
  });

  app.get('/api/kindness/scope/:scope', (req: Request, res: Response) => {
    const results = kindness.getKindnessActsByScope(
      req.params.scope as kindness.KindnessScope
    );
    res.json(results);
  });

  app.get('/api/kindness/effort/:level', (req: Request, res: Response) => {
    const results = kindness.getKindnessActsByEffort(
      req.params.level as kindness.KindnessAct['effortLevel']
    );
    res.json(results);
  });

  // --- Wellness Check-In ---
  app.post('/api/wellness/checkin', (req: Request, res: Response) => {
    const { mood, feelings } = req.body;
    if (!mood || typeof mood !== 'number' || mood < 1 || mood > 5) {
      res.status(400).json({ error: 'Mood must be a number between 1 and 5.' });
      return;
    }
    if (!Array.isArray(feelings)) {
      res.status(400).json({ error: 'Feelings must be an array of strings.' });
      return;
    }
    const checkIn = wellness.processCheckIn(mood as wellness.MoodLevel, feelings);
    res.json(checkIn);
  });

  app.get('/api/wellness/feelings', (_req: Request, res: Response) => {
    res.json(wellness.getAvailableFeelings());
  });

  app.get('/api/wellness/moods', (_req: Request, res: Response) => {
    res.json(wellness.getMoodDescriptors());
  });

  // --- Resources ---
  app.get('/api/resources', (_req: Request, res: Response) => {
    res.json(resources.getAllResources());
  });

  app.get('/api/resources/crisis', (_req: Request, res: Response) => {
    res.json(resources.getCrisisResources());
  });

  app.get('/api/resources/regions', (_req: Request, res: Response) => {
    res.json(resources.getRegions());
  });

  app.get('/api/resources/region/:region', (req: Request, res: Response) => {
    const results = resources.getResourcesByRegion(req.params.region as string);
    res.json(results);
  });

  // --- Daily Digest ---
  app.get('/api/daily', (_req: Request, res: Response) => {
    res.json({
      affirmation: affirmations.getDailyAffirmation(),
      perspectivePrompt: tolerance.getDailyPrompt(),
      kindnessAct: kindness.getDailyKindnessAct(),
      message: 'Here\'s your daily dose of positivity. You matter, and the world is better with you in it.',
    });
  });

  // --- Companion Guided Journeys ---
  app.get('/api/companion/journeys', (_req: Request, res: Response) => {
    res.json(companion.getAllJourneys());
  });

  app.get('/api/companion/journeys/:id', (req: Request, res: Response) => {
    const journey = companion.getJourneyById(req.params.id as string);
    if (!journey) {
      res.status(404).json({ error: 'Journey not found' });
      return;
    }
    res.json(journey);
  });

  app.get('/api/companion/journeys/:id/step/:step', (req: Request, res: Response) => {
    const stepNumber = parseInt(req.params.step as string);
    if (isNaN(stepNumber)) {
      res.status(400).json({ error: 'Step must be a number.' });
      return;
    }
    const step = companion.getJourneyStep(req.params.id as string, stepNumber);
    if (!step) {
      res.status(404).json({ error: 'Journey or step not found' });
      return;
    }
    res.json(step);
  });

  app.get('/api/companion/themes', (_req: Request, res: Response) => {
    res.json(companion.getJourneyThemes());
  });

  app.get('/api/companion/theme/:theme', (req: Request, res: Response) => {
    const results = companion.getJourneysByTheme(
      req.params.theme as companion.JourneyTheme
    );
    res.json(results);
  });

  app.get('/api/companion/random', (req: Request, res: Response) => {
    const theme = req.query.theme as string | undefined;
    try {
      const result = companion.getRandomJourney(
        theme as companion.JourneyTheme | undefined
      );
      res.json(result);
    } catch {
      res.status(400).json({ error: `Invalid or empty theme: ${theme}` });
    }
  });

  // --- Journal ---
  app.post('/api/journal', (req: Request, res: Response) => {
    const { type, prompt, content, mood, tags } = req.body;
    if (!type || !prompt || !content) {
      res.status(400).json({ error: 'type, prompt, and content are required.' });
      return;
    }
    if (mood !== undefined && (typeof mood !== 'number' || mood < 1 || mood > 5)) {
      res.status(400).json({ error: 'mood must be a number between 1 and 5.' });
      return;
    }
    const entry = journal.createEntry(type, prompt, content, mood, tags);
    res.status(201).json(entry);
  });

  app.get('/api/journal', (_req: Request, res: Response) => {
    res.json(journal.getAllEntries());
  });

  app.get('/api/journal/types', (_req: Request, res: Response) => {
    res.json(journal.getJournalTypes());
  });

  app.get('/api/journal/prompts', (req: Request, res: Response) => {
    const type = req.query.type as string | undefined;
    if (type) {
      res.json(journal.getPromptsByType(type as journal.JournalType));
    } else {
      res.json(journal.getRandomPrompt());
    }
  });

  app.get('/api/journal/entry/:id', (req: Request, res: Response) => {
    const entry = journal.getEntry(req.params.id as string);
    if (!entry) {
      res.status(404).json({ error: 'Journal entry not found' });
      return;
    }
    res.json(entry);
  });

  app.get('/api/journal/type/:type', (req: Request, res: Response) => {
    const results = journal.getEntriesByType(req.params.type as journal.JournalType);
    res.json(results);
  });

  // --- Peace Pledges ---
  app.post('/api/pledges', (req: Request, res: Response) => {
    const { pledge, category, name } = req.body;
    if (!pledge || !category) {
      res.status(400).json({ error: 'pledge and category are required.' });
      return;
    }
    const entry = pledges.createPledge(pledge, category, name);
    res.status(201).json(entry);
  });

  app.get('/api/pledges', (_req: Request, res: Response) => {
    res.json(pledges.getAllPledges());
  });

  app.get('/api/pledges/impact', (_req: Request, res: Response) => {
    res.json(pledges.getCommunityImpact());
  });

  app.get('/api/pledges/categories', (_req: Request, res: Response) => {
    res.json(pledges.getPledgeCategories());
  });

  app.get('/api/pledges/templates', (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    res.json(pledges.getPledgeTemplates(category as pledges.PledgeCategory | undefined));
  });

  app.get('/api/pledges/category/:category', (req: Request, res: Response) => {
    const results = pledges.getPledgesByCategory(
      req.params.category as pledges.PledgeCategory
    );
    res.json(results);
  });

  app.get('/api/pledges/:id', (req: Request, res: Response) => {
    const p = pledges.getPledge(req.params.id as string);
    if (!p) {
      res.status(404).json({ error: 'Pledge not found' });
      return;
    }
    res.json(p);
  });

  return app;
}
