import { describe, it, expect, beforeEach } from 'vitest';
import {
  createEntry,
  getEntry,
  getAllEntries,
  getEntriesByType,
  getPromptsByType,
  getRandomPrompt,
  getJournalTypes,
  clearEntries,
  getEntryCount,
} from '../modules/journal';

describe('Journal Module', () => {
  beforeEach(() => {
    clearEntries();
  });

  describe('createEntry', () => {
    it('creates and stores a journal entry', () => {
      const entry = createEntry('gratitude', 'What are you grateful for?', 'My family and friends.', 4, ['family']);
      expect(entry.id).toBeTruthy();
      expect(entry.type).toBe('gratitude');
      expect(entry.prompt).toBe('What are you grateful for?');
      expect(entry.content).toBe('My family and friends.');
      expect(entry.mood).toBe(4);
      expect(entry.tags).toEqual(['family']);
      expect(entry.timestamp).toBeInstanceOf(Date);
    });

    it('creates entries with incrementing ids', () => {
      const a = createEntry('free-write', 'p', 'c1');
      const b = createEntry('reflection', 'p', 'c2');
      expect(a.id).not.toBe(b.id);
    });

    it('stores entries that can be retrieved', () => {
      const created = createEntry('gratitude', 'prompt', 'content');
      const retrieved = getEntry(created.id);
      expect(retrieved).toBeDefined();
      expect(retrieved!.content).toBe('content');
    });
  });

  describe('getEntry', () => {
    it('returns undefined for unknown id', () => {
      expect(getEntry('nonexistent')).toBeUndefined();
    });
  });

  describe('getAllEntries', () => {
    it('returns all entries', () => {
      createEntry('gratitude', 'p1', 'c1');
      createEntry('reflection', 'p2', 'c2');
      expect(getAllEntries()).toHaveLength(2);
    });

    it('returns empty array when no entries', () => {
      expect(getAllEntries()).toEqual([]);
    });
  });

  describe('getEntriesByType', () => {
    it('filters by type', () => {
      createEntry('gratitude', 'p1', 'c1');
      createEntry('reflection', 'p2', 'c2');
      createEntry('gratitude', 'p3', 'c3');
      const results = getEntriesByType('gratitude');
      expect(results).toHaveLength(2);
      for (const e of results) {
        expect(e.type).toBe('gratitude');
      }
    });
  });

  describe('getPromptsByType', () => {
    it('returns prompts for the given type', () => {
      const prompts = getPromptsByType('gratitude');
      expect(prompts.length).toBeGreaterThan(0);
      for (const p of prompts) {
        expect(p.type).toBe('gratitude');
      }
    });
  });

  describe('getRandomPrompt', () => {
    it('returns a valid prompt', () => {
      const p = getRandomPrompt();
      expect(p.prompt).toBeTruthy();
      expect(p.type).toBeTruthy();
    });

    it('respects type filter', () => {
      const p = getRandomPrompt('peace-intention');
      expect(p.type).toBe('peace-intention');
    });

    it('throws for invalid type', () => {
      expect(() => getRandomPrompt('nonexistent' as any)).toThrow();
    });
  });

  describe('getJournalTypes', () => {
    it('returns all types', () => {
      const types = getJournalTypes();
      expect(types).toContain('free-write');
      expect(types).toContain('gratitude');
      expect(types).toContain('reflection');
      expect(types).toContain('kindness-log');
      expect(types).toContain('growth');
      expect(types).toContain('peace-intention');
    });
  });

  describe('clearEntries', () => {
    it('removes all entries', () => {
      createEntry('gratitude', 'p', 'c');
      createEntry('gratitude', 'p', 'c');
      expect(getEntryCount()).toBe(2);
      clearEntries();
      expect(getEntryCount()).toBe(0);
    });
  });
});
