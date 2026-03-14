/**
 * Tolerance & Understanding engine — content that builds empathy,
 * celebrates diversity, and promotes cross-cultural understanding.
 */

export interface PerspectivePrompt {
  id: string;
  prompt: string;
  category: PerspectiveCategory;
  reflectionQuestions: string[];
}

export type PerspectiveCategory =
  | 'cultural-awareness'
  | 'empathy-building'
  | 'conflict-resolution'
  | 'inclusive-language'
  | 'active-listening';

const perspectivePrompts: PerspectivePrompt[] = [
  // Cultural awareness
  {
    id: 'ca-1',
    prompt: 'Think about a cultural tradition different from your own that you find beautiful or meaningful.',
    category: 'cultural-awareness',
    reflectionQuestions: [
      'What draws you to this tradition?',
      'What values does it reflect that resonate with you?',
      'How might learning about it deepen your appreciation for diversity?',
    ],
  },
  {
    id: 'ca-2',
    prompt: 'Consider how people in another part of the world greet each other. What can greetings tell us about a culture\'s values?',
    category: 'cultural-awareness',
    reflectionQuestions: [
      'What does your own greeting style communicate to others?',
      'How might you adapt your greeting to make someone from a different background feel welcome?',
      'What shared human need do all greetings fulfill?',
    ],
  },
  {
    id: 'ca-3',
    prompt: 'Food connects us across cultures. Think about a dish from a culture other than your own that you enjoy.',
    category: 'cultural-awareness',
    reflectionQuestions: [
      'What is the story or history behind this dish?',
      'How does sharing food create bridges between people?',
      'What might you learn by cooking a meal from a different tradition?',
    ],
  },

  // Empathy building
  {
    id: 'eb-1',
    prompt: 'Imagine you are meeting someone whose life experience is very different from yours. How would you approach the conversation?',
    category: 'empathy-building',
    reflectionQuestions: [
      'What assumptions might you need to set aside?',
      'What open-ended questions could help you understand their perspective?',
      'How can you show genuine interest without being intrusive?',
    ],
  },
  {
    id: 'eb-2',
    prompt: 'Think of a time when someone truly listened to you during a difficult moment. What made their listening feel supportive?',
    category: 'empathy-building',
    reflectionQuestions: [
      'What specific behaviors showed they were present with you?',
      'How did it feel to be truly heard?',
      'How can you offer that same quality of listening to others?',
    ],
  },
  {
    id: 'eb-3',
    prompt: 'Consider a group of people often misunderstood or marginalized. What might daily life look like from their perspective?',
    category: 'empathy-building',
    reflectionQuestions: [
      'What barriers might they face that you don\'t?',
      'How could you be an ally in small but meaningful ways?',
      'What would the world look like if everyone practiced this kind of empathy?',
    ],
  },

  // Conflict resolution
  {
    id: 'cr-1',
    prompt: 'Think about a recent disagreement. What might the other person have been feeling beneath their words?',
    category: 'conflict-resolution',
    reflectionQuestions: [
      'What unmet needs might have been driving their behavior?',
      'How might acknowledging those needs change the dynamic?',
      'What would a resolution look like that honors both perspectives?',
    ],
  },
  {
    id: 'cr-2',
    prompt: 'Consider the phrase "seek first to understand, then to be understood." How might applying this change your next difficult conversation?',
    category: 'conflict-resolution',
    reflectionQuestions: [
      'What does it look like to prioritize understanding over being right?',
      'How can you signal that you genuinely want to understand?',
      'What might you discover about yourself in the process?',
    ],
  },

  // Inclusive language
  {
    id: 'il-1',
    prompt: 'Words shape reality. Consider how the language you use might make someone feel included or excluded.',
    category: 'inclusive-language',
    reflectionQuestions: [
      'Are there phrases you use habitually that might unintentionally exclude someone?',
      'How can you express the same ideas in more inclusive ways?',
      'What difference could more thoughtful language make in your community?',
    ],
  },
  {
    id: 'il-2',
    prompt: 'Think about how names carry deep cultural significance. How do you respond when you encounter a name unfamiliar to you?',
    category: 'inclusive-language',
    reflectionQuestions: [
      'Do you take time to learn how to pronounce unfamiliar names correctly?',
      'What message does it send when someone makes an effort with your name?',
      'How might a small act like learning a name build trust and respect?',
    ],
  },

  // Active listening
  {
    id: 'al-1',
    prompt: 'In your next conversation, try listening without planning your response. Simply be fully present.',
    category: 'active-listening',
    reflectionQuestions: [
      'What did you notice when you weren\'t focused on responding?',
      'Did you pick up on emotions or meanings you might have otherwise missed?',
      'How did the other person respond to your full attention?',
    ],
  },
  {
    id: 'al-2',
    prompt: 'Practice reflecting back what someone tells you before adding your own perspective.',
    category: 'active-listening',
    reflectionQuestions: [
      'How did restating their words help clarify their message?',
      'Did the conversation feel different when the other person felt truly heard?',
      'How might this practice reduce misunderstandings in your life?',
    ],
  },
];

export function getAllPrompts(): PerspectivePrompt[] {
  return [...perspectivePrompts];
}

export function getPromptsByCategory(category: PerspectiveCategory): PerspectivePrompt[] {
  return perspectivePrompts.filter((p) => p.category === category);
}

export function getRandomPrompt(category?: PerspectiveCategory): PerspectivePrompt {
  const pool = category ? getPromptsByCategory(category) : perspectivePrompts;
  if (pool.length === 0) {
    throw new Error(`No prompts found for category: ${category}`);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getDailyPrompt(): PerspectivePrompt {
  const today = new Date();
  const dayOfYear =
    Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  return perspectivePrompts[dayOfYear % perspectivePrompts.length];
}

export function getCategories(): PerspectiveCategory[] {
  return [...new Set(perspectivePrompts.map((p) => p.category))];
}
