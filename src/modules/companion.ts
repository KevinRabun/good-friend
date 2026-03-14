/**
 * Companion Guide — an interactive guided conversation system
 * that walks users through themed reflection journeys for
 * mental health, empathy, and personal growth.
 */

export interface GuidedJourney {
  id: string;
  title: string;
  purpose: string;
  theme: JourneyTheme;
  steps: JourneyStep[];
}

export interface JourneyStep {
  stepNumber: number;
  instruction: string;
  prompt: string;
  followUp: string;
}

export type JourneyTheme =
  | 'self-compassion'
  | 'empathy-exploration'
  | 'gratitude-deepening'
  | 'conflict-healing'
  | 'global-connection'
  | 'inner-peace';

const journeys: GuidedJourney[] = [
  {
    id: 'gj-1',
    title: 'The Self-Compassion Journey',
    purpose: 'Learn to treat yourself with the same kindness you offer others.',
    theme: 'self-compassion',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Find a quiet, comfortable place. Take three slow breaths.',
        prompt: 'Think of something you\'ve been critical of yourself about recently. What words do you use when talking to yourself about it?',
        followUp: 'Now imagine a close friend told you the same thing about themselves. What would you say to them? Notice the difference in tone.',
      },
      {
        stepNumber: 2,
        instruction: 'Place your hand over your heart and feel its warmth.',
        prompt: 'Can you extend that same warmth and understanding to yourself right now?',
        followUp: 'Repeat gently: "I am doing my best, and that is enough." Let this settle in your body.',
      },
      {
        stepNumber: 3,
        instruction: 'Write down or mentally note one kind thing you can do for yourself today.',
        prompt: 'What is one small act of care you deserve today?',
        followUp: 'Commit to this act. You are worthy of your own kindness.',
      },
    ],
  },
  {
    id: 'gj-2',
    title: 'Walking in Another\'s Shoes',
    purpose: 'Build empathy by deeply considering another person\'s experience.',
    theme: 'empathy-exploration',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Think of someone whose life is significantly different from yours.',
        prompt: 'What might their morning routine look like? What challenges might they face before the day even begins?',
        followUp: 'Consider: what assumptions did you make? Were any of them based on stereotypes rather than understanding?',
      },
      {
        stepNumber: 2,
        instruction: 'Now imagine a moment of joy in their life.',
        prompt: 'What might bring them happiness? What might they celebrate?',
        followUp: 'Notice how focusing on shared human experiences — joy, love, hope — creates connection across difference.',
      },
      {
        stepNumber: 3,
        instruction: 'Think about what you could learn from this person.',
        prompt: 'What perspective or wisdom might they offer that you haven\'t considered?',
        followUp: 'Every person we meet knows something we don\'t. Approaching others with this humility opens doors to understanding.',
      },
    ],
  },
  {
    id: 'gj-3',
    title: 'The Gratitude Spiral',
    purpose: 'Deepen your gratitude practice from surface to soul.',
    theme: 'gratitude-deepening',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Start with something simple you\'re grateful for today.',
        prompt: 'Name one ordinary thing that made your day a little better.',
        followUp: 'Now go deeper — why does this matter to you? What would your day be like without it?',
      },
      {
        stepNumber: 2,
        instruction: 'Think about a person who has positively influenced your life.',
        prompt: 'What specific quality or action of theirs are you most grateful for?',
        followUp: 'Consider reaching out to them to express this gratitude. It could transform both your days.',
      },
      {
        stepNumber: 3,
        instruction: 'Expand your gratitude outward to the broader world.',
        prompt: 'What is something in your community or the world that you\'re grateful for?',
        followUp: 'Gratitude for our shared world fosters stewardship, connection, and peace.',
      },
    ],
  },
  {
    id: 'gj-4',
    title: 'Healing a Conflict',
    purpose: 'Work through a disagreement with understanding and compassion.',
    theme: 'conflict-healing',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Think of a recent conflict or tension with someone.',
        prompt: 'Without judging, what were you feeling during the conflict? Name the emotions.',
        followUp: 'Naming emotions takes away some of their power. You\'re already showing courage by examining this.',
      },
      {
        stepNumber: 2,
        instruction: 'Now shift perspective. Try to see the situation from the other person\'s point of view.',
        prompt: 'What might they have been feeling? What need of theirs wasn\'t being met?',
        followUp: 'You don\'t have to agree with them to understand them. Understanding is not surrender — it\'s wisdom.',
      },
      {
        stepNumber: 3,
        instruction: 'Imagine a conversation where both people feel heard.',
        prompt: 'What would you want to say? What would you want to hear from them?',
        followUp: 'Peace often starts with the willingness to listen. Consider whether this is a conversation you might gently open.',
      },
    ],
  },
  {
    id: 'gj-5',
    title: 'Our Shared Humanity',
    purpose: 'Connect with the global human family through reflection.',
    theme: 'global-connection',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Close your eyes and imagine people around the world at this very moment.',
        prompt: 'Someone is watching a sunrise. Someone is tucking a child into bed. Someone is laughing with friends. What connects all these moments?',
        followUp: 'Across every culture and continent, we share the same fundamental needs: love, safety, belonging, and purpose.',
      },
      {
        stepNumber: 2,
        instruction: 'Think about a global challenge that concerns you.',
        prompt: 'How does this challenge affect people in different parts of the world? How does it connect you to them?',
        followUp: 'Shared challenges can be catalysts for shared compassion. Your concern itself is a form of connection.',
      },
      {
        stepNumber: 3,
        instruction: 'Envision one small action you could take that ripples outward.',
        prompt: 'What could you do this week that contributes, even in a tiny way, to a more peaceful and connected world?',
        followUp: 'Every great change began with a single person deciding to care. You are part of something larger than yourself.',
      },
    ],
  },
  {
    id: 'gj-6',
    title: 'Finding Inner Peace',
    purpose: 'Cultivate a sense of deep calm and acceptance within yourself.',
    theme: 'inner-peace',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sit comfortably. Let your shoulders drop. Soften your jaw.',
        prompt: 'What is weighing on your mind right now? Name it without trying to solve it.',
        followUp: 'Simply acknowledging your burden, without the pressure to fix it, is itself an act of peace.',
      },
      {
        stepNumber: 2,
        instruction: 'Breathe slowly. With each exhale, imagine releasing one piece of tension.',
        prompt: 'What would it feel like to fully accept this moment exactly as it is — without wanting it to be different?',
        followUp: 'Acceptance doesn\'t mean giving up. It means making peace with now, so you can move forward with clarity.',
      },
      {
        stepNumber: 3,
        instruction: 'Visualize yourself as a calm lake. Thoughts are ripples, but the depths remain still.',
        prompt: 'What one thing can you let go of today to create more space for peace in your life?',
        followUp: 'You carry peace within you. It\'s always accessible, even in storms. Thank yourself for taking this time.',
      },
    ],
  },
];

export function getAllJourneys(): GuidedJourney[] {
  return journeys.map((j) => ({ ...j, steps: [...j.steps] }));
}

export function getJourneyById(id: string): GuidedJourney | undefined {
  const journey = journeys.find((j) => j.id === id);
  if (!journey) return undefined;
  return { ...journey, steps: [...journey.steps] };
}

export function getJourneysByTheme(theme: JourneyTheme): GuidedJourney[] {
  return journeys.filter((j) => j.theme === theme).map((j) => ({ ...j, steps: [...j.steps] }));
}

export function getJourneyStep(journeyId: string, stepNumber: number): JourneyStep | undefined {
  const journey = journeys.find((j) => j.id === journeyId);
  if (!journey) return undefined;
  return journey.steps.find((s) => s.stepNumber === stepNumber);
}

export function getJourneyThemes(): JourneyTheme[] {
  return [...new Set(journeys.map((j) => j.theme))];
}

export function getRandomJourney(theme?: JourneyTheme): GuidedJourney {
  const pool = theme ? journeys.filter((j) => j.theme === theme) : journeys;
  if (pool.length === 0) {
    throw new Error(`No journeys found for theme: ${theme}`);
  }
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return { ...picked, steps: [...picked.steps] };
}
