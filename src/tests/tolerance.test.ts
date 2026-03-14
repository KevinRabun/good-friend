import { describe, it, expect } from 'vitest';
import {
  getAllPrompts,
  getPromptsByCategory,
  getRandomPrompt,
  getDailyPrompt,
  getCategories,
} from '../modules/tolerance';

describe('Tolerance Module', () => {
  describe('getAllPrompts', () => {
    it('returns all perspective prompts', () => {
      const all = getAllPrompts();
      expect(all.length).toBeGreaterThan(0);
    });

    it('every prompt has required structure', () => {
      for (const p of getAllPrompts()) {
        expect(p.id).toBeTruthy();
        expect(p.prompt).toBeTruthy();
        expect(p.category).toBeTruthy();
        expect(p.reflectionQuestions.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getPromptsByCategory', () => {
    it('returns prompts for empathy-building', () => {
      const results = getPromptsByCategory('empathy-building');
      expect(results.length).toBeGreaterThan(0);
      for (const p of results) {
        expect(p.category).toBe('empathy-building');
      }
    });

    it('returns prompts for conflict-resolution', () => {
      const results = getPromptsByCategory('conflict-resolution');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('getRandomPrompt', () => {
    it('returns a valid prompt', () => {
      const p = getRandomPrompt();
      expect(p.prompt).toBeTruthy();
    });

    it('respects category filter', () => {
      const p = getRandomPrompt('active-listening');
      expect(p.category).toBe('active-listening');
    });

    it('throws for invalid category', () => {
      expect(() => getRandomPrompt('nonexistent' as any)).toThrow();
    });
  });

  describe('getDailyPrompt', () => {
    it('is deterministic for the same day', () => {
      const a = getDailyPrompt();
      const b = getDailyPrompt();
      expect(a).toEqual(b);
    });
  });

  describe('getCategories', () => {
    it('includes all expected categories', () => {
      const cats = getCategories();
      expect(cats).toContain('cultural-awareness');
      expect(cats).toContain('empathy-building');
      expect(cats).toContain('conflict-resolution');
      expect(cats).toContain('inclusive-language');
      expect(cats).toContain('active-listening');
    });
  });
});
