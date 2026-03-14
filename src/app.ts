import express, { Request, Response } from 'express';
import * as affirmations from './modules/affirmations';
import * as mindfulness from './modules/mindfulness';
import * as tolerance from './modules/tolerance';
import * as kindness from './modules/kindness';
import * as wellness from './modules/wellness';
import * as resources from './modules/resources';

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

  return app;
}
