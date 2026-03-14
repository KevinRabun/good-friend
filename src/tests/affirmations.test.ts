import { describe, it, expect } from 'vitest';
import {
  getAllAffirmations,
  getAffirmationsByTheme,
  getRandomAffirmation,
  getDailyAffirmation,
  getThemes,
} from '../modules/affirmations';

describe('Affirmations Module', () => {
  describe('getAllAffirmations', () => {
    it('returns all affirmations as an array', () => {
      const all = getAllAffirmations();
      expect(Array.isArray(all)).toBe(true);
      expect(all.length).toBeGreaterThan(0);
    });

    it('returns copies, not references', () => {
      const a = getAllAffirmations();
      const b = getAllAffirmations();
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
    });

    it('every affirmation has required fields', () => {
      for (const a of getAllAffirmations()) {
        expect(a.id).toBeTruthy();
        expect(a.text).toBeTruthy();
        expect(a.theme).toBeTruthy();
      }
    });
  });

  describe('getAffirmationsByTheme', () => {
    it('returns only affirmations matching the theme', () => {
      const tolerance = getAffirmationsByTheme('tolerance');
      expect(tolerance.length).toBeGreaterThan(0);
      for (const a of tolerance) {
        expect(a.theme).toBe('tolerance');
      }
    });

    it('returns empty array for non-existent theme', () => {
      const results = getAffirmationsByTheme('nonexistent' as any);
      expect(results).toEqual([]);
    });
  });

  describe('getRandomAffirmation', () => {
    it('returns a valid affirmation', () => {
      const a = getRandomAffirmation();
      expect(a.id).toBeTruthy();
      expect(a.text).toBeTruthy();
    });

    it('returns affirmation matching requested theme', () => {
      const a = getRandomAffirmation('peace');
      expect(a.theme).toBe('peace');
    });

    it('throws for invalid theme with no matches', () => {
      expect(() => getRandomAffirmation('nonexistent' as any)).toThrow();
    });
  });

  describe('getDailyAffirmation', () => {
    it('returns a deterministic affirmation for the current day', () => {
      const a = getDailyAffirmation();
      const b = getDailyAffirmation();
      expect(a).toEqual(b);
    });
  });

  describe('getThemes', () => {
    it('returns all unique themes', () => {
      const themes = getThemes();
      expect(themes).toContain('self-worth');
      expect(themes).toContain('tolerance');
      expect(themes).toContain('peace');
      expect(themes).toContain('compassion');
      expect(themes).toContain('gratitude');
      expect(themes).toContain('connection');
      expect(themes).toContain('resilience');
    });
  });
});
