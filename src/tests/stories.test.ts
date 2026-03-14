import { describe, it, expect, beforeEach } from 'vitest';
import {
  createStory,
  getAllStories,
  getStory,
  getStoriesByCategory,
  encourageStory,
  getRandomStory,
  getStoryCategories,
  getStoryCount,
  getMostEncouraged,
  clearStories,
} from '../modules/stories';

describe('Stories Module', () => {
  beforeEach(() => {
    clearStories();
  });

  describe('seed stories', () => {
    it('start with 0 after clear', () => {
      expect(getStoryCount()).toBe(0);
    });
  });

  describe('createStory', () => {
    it('creates a story and returns it', () => {
      const s = createStory('My kind neighbor helped me move.', 'kindness-received', 'New York');
      expect(s.id).toBeTruthy();
      expect(s.story).toBe('My kind neighbor helped me move.');
      expect(s.category).toBe('kindness-received');
      expect(s.location).toBe('New York');
      expect(s.encouragements).toBe(0);
      expect(s.timestamp).toBeInstanceOf(Date);
    });

    it('creates without location', () => {
      const s = createStory('Helped a stranger.', 'kindness-given');
      expect(s.location).toBeUndefined();
    });

    it('increments story count', () => {
      createStory('A', 'growth');
      createStory('B', 'growth');
      expect(getStoryCount()).toBe(2);
    });
  });

  describe('getStory', () => {
    it('retrieves a story by id', () => {
      const created = createStory('Test story', 'peace-moment');
      const found = getStory(created.id);
      expect(found).toBeDefined();
      expect(found!.story).toBe('Test story');
    });

    it('returns undefined for unknown id', () => {
      expect(getStory('not-real')).toBeUndefined();
    });

    it('returns a copy', () => {
      const created = createStory('Copy test', 'growth');
      const a = getStory(created.id);
      const b = getStory(created.id);
      expect(a).not.toBe(b);
    });
  });

  describe('getAllStories', () => {
    it('returns all created stories', () => {
      createStory('One', 'growth');
      createStory('Two', 'reconciliation');
      expect(getAllStories()).toHaveLength(2);
    });
  });

  describe('getStoriesByCategory', () => {
    it('filters by category', () => {
      createStory('Kind story', 'kindness-received');
      createStory('Growth story', 'growth');
      createStory('Another kind', 'kindness-received');
      const kind = getStoriesByCategory('kindness-received');
      expect(kind).toHaveLength(2);
      expect(kind.every((s) => s.category === 'kindness-received')).toBe(true);
    });

    it('returns empty array for missing category', () => {
      expect(getStoriesByCategory('cross-cultural')).toHaveLength(0);
    });
  });

  describe('encourageStory', () => {
    it('increments encouragement count', () => {
      const s = createStory('Encourage me', 'peace-moment');
      const result = encourageStory(s.id);
      expect(result).toBeDefined();
      expect(result!.encouragements).toBe(1);
      encourageStory(s.id);
      const final = getStory(s.id);
      expect(final!.encouragements).toBe(2);
    });

    it('returns undefined for unknown id', () => {
      expect(encourageStory('nope')).toBeUndefined();
    });
  });

  describe('getRandomStory', () => {
    it('returns a random story', () => {
      createStory('Rand 1', 'growth');
      createStory('Rand 2', 'peace-moment');
      const s = getRandomStory();
      expect(s.story).toBeTruthy();
    });

    it('filters by category', () => {
      createStory('Cat 1', 'growth');
      createStory('Cat 2', 'reconciliation');
      const s = getRandomStory('growth');
      expect(s.category).toBe('growth');
    });

    it('throws when no stories', () => {
      expect(() => getRandomStory()).toThrow();
    });

    it('throws for empty category', () => {
      createStory('A', 'growth');
      expect(() => getRandomStory('cross-cultural')).toThrow();
    });
  });

  describe('getStoryCategories', () => {
    it('returns unique categories of existing stories', () => {
      createStory('A', 'growth');
      createStory('B', 'growth');
      createStory('C', 'reconciliation');
      const cats = getStoryCategories();
      expect(cats).toContain('growth');
      expect(cats).toContain('reconciliation');
      expect(cats).toHaveLength(2);
    });
  });

  describe('getMostEncouraged', () => {
    it('returns stories sorted by encouragements', () => {
      const a = createStory('Low', 'growth');
      const b = createStory('High', 'peace-moment');
      encourageStory(b.id);
      encourageStory(b.id);
      encourageStory(b.id);
      encourageStory(a.id);
      const top = getMostEncouraged(2);
      expect(top[0].id).toBe(b.id);
      expect(top[0].encouragements).toBe(3);
      expect(top[1].encouragements).toBe(1);
    });

    it('respects limit', () => {
      createStory('X', 'growth');
      createStory('Y', 'growth');
      createStory('Z', 'growth');
      expect(getMostEncouraged(1)).toHaveLength(1);
    });
  });
});
