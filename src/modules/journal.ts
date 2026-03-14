/**
 * Journal — a reflective journaling system for tracking
 * personal growth, gratitude, and emotional processing.
 * Uses in-memory storage (suitable for single-session use;
 * persistent storage can be added later).
 */

export interface JournalEntry {
  id: string;
  timestamp: Date;
  type: JournalType;
  prompt: string;
  content: string;
  mood?: number;
  tags: string[];
}

export type JournalType =
  | 'free-write'
  | 'gratitude'
  | 'reflection'
  | 'kindness-log'
  | 'growth'
  | 'peace-intention';

export interface JournalPrompt {
  type: JournalType;
  prompt: string;
}

const journalPrompts: JournalPrompt[] = [
  { type: 'gratitude', prompt: 'What are three things you\'re grateful for today, and why do they matter to you?' },
  { type: 'gratitude', prompt: 'Who made your day better recently? What would you want them to know?' },
  { type: 'gratitude', prompt: 'What is a simple pleasure you often overlook?' },

  { type: 'reflection', prompt: 'What did you learn about yourself today?' },
  { type: 'reflection', prompt: 'When did you feel most like yourself this week?' },
  { type: 'reflection', prompt: 'What belief or assumption did you recently reconsider?' },

  { type: 'kindness-log', prompt: 'Describe an act of kindness you witnessed or performed today.' },
  { type: 'kindness-log', prompt: 'How did someone show you kindness recently? How did it make you feel?' },
  { type: 'kindness-log', prompt: 'What kindness would you like to offer the world tomorrow?' },

  { type: 'growth', prompt: 'What challenge are you currently facing, and what is it teaching you?' },
  { type: 'growth', prompt: 'How have you changed in the past year? What are you proud of?' },
  { type: 'growth', prompt: 'What skill or quality would you like to develop, and why?' },

  { type: 'peace-intention', prompt: 'What does peace mean to you personally?' },
  { type: 'peace-intention', prompt: 'How can you bring more peace into your relationships this week?' },
  { type: 'peace-intention', prompt: 'Describe a moment of deep calm you experienced. What made it possible?' },

  { type: 'free-write', prompt: 'Write freely about whatever is on your mind. No rules, no judgment.' },
];

// In-memory store
const entries: Map<string, JournalEntry> = new Map();
let nextId = 1;

export function createEntry(
  type: JournalType,
  prompt: string,
  content: string,
  mood?: number,
  tags: string[] = []
): JournalEntry {
  const entry: JournalEntry = {
    id: `journal-${nextId++}`,
    timestamp: new Date(),
    type,
    prompt,
    content,
    mood,
    tags: [...tags],
  };
  entries.set(entry.id, entry);
  return { ...entry, tags: [...entry.tags] };
}

export function getEntry(id: string): JournalEntry | undefined {
  const entry = entries.get(id);
  if (!entry) return undefined;
  return { ...entry, tags: [...entry.tags] };
}

export function getAllEntries(): JournalEntry[] {
  return [...entries.values()].map((e) => ({ ...e, tags: [...e.tags] }));
}

export function getEntriesByType(type: JournalType): JournalEntry[] {
  return [...entries.values()]
    .filter((e) => e.type === type)
    .map((e) => ({ ...e, tags: [...e.tags] }));
}

export function getPromptsByType(type: JournalType): JournalPrompt[] {
  return journalPrompts.filter((p) => p.type === type);
}

export function getRandomPrompt(type?: JournalType): JournalPrompt {
  const pool = type ? getPromptsByType(type) : journalPrompts;
  if (pool.length === 0) {
    throw new Error(`No prompts found for type: ${type}`);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getJournalTypes(): JournalType[] {
  return [...new Set(journalPrompts.map((p) => p.type))];
}

export function clearEntries(): void {
  entries.clear();
  nextId = 1;
}

export function getEntryCount(): number {
  return entries.size;
}
