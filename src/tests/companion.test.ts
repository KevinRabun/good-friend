import { describe, it, expect } from 'vitest';
import {
  getAllJourneys,
  getJourneyById,
  getJourneysByTheme,
  getJourneyStep,
  getJourneyThemes,
  getRandomJourney,
} from '../modules/companion';

describe('Companion Module', () => {
  describe('getAllJourneys', () => {
    it('returns all guided journeys', () => {
      const all = getAllJourneys();
      expect(all.length).toBeGreaterThan(0);
    });

    it('every journey has complete structure', () => {
      for (const j of getAllJourneys()) {
        expect(j.id).toBeTruthy();
        expect(j.title).toBeTruthy();
        expect(j.purpose).toBeTruthy();
        expect(j.theme).toBeTruthy();
        expect(j.steps.length).toBeGreaterThan(0);
        for (const s of j.steps) {
          expect(s.stepNumber).toBeGreaterThan(0);
          expect(s.instruction).toBeTruthy();
          expect(s.prompt).toBeTruthy();
          expect(s.followUp).toBeTruthy();
        }
      }
    });

    it('returns copies, not references', () => {
      const a = getAllJourneys();
      const b = getAllJourneys();
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
    });
  });

  describe('getJourneyById', () => {
    it('returns the correct journey', () => {
      const j = getJourneyById('gj-1');
      expect(j).toBeDefined();
      expect(j!.title).toBe('The Self-Compassion Journey');
    });

    it('returns undefined for unknown id', () => {
      expect(getJourneyById('nonexistent')).toBeUndefined();
    });
  });

  describe('getJourneysByTheme', () => {
    it('returns journeys matching the theme', () => {
      const results = getJourneysByTheme('empathy-exploration');
      expect(results.length).toBeGreaterThan(0);
      for (const j of results) {
        expect(j.theme).toBe('empathy-exploration');
      }
    });

    it('returns empty for non-existent theme', () => {
      expect(getJourneysByTheme('nonexistent' as any)).toEqual([]);
    });
  });

  describe('getJourneyStep', () => {
    it('returns the correct step', () => {
      const step = getJourneyStep('gj-1', 1);
      expect(step).toBeDefined();
      expect(step!.stepNumber).toBe(1);
      expect(step!.instruction).toBeTruthy();
    });

    it('returns undefined for unknown journey', () => {
      expect(getJourneyStep('nonexistent', 1)).toBeUndefined();
    });

    it('returns undefined for unknown step', () => {
      expect(getJourneyStep('gj-1', 99)).toBeUndefined();
    });
  });

  describe('getJourneyThemes', () => {
    it('returns all unique themes', () => {
      const themes = getJourneyThemes();
      expect(themes).toContain('self-compassion');
      expect(themes).toContain('empathy-exploration');
      expect(themes).toContain('gratitude-deepening');
      expect(themes).toContain('conflict-healing');
      expect(themes).toContain('global-connection');
      expect(themes).toContain('inner-peace');
    });
  });

  describe('getRandomJourney', () => {
    it('returns a valid journey', () => {
      const j = getRandomJourney();
      expect(j.id).toBeTruthy();
      expect(j.steps.length).toBeGreaterThan(0);
    });

    it('respects theme filter', () => {
      const j = getRandomJourney('inner-peace');
      expect(j.theme).toBe('inner-peace');
    });

    it('throws for invalid theme', () => {
      expect(() => getRandomJourney('nonexistent' as any)).toThrow();
    });
  });
});
