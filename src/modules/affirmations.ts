/**
 * Affirmations engine — curated positive affirmations organized by theme
 * to support mental health, self-worth, tolerance, and peace.
 */

export interface Affirmation {
  id: string;
  text: string;
  theme: AffirmationTheme;
}

export type AffirmationTheme =
  | 'self-worth'
  | 'resilience'
  | 'compassion'
  | 'tolerance'
  | 'peace'
  | 'gratitude'
  | 'connection';

const affirmations: Affirmation[] = [
  // Self-worth
  { id: 'sw-1', text: 'I am worthy of love and belonging, exactly as I am.', theme: 'self-worth' },
  { id: 'sw-2', text: 'My feelings are valid, and I give myself permission to feel them.', theme: 'self-worth' },
  { id: 'sw-3', text: 'I bring unique gifts to the world that only I can offer.', theme: 'self-worth' },
  { id: 'sw-4', text: 'I deserve kindness — from others and from myself.', theme: 'self-worth' },

  // Resilience
  { id: 'rs-1', text: 'I have overcome challenges before, and I can do it again.', theme: 'resilience' },
  { id: 'rs-2', text: 'Difficult moments are temporary; my strength is enduring.', theme: 'resilience' },
  { id: 'rs-3', text: 'Each setback teaches me something valuable about myself.', theme: 'resilience' },
  { id: 'rs-4', text: 'I choose to grow through what I go through.', theme: 'resilience' },

  // Compassion
  { id: 'cm-1', text: 'I extend the same kindness to myself that I offer to others.', theme: 'compassion' },
  { id: 'cm-2', text: 'Every person I meet is fighting a battle I know nothing about; I choose gentleness.', theme: 'compassion' },
  { id: 'cm-3', text: 'My compassion creates ripples of healing in the world around me.', theme: 'compassion' },
  { id: 'cm-4', text: 'I listen with an open heart and respond with understanding.', theme: 'compassion' },

  // Tolerance
  { id: 'tl-1', text: 'Our differences make us stronger as a community.', theme: 'tolerance' },
  { id: 'tl-2', text: 'I celebrate the rich tapestry of cultures, beliefs, and perspectives that surround me.', theme: 'tolerance' },
  { id: 'tl-3', text: 'Understanding begins when I choose curiosity over judgment.', theme: 'tolerance' },
  { id: 'tl-4', text: 'I honor the dignity inherent in every human being.', theme: 'tolerance' },
  { id: 'tl-5', text: 'I can disagree respectfully while still valuing another person\'s humanity.', theme: 'tolerance' },

  // Peace
  { id: 'pc-1', text: 'Peace in the world begins with peace within myself.', theme: 'peace' },
  { id: 'pc-2', text: 'I choose dialogue over division, understanding over anger.', theme: 'peace' },
  { id: 'pc-3', text: 'My calm presence can be a sanctuary for those around me.', theme: 'peace' },
  { id: 'pc-4', text: 'I am a bridge-builder, connecting hearts across divides.', theme: 'peace' },

  // Gratitude
  { id: 'gr-1', text: 'I am grateful for the beauty in ordinary moments.', theme: 'gratitude' },
  { id: 'gr-2', text: 'Gratitude transforms what I have into enough.', theme: 'gratitude' },
  { id: 'gr-3', text: 'I appreciate the people who enrich my life with love and support.', theme: 'gratitude' },
  { id: 'gr-4', text: 'Today I choose to focus on what is going right.', theme: 'gratitude' },

  // Connection
  { id: 'cn-1', text: 'I am part of a global family; we are more alike than different.', theme: 'connection' },
  { id: 'cn-2', text: 'Meaningful connections nourish my soul and strengthen my spirit.', theme: 'connection' },
  { id: 'cn-3', text: 'When I reach out to others, I also lift myself up.', theme: 'connection' },
  { id: 'cn-4', text: 'Shared joy is doubled; shared sorrow is halved.', theme: 'connection' },
];

export function getAllAffirmations(): Affirmation[] {
  return [...affirmations];
}

export function getAffirmationsByTheme(theme: AffirmationTheme): Affirmation[] {
  return affirmations.filter((a) => a.theme === theme);
}

export function getRandomAffirmation(theme?: AffirmationTheme): Affirmation {
  const pool = theme ? getAffirmationsByTheme(theme) : affirmations;
  if (pool.length === 0) {
    throw new Error(`No affirmations found for theme: ${theme}`);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getDailyAffirmation(): Affirmation {
  const today = new Date();
  const dayOfYear =
    Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  return affirmations[dayOfYear % affirmations.length];
}

export function getThemes(): AffirmationTheme[] {
  return [...new Set(affirmations.map((a) => a.theme))];
}
