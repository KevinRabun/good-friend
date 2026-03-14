import { describe, it, expect } from 'vitest';
import {
  getAllKindnessActs,
  getKindnessActsByScope,
  getKindnessActsByEffort,
  getRandomKindnessAct,
  getDailyKindnessAct,
  getScopes,
} from '../modules/kindness';

describe('Kindness Module', () => {
  describe('getAllKindnessActs', () => {
    it('returns all kindness acts', () => {
      const all = getAllKindnessActs();
      expect(all.length).toBeGreaterThan(0);
    });

    it('every act has required fields', () => {
      for (const k of getAllKindnessActs()) {
        expect(k.id).toBeTruthy();
        expect(k.suggestion).toBeTruthy();
        expect(k.scope).toBeTruthy();
        expect(k.effortLevel).toBeTruthy();
        expect(k.impact).toBeTruthy();
      }
    });
  });

  describe('getKindnessActsByScope', () => {
    it('filters by self scope', () => {
      const results = getKindnessActsByScope('self');
      expect(results.length).toBeGreaterThan(0);
      for (const k of results) {
        expect(k.scope).toBe('self');
      }
    });

    it('filters by global scope', () => {
      const results = getKindnessActsByScope('global');
      expect(results.length).toBeGreaterThan(0);
      for (const k of results) {
        expect(k.scope).toBe('global');
      }
    });
  });

  describe('getKindnessActsByEffort', () => {
    it('filters by effort level', () => {
      const small = getKindnessActsByEffort('small');
      expect(small.length).toBeGreaterThan(0);
      for (const k of small) {
        expect(k.effortLevel).toBe('small');
      }
    });
  });

  describe('getRandomKindnessAct', () => {
    it('returns a valid act', () => {
      const k = getRandomKindnessAct();
      expect(k.suggestion).toBeTruthy();
    });

    it('respects scope filter', () => {
      const k = getRandomKindnessAct('community');
      expect(k.scope).toBe('community');
    });

    it('throws for invalid scope', () => {
      expect(() => getRandomKindnessAct('nonexistent' as any)).toThrow();
    });
  });

  describe('getDailyKindnessAct', () => {
    it('is deterministic for the same day', () => {
      expect(getDailyKindnessAct()).toEqual(getDailyKindnessAct());
    });
  });

  describe('getScopes', () => {
    it('returns all scopes', () => {
      const scopes = getScopes();
      expect(scopes).toContain('self');
      expect(scopes).toContain('family');
      expect(scopes).toContain('community');
      expect(scopes).toContain('global');
    });
  });
});
