import { describe, it, expect } from 'vitest';
import {
  getAllExercises,
  getExercisesByCategory,
  getExerciseById,
  getRandomExercise,
  getExercisesByMaxDuration,
  getCategories,
} from '../modules/mindfulness';

describe('Mindfulness Module', () => {
  describe('getAllExercises', () => {
    it('returns all exercises', () => {
      const all = getAllExercises();
      expect(all.length).toBeGreaterThan(0);
    });

    it('every exercise has complete structure', () => {
      for (const e of getAllExercises()) {
        expect(e.id).toBeTruthy();
        expect(e.title).toBeTruthy();
        expect(e.category).toBeTruthy();
        expect(e.durationMinutes).toBeGreaterThan(0);
        expect(e.steps.length).toBeGreaterThan(0);
        expect(e.benefit).toBeTruthy();
      }
    });
  });

  describe('getExercisesByCategory', () => {
    it('returns exercises matching the category', () => {
      const breathing = getExercisesByCategory('breathing');
      expect(breathing.length).toBeGreaterThan(0);
      for (const e of breathing) {
        expect(e.category).toBe('breathing');
      }
    });

    it('returns empty for non-existent category', () => {
      expect(getExercisesByCategory('nonexistent' as any)).toEqual([]);
    });
  });

  describe('getExerciseById', () => {
    it('returns the exercise with matching id', () => {
      const e = getExerciseById('br-1');
      expect(e).toBeDefined();
      expect(e!.title).toBe('4-7-8 Breathing');
    });

    it('returns undefined for unknown id', () => {
      expect(getExerciseById('nonexistent')).toBeUndefined();
    });
  });

  describe('getRandomExercise', () => {
    it('returns a valid exercise', () => {
      const e = getRandomExercise();
      expect(e.id).toBeTruthy();
    });

    it('respects category filter', () => {
      const e = getRandomExercise('loving-kindness');
      expect(e.category).toBe('loving-kindness');
    });

    it('throws for empty category', () => {
      expect(() => getRandomExercise('nonexistent' as any)).toThrow();
    });
  });

  describe('getExercisesByMaxDuration', () => {
    it('returns only exercises within time limit', () => {
      const short = getExercisesByMaxDuration(5);
      for (const e of short) {
        expect(e.durationMinutes).toBeLessThanOrEqual(5);
      }
    });

    it('returns no exercises for zero minutes', () => {
      expect(getExercisesByMaxDuration(0)).toEqual([]);
    });
  });

  describe('getCategories', () => {
    it('returns all unique categories', () => {
      const cats = getCategories();
      expect(cats).toContain('breathing');
      expect(cats).toContain('grounding');
      expect(cats).toContain('meditation');
      expect(cats).toContain('loving-kindness');
    });
  });
});
