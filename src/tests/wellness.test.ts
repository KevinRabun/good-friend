import { describe, it, expect } from 'vitest';
import {
  processCheckIn,
  getAvailableFeelings,
  getMoodDescriptors,
} from '../modules/wellness';

describe('Wellness Module', () => {
  describe('processCheckIn', () => {
    it('returns a check-in with crisis resources for mood 1', () => {
      const result = processCheckIn(1, ['anxious', 'lonely']);
      expect(result.mood).toBe(1);
      expect(result.feelings).toEqual(['anxious', 'lonely']);
      expect(result.response.resourcesRecommended).toBe(true);
      expect(result.response.message).toBeTruthy();
      expect(result.response.suggestions.length).toBeGreaterThan(0);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('returns supportive response for mood 2', () => {
      const result = processCheckIn(2, ['sad']);
      expect(result.response.resourcesRecommended).toBe(true);
      expect(result.response.suggestions.length).toBeGreaterThan(0);
    });

    it('returns encouraging response for mood 3', () => {
      const result = processCheckIn(3, ['calm']);
      expect(result.response.resourcesRecommended).toBe(false);
    });

    it('tailors mood 2 response when feeling lonely', () => {
      const lonely = processCheckIn(2, ['lonely']);
      const notLonely = processCheckIn(2, ['sad']);
      expect(lonely.response.suggestions).not.toEqual(notLonely.response.suggestions);
    });

    it('tailors mood 3 response when feeling stressed', () => {
      const stressed = processCheckIn(3, ['stressed']);
      expect(stressed.response.suggestions.some(s => s.includes('breathe'))).toBe(true);
    });

    it('returns positive response for mood 4', () => {
      const result = processCheckIn(4, ['joyful']);
      expect(result.response.resourcesRecommended).toBe(false);
      expect(result.response.message).toContain('positive');
    });

    it('returns thriving response for mood 5', () => {
      const result = processCheckIn(5, ['energized', 'inspired']);
      expect(result.response.resourcesRecommended).toBe(false);
      expect(result.response.message).toContain('thriving');
    });

    it('preserves feelings as copies', () => {
      const feelings = ['calm', 'grateful'];
      const result = processCheckIn(4, feelings);
      feelings.push('modified');
      expect(result.feelings).not.toContain('modified');
    });
  });

  describe('getAvailableFeelings', () => {
    it('returns a non-empty list of feeling words', () => {
      const feelings = getAvailableFeelings();
      expect(feelings.length).toBeGreaterThan(0);
      expect(feelings).toContain('anxious');
      expect(feelings).toContain('peaceful');
      expect(feelings).toContain('grateful');
    });
  });

  describe('getMoodDescriptors', () => {
    it('returns descriptors for all 5 mood levels', () => {
      const descriptors = getMoodDescriptors();
      expect(descriptors).toHaveLength(5);
      for (let i = 0; i < 5; i++) {
        expect(descriptors[i].level).toBe(i + 1);
        expect(descriptors[i].label).toBeTruthy();
        expect(descriptors[i].description).toBeTruthy();
      }
    });
  });
});
