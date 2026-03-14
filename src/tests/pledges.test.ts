import { describe, it, expect, beforeEach } from 'vitest';
import {
  createPledge,
  getPledge,
  getAllPledges,
  getPledgesByCategory,
  getPledgeTemplates,
  getRandomTemplate,
  getPledgeCategories,
  getPledgeCount,
  getCommunityImpact,
  clearPledges,
} from '../modules/pledges';

describe('Pledges Module', () => {
  beforeEach(() => {
    clearPledges();
  });

  describe('createPledge', () => {
    it('creates a pledge with all fields', () => {
      const p = createPledge('I will be kind today', 'kindness', 'Alice');
      expect(p.id).toBeTruthy();
      expect(p.pledge).toBe('I will be kind today');
      expect(p.category).toBe('kindness');
      expect(p.name).toBe('Alice');
      expect(p.timestamp).toBeInstanceOf(Date);
    });

    it('allows anonymous pledges', () => {
      const p = createPledge('I choose peace', 'peace');
      expect(p.name).toBeUndefined();
    });

    it('stores pledges retrievably', () => {
      const created = createPledge('test pledge', 'tolerance');
      const retrieved = getPledge(created.id);
      expect(retrieved).toBeDefined();
      expect(retrieved!.pledge).toBe('test pledge');
    });
  });

  describe('getPledge', () => {
    it('returns undefined for unknown id', () => {
      expect(getPledge('nonexistent')).toBeUndefined();
    });
  });

  describe('getAllPledges', () => {
    it('returns all pledges', () => {
      createPledge('p1', 'kindness');
      createPledge('p2', 'peace');
      expect(getAllPledges()).toHaveLength(2);
    });

    it('returns empty when no pledges exist', () => {
      expect(getAllPledges()).toEqual([]);
    });
  });

  describe('getPledgesByCategory', () => {
    it('filters by category', () => {
      createPledge('p1', 'kindness');
      createPledge('p2', 'peace');
      createPledge('p3', 'kindness');
      const results = getPledgesByCategory('kindness');
      expect(results).toHaveLength(2);
      for (const p of results) {
        expect(p.category).toBe('kindness');
      }
    });
  });

  describe('getPledgeTemplates', () => {
    it('returns all templates when no category', () => {
      const templates = getPledgeTemplates();
      expect(templates.length).toBeGreaterThan(0);
    });

    it('filters by category', () => {
      const templates = getPledgeTemplates('peace');
      expect(templates.length).toBeGreaterThan(0);
      for (const t of templates) {
        expect(t.category).toBe('peace');
      }
    });
  });

  describe('getRandomTemplate', () => {
    it('returns a valid template', () => {
      const t = getRandomTemplate();
      expect(t.template).toBeTruthy();
      expect(t.category).toBeTruthy();
    });

    it('respects category filter', () => {
      const t = getRandomTemplate('inclusion');
      expect(t.category).toBe('inclusion');
    });

    it('throws for invalid category', () => {
      expect(() => getRandomTemplate('nonexistent' as any)).toThrow();
    });
  });

  describe('getPledgeCategories', () => {
    it('returns all categories', () => {
      const cats = getPledgeCategories();
      expect(cats).toContain('kindness');
      expect(cats).toContain('tolerance');
      expect(cats).toContain('listening');
      expect(cats).toContain('service');
      expect(cats).toContain('peace');
      expect(cats).toContain('inclusion');
    });
  });

  describe('getCommunityImpact', () => {
    it('returns totals and breakdown', () => {
      createPledge('p1', 'kindness');
      createPledge('p2', 'kindness');
      createPledge('p3', 'peace');
      const impact = getCommunityImpact();
      expect(impact.totalPledges).toBe(3);
      expect(impact.byCategory['kindness']).toBe(2);
      expect(impact.byCategory['peace']).toBe(1);
    });

    it('returns zero when empty', () => {
      const impact = getCommunityImpact();
      expect(impact.totalPledges).toBe(0);
      expect(impact.byCategory).toEqual({});
    });
  });

  describe('clearPledges', () => {
    it('removes all pledges', () => {
      createPledge('p', 'peace');
      expect(getPledgeCount()).toBe(1);
      clearPledges();
      expect(getPledgeCount()).toBe(0);
    });
  });
});
