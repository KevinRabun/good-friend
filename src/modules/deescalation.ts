/**
 * Conflict De-escalation Guide — step-by-step guidance for
 * navigating tense situations with calm, empathy, and respect.
 */

export interface DeescalationStrategy {
  id: string;
  title: string;
  situation: string;
  steps: string[];
  phrases: string[];
  avoidPhrases: string[];
  principle: string;
}

const strategies: DeescalationStrategy[] = [
  {
    id: 'de-1',
    title: 'The PAUSE Method',
    situation: 'You feel anger rising during a disagreement.',
    steps: [
      'P — Pause. Stop before reacting. Take a breath.',
      'A — Acknowledge. Name what you\'re feeling ("I notice I\'m feeling frustrated.").',
      'U — Understand. Ask yourself: what is the other person feeling or needing?',
      'S — Speak. Choose words that express your needs without blaming.',
      'E — Evaluate. After the conversation, reflect on what went well and what you\'d do differently.',
    ],
    phrases: [
      '"I need a moment to collect my thoughts."',
      '"I want to understand your perspective."',
      '"Let me make sure I understand what you\'re saying."',
      '"I feel [emotion] when [situation]. What I need is [need]."',
    ],
    avoidPhrases: [
      '"You always..." or "You never..."',
      '"That\'s ridiculous."',
      '"You\'re wrong."',
      '"Calm down." (this often escalates)',
    ],
    principle: 'Responding beats reacting. A few seconds of pause can change the entire outcome.',
  },
  {
    id: 'de-2',
    title: 'Bridge Building',
    situation: 'Two people hold opposing views and tension is rising.',
    steps: [
      'Acknowledge that both perspectives have value: "I can see this matters to both of us."',
      'Find common ground: identify a shared value, goal, or concern.',
      'Reframe from "me vs. you" to "us vs. the problem."',
      'Ask if you can explore the issue together rather than debate it.',
      'Summarize areas of agreement before addressing differences.',
    ],
    phrases: [
      '"We both care about [shared value]. Let\'s start there."',
      '"What would a solution look like that works for both of us?"',
      '"I respect that you see it differently. Help me understand why."',
      '"We don\'t have to agree on everything to move forward together."',
    ],
    avoidPhrases: [
      '"You just don\'t get it."',
      '"That\'s not how it works."',
      '"You\'re being unreasonable."',
      '"If you actually listened..."',
    ],
    principle: 'The goal isn\'t to win — it\'s to understand and find a path forward together.',
  },
  {
    id: 'de-3',
    title: 'The Empathy Reset',
    situation: 'Someone is upset with you and you feel defensive.',
    steps: [
      'Resist the urge to defend yourself immediately.',
      'Listen fully — let them express their feelings without interruption.',
      'Reflect back what you heard: "It sounds like you\'re feeling..."',
      'Validate their feelings even if you see things differently: "I can understand why that would be upsetting."',
      'Express your own perspective gently after they feel heard.',
    ],
    phrases: [
      '"Thank you for telling me how you feel."',
      '"I didn\'t realize this affected you that way."',
      '"Your feelings make sense given your experience."',
      '"I\'m sorry for my part in this."',
    ],
    avoidPhrases: [
      '"But I didn\'t mean it that way."',
      '"You\'re overreacting."',
      '"That\'s not what happened."',
      '"You shouldn\'t feel that way."',
    ],
    principle: 'When people feel heard, they become more willing to hear you.',
  },
  {
    id: 'de-4',
    title: 'Cooling Down Together',
    situation: 'A conversation has become too heated to be productive.',
    steps: [
      'Recognize when the conversation is no longer constructive.',
      'Propose a break with care, not dismissal: name a specific time to return.',
      'During the break, do something calming — walk, breathe, drink water.',
      'Reflect on what you actually need from this conversation.',
      'Return with a fresh start and lead with curiosity, not frustration.',
    ],
    phrases: [
      '"This conversation matters to me. Can we take 15 minutes and come back to it?"',
      '"I want to give this the attention it deserves, and I\'m not in the right headspace right now."',
      '"Let\'s come back to this when we can both listen at our best."',
    ],
    avoidPhrases: [
      '"I\'m done talking about this."',
      '"Whatever."',
      '"Fine."',
      '"Talk to me when you\'ve calmed down."',
    ],
    principle: 'Taking a break is not giving up — it\'s giving the conversation room to breathe.',
  },
  {
    id: 'de-5',
    title: 'Cross-Cultural Misunderstanding',
    situation: 'A cultural difference has caused confusion or offense.',
    steps: [
      'Approach with genuine curiosity, not assumptions.',
      'Ask open questions: "Can you help me understand...?"',
      'Share your own cultural context: "In my experience, this means..."',
      'Apologize sincerely if you\'ve unintentionally caused offense.',
      'Express appreciation for the learning opportunity.',
    ],
    phrases: [
      '"I realize I may have misunderstood something cultural. Can you help me learn?"',
      '"I didn\'t intend any disrespect. I\'d like to understand better."',
      '"Thank you for your patience in explaining this to me."',
      '"I appreciate you sharing your perspective."',
    ],
    avoidPhrases: [
      '"That\'s weird."',
      '"Where I\'m from, we don\'t do that."',
      '"You\'re too sensitive about cultural stuff."',
      '"It\'s not a big deal."',
    ],
    principle: 'Cultural humility means always being willing to learn, and never assuming your way is the only way.',
  },
];

export function getAllStrategies(): DeescalationStrategy[] {
  return strategies.map((s) => ({ ...s, steps: [...s.steps], phrases: [...s.phrases], avoidPhrases: [...s.avoidPhrases] }));
}

export function getStrategyById(id: string): DeescalationStrategy | undefined {
  const s = strategies.find((s) => s.id === id);
  if (!s) return undefined;
  return { ...s, steps: [...s.steps], phrases: [...s.phrases], avoidPhrases: [...s.avoidPhrases] };
}

export function getRandomStrategy(): DeescalationStrategy {
  const s = strategies[Math.floor(Math.random() * strategies.length)];
  return { ...s, steps: [...s.steps], phrases: [...s.phrases], avoidPhrases: [...s.avoidPhrases] };
}

export function getQuickPhrase(): string {
  const allPhrases = strategies.flatMap((s) => s.phrases);
  return allPhrases[Math.floor(Math.random() * allPhrases.length)];
}

export function getStrategyCount(): number {
  return strategies.length;
}
