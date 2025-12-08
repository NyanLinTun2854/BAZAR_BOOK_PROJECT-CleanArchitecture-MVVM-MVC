// src/features/Authentication/types/OnboardingData.ts

export interface OnboardingItemType {
  id: number;
  title: string;
  description: string;
  color: string;
  // Add image properties here
}

export const OnboardingData: OnboardingItemType[] = [
  {
    id: 1,
    title: 'Now reading books will be easier',
    description:
      'Discover new worlds, join a vibrant reading community. Start your reading adventure effortlessly with us.',
    color: '#FFFFFF',
  },
  {
    id: 2,
    title: 'Your Bookish Soulmate Awaits',
    description:
      'Let us be your guide to the perfect read. Discover books tailored to your tastes for a truly rewarding experience.',
    color: '#FFFFFF',
  },
  {
    id: 3,
    title: 'Start Your Adventure',
    description:
      "Ready to embark on a quest for inspiration and knowledge? Your adventure begins now. Let's go!",
    color: '#FFFFFF',
  },
];
