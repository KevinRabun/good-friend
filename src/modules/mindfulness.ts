/**
 * Mindfulness engine — guided exercises for grounding,
 * breathing, meditation, and emotional regulation.
 */

export interface MindfulnessExercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  durationMinutes: number;
  steps: string[];
  benefit: string;
}

export type ExerciseCategory =
  | 'breathing'
  | 'grounding'
  | 'meditation'
  | 'body-scan'
  | 'loving-kindness'
  | 'gratitude-practice';

const exercises: MindfulnessExercise[] = [
  {
    id: 'br-1',
    title: '4-7-8 Breathing',
    category: 'breathing',
    durationMinutes: 3,
    steps: [
      'Find a comfortable seated position and close your eyes.',
      'Breathe in quietly through your nose for 4 seconds.',
      'Hold your breath gently for 7 seconds.',
      'Exhale completely through your mouth for 8 seconds, making a gentle whoosh sound.',
      'Repeat this cycle 4 times.',
      'Notice how your body feels calmer with each cycle.',
    ],
    benefit: 'Activates the parasympathetic nervous system, reducing anxiety and promoting calm.',
  },
  {
    id: 'br-2',
    title: 'Box Breathing',
    category: 'breathing',
    durationMinutes: 4,
    steps: [
      'Sit upright in a comfortable position.',
      'Slowly exhale all your air out.',
      'Breathe in through your nose for 4 seconds.',
      'Hold your breath for 4 seconds.',
      'Exhale through your mouth for 4 seconds.',
      'Hold the exhale for 4 seconds.',
      'Repeat for 4 minutes.',
    ],
    benefit: 'Helps regulate the stress response and improve focus and concentration.',
  },
  {
    id: 'gr-1',
    title: '5-4-3-2-1 Grounding',
    category: 'grounding',
    durationMinutes: 5,
    steps: [
      'Pause and take a deep breath.',
      'Name 5 things you can SEE around you.',
      'Name 4 things you can TOUCH or feel.',
      'Name 3 things you can HEAR.',
      'Name 2 things you can SMELL.',
      'Name 1 thing you can TASTE.',
      'Take another deep breath and notice how present you feel.',
    ],
    benefit: 'Brings awareness back to the present moment, especially helpful during anxiety or overwhelm.',
  },
  {
    id: 'md-1',
    title: 'Peaceful Place Visualization',
    category: 'meditation',
    durationMinutes: 10,
    steps: [
      'Close your eyes and take three slow, deep breaths.',
      'Imagine a place where you feel completely safe and at peace.',
      'Notice the colors, textures, and light in this place.',
      'Listen to the sounds — perhaps waves, birdsong, or gentle wind.',
      'Feel the warmth and comfort surrounding you.',
      'Stay here for several minutes, breathing naturally.',
      'When ready, slowly bring your awareness back to the room.',
    ],
    benefit: 'Creates a mental refuge that can be accessed anytime for stress relief and emotional regulation.',
  },
  {
    id: 'bs-1',
    title: 'Progressive Body Scan',
    category: 'body-scan',
    durationMinutes: 15,
    steps: [
      'Lie down or sit comfortably. Close your eyes.',
      'Bring attention to your toes. Notice any sensations without judgment.',
      'Slowly move your awareness up through your feet and ankles.',
      'Continue through your legs, hips, and lower back.',
      'Notice your abdomen rising and falling with each breath.',
      'Move through your chest, shoulders, and down each arm.',
      'Bring awareness to your neck, face, and the top of your head.',
      'Take a full breath and appreciate your body for carrying you through life.',
    ],
    benefit: 'Releases physical tension stored in the body and deepens body-mind awareness.',
  },
  {
    id: 'lk-1',
    title: 'Loving-Kindness Meditation',
    category: 'loving-kindness',
    durationMinutes: 10,
    steps: [
      'Sit comfortably and close your eyes.',
      'Begin by directing kindness toward yourself: "May I be happy. May I be healthy. May I be safe. May I live with ease."',
      'Think of someone you love. Direct the same wishes to them.',
      'Think of a neutral person — perhaps a neighbor or colleague. Extend these wishes to them.',
      'Think of someone you find difficult. With courage, extend these wishes to them too.',
      'Finally, extend loving-kindness to all beings everywhere: "May all beings be happy. May all beings be at peace."',
      'Sit with this expansive feeling of care for a few moments.',
    ],
    benefit: 'Builds empathy, reduces bias, and strengthens feelings of connection across all people.',
  },
  {
    id: 'gp-1',
    title: 'Gratitude Reflection',
    category: 'gratitude-practice',
    durationMinutes: 5,
    steps: [
      'Find a quiet moment and take three calming breaths.',
      'Think of three things that went well today, no matter how small.',
      'For each one, reflect on why it happened and how it made you feel.',
      'Think of one person who positively impacted your day.',
      'Consider how you might express your gratitude to them.',
      'Close by silently thanking yourself for taking this time.',
    ],
    benefit: 'Shifts focus from scarcity to abundance, improving overall wellbeing and life satisfaction.',
  },
];

export function getAllExercises(): MindfulnessExercise[] {
  return [...exercises];
}

export function getExercisesByCategory(category: ExerciseCategory): MindfulnessExercise[] {
  return exercises.filter((e) => e.category === category);
}

export function getExerciseById(id: string): MindfulnessExercise | undefined {
  return exercises.find((e) => e.id === id);
}

export function getRandomExercise(category?: ExerciseCategory): MindfulnessExercise {
  const pool = category ? getExercisesByCategory(category) : exercises;
  if (pool.length === 0) {
    throw new Error(`No exercises found for category: ${category}`);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getExercisesByMaxDuration(maxMinutes: number): MindfulnessExercise[] {
  return exercises.filter((e) => e.durationMinutes <= maxMinutes);
}

export function getCategories(): ExerciseCategory[] {
  return [...new Set(exercises.map((e) => e.category))];
}
