import { describe, it, expect } from 'vitest';
import {
  getAllResources,
  getResourcesByRegion,
  getResourcesByContactType,
  getCrisisResources,
  getRegions,
} from '../modules/resources';

describe('Resources Module', () => {
  describe('getAllResources', () => {
    it('returns all resources', () => {
      const all = getAllResources();
      expect(all.length).toBeGreaterThan(0);
    });

    it('every resource has required fields', () => {
      for (const r of getAllResources()) {
        expect(r.id).toBeTruthy();
        expect(r.name).toBeTruthy();
        expect(r.description).toBeTruthy();
        expect(r.region).toBeTruthy();
        expect(r.contactType).toBeTruthy();
        expect(r.contact).toBeTruthy();
        expect(r.available).toBeTruthy();
      }
    });
  });

  describe('getResourcesByRegion', () => {
    it('finds US resources', () => {
      const us = getResourcesByRegion('United States');
      expect(us.length).toBeGreaterThan(0);
      for (const r of us) {
        expect(r.region.toLowerCase()).toContain('united states');
      }
    });

    it('is case-insensitive', () => {
      const results = getResourcesByRegion('united kingdom');
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns empty for unknown region', () => {
      expect(getResourcesByRegion('Atlantis')).toEqual([]);
    });
  });

  describe('getResourcesByContactType', () => {
    it('finds phone resources', () => {
      const phone = getResourcesByContactType('phone');
      expect(phone.length).toBeGreaterThan(0);
      for (const r of phone) {
        expect(r.contactType).toBe('phone');
      }
    });

    it('finds website resources', () => {
      const web = getResourcesByContactType('website');
      expect(web.length).toBeGreaterThan(0);
    });
  });

  describe('getCrisisResources', () => {
    it('returns only 24/7 resources', () => {
      const crisis = getCrisisResources();
      expect(crisis.length).toBeGreaterThan(0);
      for (const r of crisis) {
        expect(r.available).toBe('24/7');
      }
    });
  });

  describe('getRegions', () => {
    it('includes expected regions', () => {
      const regions = getRegions();
      expect(regions).toContain('United States');
      expect(regions).toContain('International');
    });
  });
});
