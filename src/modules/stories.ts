/**
 * Community Stories — anonymous stories of kindness, growth,
 * reconciliation, and peace shared by community members.
 */

export interface CommunityStory {
  id: string;
  timestamp: Date;
  story: string;
  category: StoryCategory;
  location?: string;
  encouragements: number;
}

export type StoryCategory =
  | 'kindness-received'
  | 'kindness-given'
  | 'reconciliation'
  | 'growth'
  | 'cross-cultural'
  | 'peace-moment';

// In-memory store with some seed stories
const stories: Map<string, CommunityStory> = new Map();
let nextId = 1;

const seedStories: Omit<CommunityStory, 'id' | 'timestamp' | 'encouragements'>[] = [
  {
    story: 'A stranger on the bus noticed I was crying and quietly handed me a tissue and a piece of chocolate. They didn\'t say a word — just smiled warmly. That small act of kindness got me through one of the hardest days of my life.',
    category: 'kindness-received',
    location: 'Public transit',
  },
  {
    story: 'I started leaving encouraging notes in library books. Someone found one of my notes and posted about it online saying it made their day. I realized that even tiny gestures can travel further than we imagine.',
    category: 'kindness-given',
  },
  {
    story: 'After years of not speaking to my brother over a family disagreement, I sent him a simple message: "I miss you." He called me within an hour. We didn\'t solve everything that day, but we started.',
    category: 'reconciliation',
  },
  {
    story: 'I used to be afraid of people who were different from me. When I started working with refugees at a local center, I discovered that our shared humanity was so much bigger than our differences. It changed my entire worldview.',
    category: 'cross-cultural',
  },
  {
    story: 'I was stuck in traffic and feeling road rage building. Instead of honking, I took three deep breaths and let the other car merge. The driver waved thank you. Such a small moment, but I felt proud of choosing peace.',
    category: 'peace-moment',
  },
  {
    story: 'After my divorce, I felt like a failure. A therapist helped me see that asking for help was actually the bravest thing I could do. Two years later, I\'m stronger, kinder, and more compassionate than I\'ve ever been.',
    category: 'growth',
  },
];

// Initialize with seed stories
function initSeedStories() {
  if (stories.size === 0) {
    for (const seed of seedStories) {
      const story: CommunityStory = {
        id: `story-${nextId++}`,
        timestamp: new Date(),
        story: seed.story,
        category: seed.category,
        location: seed.location,
        encouragements: Math.floor(Math.random() * 50) + 5,
      };
      stories.set(story.id, story);
    }
  }
}

initSeedStories();

export function createStory(
  storyText: string,
  category: StoryCategory,
  location?: string
): CommunityStory {
  const entry: CommunityStory = {
    id: `story-${nextId++}`,
    timestamp: new Date(),
    story: storyText,
    category,
    location,
    encouragements: 0,
  };
  stories.set(entry.id, entry);
  return { ...entry };
}

export function getStory(id: string): CommunityStory | undefined {
  const s = stories.get(id);
  return s ? { ...s } : undefined;
}

export function getAllStories(): CommunityStory[] {
  return [...stories.values()].map((s) => ({ ...s }));
}

export function getStoriesByCategory(category: StoryCategory): CommunityStory[] {
  return [...stories.values()]
    .filter((s) => s.category === category)
    .map((s) => ({ ...s }));
}

export function encourageStory(id: string): CommunityStory | undefined {
  const story = stories.get(id);
  if (!story) return undefined;
  story.encouragements += 1;
  return { ...story };
}

export function getRandomStory(category?: StoryCategory): CommunityStory {
  const pool = category
    ? [...stories.values()].filter((s) => s.category === category)
    : [...stories.values()];
  if (pool.length === 0) {
    throw new Error(`No stories found${category ? ` for category: ${category}` : ''}`);
  }
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return { ...picked };
}

export function getStoryCategories(): StoryCategory[] {
  return [...new Set([...stories.values()].map((s) => s.category))];
}

export function getStoryCount(): number {
  return stories.size;
}

export function getMostEncouraged(limit = 5): CommunityStory[] {
  return [...stories.values()]
    .sort((a, b) => b.encouragements - a.encouragements)
    .slice(0, limit)
    .map((s) => ({ ...s }));
}

export function clearStories(): void {
  stories.clear();
  nextId = 1;
}
