/**
 * Peace Pledges — a system for individuals to make personal
 * commitments to kindness, tolerance, and peace, and to see
 * the collective impact of the community's pledges.
 */

export interface PeacePledge {
  id: string;
  timestamp: Date;
  pledge: string;
  category: PledgeCategory;
  name?: string;
}

export type PledgeCategory =
  | 'kindness'
  | 'tolerance'
  | 'listening'
  | 'service'
  | 'peace'
  | 'inclusion';

export interface PledgeTemplate {
  category: PledgeCategory;
  template: string;
}

const pledgeTemplates: PledgeTemplate[] = [
  { category: 'kindness', template: 'I pledge to perform one act of unexpected kindness every day this week.' },
  { category: 'kindness', template: 'I pledge to speak kind words to myself and others, especially in difficult moments.' },
  { category: 'tolerance', template: 'I pledge to learn about a culture, faith, or community different from my own.' },
  { category: 'tolerance', template: 'I pledge to challenge my own assumptions before forming opinions about others.' },
  { category: 'listening', template: 'I pledge to truly listen in my next difficult conversation, seeking to understand before being understood.' },
  { category: 'listening', template: 'I pledge to ask more questions and make fewer assumptions about the people around me.' },
  { category: 'service', template: 'I pledge to volunteer my time or skills to help someone in my community.' },
  { category: 'service', template: 'I pledge to mentor or support someone who could benefit from encouragement.' },
  { category: 'peace', template: 'I pledge to respond to conflict with calm and compassion instead of anger.' },
  { category: 'peace', template: 'I pledge to be a peacemaker in my family, workplace, or community this week.' },
  { category: 'inclusion', template: 'I pledge to make sure no one around me feels left out or unheard.' },
  { category: 'inclusion', template: 'I pledge to use inclusive, respectful language in all my interactions.' },
];

// In-memory store
const pledges: Map<string, PeacePledge> = new Map();
let nextId = 1;

export function createPledge(
  pledge: string,
  category: PledgeCategory,
  name?: string
): PeacePledge {
  const entry: PeacePledge = {
    id: `pledge-${nextId++}`,
    timestamp: new Date(),
    pledge,
    category,
    name,
  };
  pledges.set(entry.id, entry);
  return { ...entry };
}

export function getPledge(id: string): PeacePledge | undefined {
  const p = pledges.get(id);
  return p ? { ...p } : undefined;
}

export function getAllPledges(): PeacePledge[] {
  return [...pledges.values()].map((p) => ({ ...p }));
}

export function getPledgesByCategory(category: PledgeCategory): PeacePledge[] {
  return [...pledges.values()]
    .filter((p) => p.category === category)
    .map((p) => ({ ...p }));
}

export function getPledgeTemplates(category?: PledgeCategory): PledgeTemplate[] {
  return category
    ? pledgeTemplates.filter((t) => t.category === category)
    : [...pledgeTemplates];
}

export function getRandomTemplate(category?: PledgeCategory): PledgeTemplate {
  const pool = category
    ? pledgeTemplates.filter((t) => t.category === category)
    : pledgeTemplates;
  if (pool.length === 0) {
    throw new Error(`No templates found for category: ${category}`);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getPledgeCategories(): PledgeCategory[] {
  return [...new Set(pledgeTemplates.map((t) => t.category))];
}

export function getPledgeCount(): number {
  return pledges.size;
}

export function getCommunityImpact(): {
  totalPledges: number;
  byCategory: Record<string, number>;
} {
  const byCategory: Record<string, number> = {};
  for (const p of pledges.values()) {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  }
  return { totalPledges: pledges.size, byCategory };
}

export function clearPledges(): void {
  pledges.clear();
  nextId = 1;
}
