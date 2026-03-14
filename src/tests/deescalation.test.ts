import { describe, it, expect } from 'vitest';
import {
  getAllStrategies,
  getStrategyById,
  getRandomStrategy,
  getQuickPhrase,
  getStrategyCount,
} from '../modules/deescalation';

describe('Deescalation Module', () => {
  describe('getAllStrategies', () => {
    it('returns all strategies', () => {
      const strategies = getAllStrategies();
      expect(strategies.length).toBe(5);
    });

    it('returns copies (not references)', () => {
      const a = getAllStrategies();
      const b = getAllStrategies();
      expect(a).not.toBe(b);
      expect(a[0]).not.toBe(b[0]);
      a[0].title = 'MUTATED';
      expect(getAllStrategies()[0].title).not.toBe('MUTATED');
    });

    it('every strategy has required fields', () => {
      for (const s of getAllStrategies()) {
        expect(s.id).toBeTruthy();
        expect(s.title).toBeTruthy();
        expect(s.situation).toBeTruthy();
        expect(s.steps.length).toBeGreaterThan(0);
        expect(s.phrases.length).toBeGreaterThan(0);
        expect(s.avoidPhrases.length).toBeGreaterThan(0);
        expect(s.principle).toBeTruthy();
      }
    });
  });

  describe('getStrategyById', () => {
    it('returns a strategy by id', () => {
      const s = getStrategyById('de-1');
      expect(s).toBeDefined();
      expect(s!.title).toBe('The PAUSE Method');
    });

    it('returns undefined for unknown id', () => {
      expect(getStrategyById('nonexistent')).toBeUndefined();
    });

    it('returns a copy', () => {
      const a = getStrategyById('de-1');
      const b = getStrategyById('de-1');
      expect(a).not.toBe(b);
    });
  });

  describe('getRandomStrategy', () => {
    it('returns a valid strategy', () => {
      const s = getRandomStrategy();
      expect(s.id).toBeTruthy();
      expect(s.steps.length).toBeGreaterThan(0);
    });

    it('returns copies', () => {
      const s = getRandomStrategy();
      s.title = 'MUTATED';
      const all = getAllStrategies();
      expect(all.every((x) => x.title !== 'MUTATED')).toBe(true);
    });
  });

  describe('getQuickPhrase', () => {
    it('returns a string', () => {
      const phrase = getQuickPhrase();
      expect(typeof phrase).toBe('string');
      expect(phrase.length).toBeGreaterThan(0);
    });
  });

  describe('getStrategyCount', () => {
    it('returns 5', () => {
      expect(getStrategyCount()).toBe(5);
    });
  });

  describe('specific strategies', () => {
    it('The PAUSE Method has 5 steps', () => {
      const s = getStrategyById('de-1');
      expect(s!.steps).toHaveLength(5);
      expect(s!.steps[0]).toContain('Pause');
    });

    it('Bridge Building focuses on common ground', () => {
      const s = getStrategyById('de-2');
      expect(s!.title).toBe('Bridge Building');
      expect(s!.principle).toContain('understand');
    });

    it('Empathy Reset has validation phrases', () => {
      const s = getStrategyById('de-3');
      expect(s!.phrases.some((p) => p.includes('feel'))).toBe(true);
    });

    it('Cooling Down Together proposes a break', () => {
      const s = getStrategyById('de-4');
      expect(s!.steps.some((step) => step.toLowerCase().includes('break'))).toBe(true);
    });

    it('Cross-Cultural Misunderstanding promotes curiosity', () => {
      const s = getStrategyById('de-5');
      expect(s!.steps[0]).toContain('curiosity');
    });
  });
});
