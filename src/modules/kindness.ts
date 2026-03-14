/**
 * Kindness engine — acts of kindness suggestions to build
 * a more compassionate and peaceful community.
 */

export interface KindnessAct {
  id: string;
  suggestion: string;
  scope: KindnessScope;
  effortLevel: 'small' | 'medium' | 'large';
  impact: string;
}

export type KindnessScope = 'self' | 'family' | 'community' | 'global';

const kindnessActs: KindnessAct[] = [
  // Self
  { id: 'ks-1', suggestion: 'Write yourself a letter of encouragement to read on a difficult day.', scope: 'self', effortLevel: 'small', impact: 'Builds self-compassion and emotional resilience.' },
  { id: 'ks-2', suggestion: 'Take a walk in nature without your phone and simply notice the beauty around you.', scope: 'self', effortLevel: 'small', impact: 'Reconnects you with the present moment and reduces stress.' },
  { id: 'ks-3', suggestion: 'Prepare a nourishing meal for yourself as an act of self-care.', scope: 'self', effortLevel: 'medium', impact: 'Reinforces that you are worth caring for.' },

  // Family
  { id: 'kf-1', suggestion: 'Tell a family member something specific you appreciate about them.', scope: 'family', effortLevel: 'small', impact: 'Strengthens bonds and makes loved ones feel valued.' },
  { id: 'kf-2', suggestion: 'Listen to an older relative share a story from their past without interrupting.', scope: 'family', effortLevel: 'small', impact: 'Preserves family history and shows respect across generations.' },
  { id: 'kf-3', suggestion: 'Plan a device-free evening with your family focused on conversation and togetherness.', scope: 'family', effortLevel: 'medium', impact: 'Deepens connection and creates lasting memories.' },

  // Community
  { id: 'kc-1', suggestion: 'Leave a kind, specific compliment for a local business online.', scope: 'community', effortLevel: 'small', impact: 'Supports local livelihoods and spreads positivity.' },
  { id: 'kc-2', suggestion: 'Introduce yourself to a neighbor you haven\'t met yet.', scope: 'community', effortLevel: 'small', impact: 'Builds community cohesion and reduces isolation.' },
  { id: 'kc-3', suggestion: 'Volunteer an hour of your time to a local organization that helps those in need.', scope: 'community', effortLevel: 'medium', impact: 'Directly improves lives and strengthens the social fabric.' },
  { id: 'kc-4', suggestion: 'Organize a neighborhood cleanup or beautification project.', scope: 'community', effortLevel: 'large', impact: 'Creates shared pride in community spaces and brings people together.' },

  // Global
  { id: 'kg-1', suggestion: 'Learn three phrases in a language you don\'t speak and use them to greet someone.', scope: 'global', effortLevel: 'small', impact: 'Shows respect for other cultures and builds bridges of understanding.' },
  { id: 'kg-2', suggestion: 'Share a story or article that highlights the positive contributions of a culture different from your own.', scope: 'global', effortLevel: 'small', impact: 'Counters negative stereotypes and broadens perspectives.' },
  { id: 'kg-3', suggestion: 'Support a fair-trade product or artisan from another country.', scope: 'global', effortLevel: 'medium', impact: 'Promotes economic justice and global solidarity.' },
  { id: 'kg-4', suggestion: 'Write a letter of support to someone working for peace or human rights in another country.', scope: 'global', effortLevel: 'medium', impact: 'Encourages those on the front lines of building a better world.' },
];

export function getAllKindnessActs(): KindnessAct[] {
  return [...kindnessActs];
}

export function getKindnessActsByScope(scope: KindnessScope): KindnessAct[] {
  return kindnessActs.filter((k) => k.scope === scope);
}

export function getKindnessActsByEffort(effortLevel: KindnessAct['effortLevel']): KindnessAct[] {
  return kindnessActs.filter((k) => k.effortLevel === effortLevel);
}

export function getRandomKindnessAct(scope?: KindnessScope): KindnessAct {
  const pool = scope ? getKindnessActsByScope(scope) : kindnessActs;
  if (pool.length === 0) {
    throw new Error(`No kindness acts found for scope: ${scope}`);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getDailyKindnessAct(): KindnessAct {
  const today = new Date();
  const dayOfYear =
    Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  return kindnessActs[dayOfYear % kindnessActs.length];
}

export function getScopes(): KindnessScope[] {
  return [...new Set(kindnessActs.map((k) => k.scope))];
}
