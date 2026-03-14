/**
 * Wellness check-in — a simple self-assessment tool for tracking
 * emotional state and providing appropriate supportive responses.
 */

export interface WellnessCheckIn {
  timestamp: Date;
  mood: MoodLevel;
  feelings: string[];
  response: WellnessResponse;
}

export interface WellnessResponse {
  message: string;
  suggestions: string[];
  resourcesRecommended: boolean;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodDescriptor {
  level: MoodLevel;
  label: string;
  description: string;
}

export const moodDescriptors: MoodDescriptor[] = [
  { level: 1, label: 'Struggling', description: 'I\'m having a really hard time right now.' },
  { level: 2, label: 'Low', description: 'I\'m not feeling great, but I\'m managing.' },
  { level: 3, label: 'Okay', description: 'I\'m doing alright — not great, not bad.' },
  { level: 4, label: 'Good', description: 'I\'m feeling positive and fairly well.' },
  { level: 5, label: 'Thriving', description: 'I\'m feeling wonderful and full of energy.' },
];

const feelingWords = [
  'anxious', 'calm', 'grateful', 'lonely', 'hopeful', 'overwhelmed',
  'content', 'sad', 'energized', 'frustrated', 'peaceful', 'worried',
  'joyful', 'tired', 'connected', 'isolated', 'inspired', 'stressed',
  'loved', 'confused',
] as const;

export type FeelingWord = typeof feelingWords[number];

export function getAvailableFeelings(): readonly string[] {
  return feelingWords;
}

export function getMoodDescriptors(): MoodDescriptor[] {
  return [...moodDescriptors];
}

export function processCheckIn(mood: MoodLevel, feelings: string[]): WellnessCheckIn {
  const response = generateResponse(mood, feelings);
  return {
    timestamp: new Date(),
    mood,
    feelings: [...feelings],
    response,
  };
}

function generateResponse(mood: MoodLevel, feelings: string[]): WellnessResponse {
  if (mood <= 1) {
    return {
      message: 'Thank you for sharing how you\'re feeling. It takes courage to be honest about difficult moments. You are not alone, and support is available.',
      suggestions: [
        'Consider reaching out to a trusted friend, family member, or counselor.',
        'Try a grounding exercise to help you feel more present.',
        'Remember: this feeling is temporary, even though it may not feel that way right now.',
        'Be gentle with yourself — you deserve compassion, especially right now.',
      ],
      resourcesRecommended: true,
    };
  }

  if (mood === 2) {
    return {
      message: 'It sounds like things are tough right now, and that\'s okay. Acknowledging how you feel is an important step. Small acts of self-care can make a meaningful difference.',
      suggestions: [
        'Try a short breathing exercise to center yourself.',
        'Do something small that usually brings you comfort.',
        'Write down one thing you\'re grateful for, no matter how small.',
        feelings.includes('lonely')
          ? 'Consider reaching out to someone — even a brief connection can help.'
          : 'Give yourself permission to rest without guilt.',
      ],
      resourcesRecommended: true,
    };
  }

  if (mood === 3) {
    return {
      message: 'You\'re in a steady place — and that\'s something to appreciate. This is a great moment to build positive momentum.',
      suggestions: [
        'Try a mindfulness exercise to deepen your sense of calm.',
        'Consider doing a small act of kindness for someone today.',
        'Reflect on something that went well recently.',
        feelings.includes('stressed')
          ? 'Take a few minutes to step away and breathe.'
          : 'Set a small, achievable goal for today to build confidence.',
      ],
      resourcesRecommended: false,
    };
  }

  if (mood === 4) {
    return {
      message: 'Wonderful! It\'s great that you\'re feeling positive. This energy is a gift — consider sharing it with others.',
      suggestions: [
        'Share your positive energy with someone who might be having a harder day.',
        'Try a loving-kindness meditation to extend your good feelings outward.',
        'Write down what contributed to your good mood — these are your wellbeing anchors.',
        'Consider an act of kindness to amplify the positivity.',
      ],
      resourcesRecommended: false,
    };
  }

  // mood === 5
  return {
    message: 'You\'re thriving! What a beautiful state to be in. Your positive energy can be a powerful force for good in the world.',
    suggestions: [
      'Channel your energy into an act of kindness or service.',
      'Mentor or encourage someone who could use support.',
      'Capture this feeling in a journal — it\'s a resource for harder days.',
      'Consider how you can help build peace and understanding in your community.',
    ],
    resourcesRecommended: false,
  };
}
