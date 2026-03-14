/**
 * Mental health resources — crisis lines and support organizations.
 * These are legitimate, publicly available resources.
 */

export interface Resource {
  id: string;
  name: string;
  description: string;
  region: string;
  contactType: 'phone' | 'text' | 'chat' | 'website';
  contact: string;
  available: string;
}

const resources: Resource[] = [
  {
    id: 'r-1',
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support for people in distress and crisis resources.',
    region: 'United States',
    contactType: 'phone',
    contact: '988',
    available: '24/7',
  },
  {
    id: 'r-2',
    name: '988 Suicide & Crisis Lifeline (Text)',
    description: 'Text-based crisis support for those who prefer messaging.',
    region: 'United States',
    contactType: 'text',
    contact: 'Text HOME to 741741',
    available: '24/7',
  },
  {
    id: 'r-3',
    name: 'Samaritans',
    description: 'Emotional support for anyone in emotional distress or at risk of suicide.',
    region: 'United Kingdom',
    contactType: 'phone',
    contact: '116 123',
    available: '24/7',
  },
  {
    id: 'r-4',
    name: 'Beyond Blue',
    description: 'Mental health support and information for anxiety, depression, and suicide prevention.',
    region: 'Australia',
    contactType: 'phone',
    contact: '1300 22 4636',
    available: '24/7',
  },
  {
    id: 'r-5',
    name: 'Crisis Text Line',
    description: 'Free crisis counseling via text message.',
    region: 'United States',
    contactType: 'text',
    contact: 'Text HELLO to 741741',
    available: '24/7',
  },
  {
    id: 'r-6',
    name: 'Kids Help Phone',
    description: 'Canada\'s only 24/7 national support service for young people.',
    region: 'Canada',
    contactType: 'phone',
    contact: '1-800-668-6868',
    available: '24/7',
  },
  {
    id: 'r-7',
    name: 'BEFRIENDERS Worldwide',
    description: 'Volunteer network providing emotional support to prevent suicide worldwide.',
    region: 'International',
    contactType: 'website',
    contact: 'https://befrienders.org/find-support',
    available: 'Varies by center',
  },
  {
    id: 'r-8',
    name: 'International Association for Suicide Prevention',
    description: 'Global directory of crisis centers and prevention resources.',
    region: 'International',
    contactType: 'website',
    contact: 'https://www.iasp.info/resources/Crisis_Centres/',
    available: 'Varies by center',
  },
];

export function getAllResources(): Resource[] {
  return [...resources];
}

export function getResourcesByRegion(region: string): Resource[] {
  const normalized = region.toLowerCase();
  return resources.filter((r) => r.region.toLowerCase().includes(normalized));
}

export function getResourcesByContactType(contactType: Resource['contactType']): Resource[] {
  return resources.filter((r) => r.contactType === contactType);
}

export function getCrisisResources(): Resource[] {
  return resources.filter((r) => r.available === '24/7');
}

export function getRegions(): string[] {
  return [...new Set(resources.map((r) => r.region))];
}
