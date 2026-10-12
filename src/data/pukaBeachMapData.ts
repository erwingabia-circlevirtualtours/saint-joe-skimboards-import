export interface PukaMapLocation {
  id: string;
  name: string;
  subName?: string;
  category: 'Key Locations at Puka Beach (Aqua)';
  categoryColor: string; // aqua
  coordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number }; // Percentage position on the visual Boracay map canvas (x: 0-100%, y: 0-100%)
  description: string;
  highlights: string[];
  type: 'shorebreak' | 'beach' | 'sign' | 'parking';
}

export const PUKA_BEACH_LOCATIONS: PukaMapLocation[] = [
  {
    id: 'puka-beach-main',
    name: 'Puka Beach',
    subName: 'Main Shorebreak & Skimboarding Arena',
    category: 'Key Locations at Puka Beach (Aqua)',
    categoryColor: '#06b6d4', // cyan-500 / aqua
    coordinates: { lat: 11.9961, lng: 121.9167 },
    mapPosition: { x: 50, y: 38 },
    description:
      'The central shore-break zone where incoming waves hit the steep sand ledge. Favored by skimboarders and bodyboarders for rapid acceleration, powerful pocket wraps, and deep azure water runouts.',
    highlights: ['Steep wave ledge', 'Deep azure drop-off', 'Shorebreak launch zone', 'Fast sand glides'],
    type: 'shorebreak',
  },
  {
    id: 'yapak-beach-puka',
    name: 'Yapak Beach (Puka Shell Beach)',
    subName: 'Official Geographic Designation • Northern Shell Strand',
    category: 'Key Locations at Puka Beach (Aqua)',
    categoryColor: '#06b6d4',
    coordinates: { lat: 11.9975, lng: 121.9152 },
    mapPosition: { x: 32, y: 30 },
    description:
      'Boracay’s famous, uncommercialized paradise on the northern tip of the island. Named after the abundant naturally crushed Puka shells mixed into its coarse sands, offering an authentic, wild tropical coastline.',
    highlights: ['Crushed Puka shell sand', 'Wild untamed coastline', 'No mega resorts', 'Intimate atmosphere'],
    type: 'beach',
  },
  {
    id: 'puka-beach-sign',
    name: 'Puka Beach Sign',
    subName: 'Iconic Driftwood Landmark & Coconut Shacks',
    category: 'Key Locations at Puka Beach (Aqua)',
    categoryColor: '#06b6d4',
    coordinates: { lat: 11.9953, lng: 121.9179 },
    mapPosition: { x: 68, y: 46 },
    description:
      'The famed hand-crafted rustic driftwood and bamboo marker framing the entrance under lush palm canopies, surrounded by local shacks serving fresh coconuts and fruit shakes.',
    highlights: ['Driftwood photo marker', 'Lush palm canopy shade', 'Fresh coconut shacks', 'Local woodcrafts'],
    type: 'sign',
  },
  {
    id: 'puka-beach-parking',
    name: 'Puka Beach Parking Area',
    subName: 'E-Trike Terminal & Island Arrival Hub',
    category: 'Key Locations at Puka Beach (Aqua)',
    categoryColor: '#06b6d4',
    coordinates: { lat: 11.9942, lng: 121.9192 },
    mapPosition: { x: 80, y: 68 },
    description:
      'The primary land arrival gate and turnaround for public and private e-trikes, scooters, and island sightseeing shuttles from Central Boracay.',
    highlights: ['E-Trike turnaround', '15-20 min from White Beach', 'Charter pick-up point', 'Entrance pathway'],
    type: 'parking',
  },
];

export const PUKA_BEACH_CONTEXT = {
  overview:
    'Puka Beach (officially known as Yapak Beach) is Boracay’s famous, uncommercialized paradise located on the northern tip of the island. Named after the abundant, naturally crushed Puka shells mixed into its sands, it offers a dramatic contrast to the hyper-developed White Beach. If you want a wilder, more raw tropical atmosphere with deep blue waters and rustic beach shacks, this is the place to go.',
  sandAndWater:
    'Unlike the powder-soft sand of White Beach, the sand here is coarser and textured with small shells. The water drops off very quickly into a deep, intense azure blue, creating stronger currents and fun shore-breaks that are popular with bodyboarders and skimboarders.',
  vibe:
    'There are no massive resorts, concrete hotels, or loud beachfront bars. Instead, you will find locally run wooden shacks selling fresh coconuts, fruit shakes, and hand-carved souvenirs under the shade of lush palm trees.',
  sunset:
    'Because it faces north-northwest, it offers a stunning, unobstructed sunset view that feels much more intimate and peaceful than the crowded sunset watch at White Beach.',
  travelTime: '15 to 20 minutes away from White Beach',
  transportRoutes: [
    {
      mode: 'E-Trike (Public or Private)',
      icon: '⚡',
      fare: '₱150 to ₱250 one-way',
      description: 'You can hail a public e-trike heading north, or charter a private ride for around ₱150 to ₱250 one-way from Central Boracay.',
    },
    {
      mode: 'Island Hopping Boat',
      icon: '⛵',
      fare: 'Included in standard tour',
      description: 'Most standard motorized outrigger (bangka) day tours include a 30-to-45-minute stop at Puka Beach, anchoring right off the shore.',
    },
    {
      mode: 'Land Tour / Scooter',
      icon: '🛵',
      fare: 'Daily rental or tricycle rate',
      description: "If you rent a scooter or hire a land-tour tricycle to explore the island's viewpoints, Puka Beach is usually the final destination.",
    },
  ],
  tips: [
    {
      title: 'Bring Cash',
      icon: '💵',
      desc: 'There are no ATMs here, and the local vendors and rustic shacks do not accept credit cards or e-wallets.',
    },
    {
      title: 'Watch the Waves',
      icon: '🌊',
      desc: 'Because the shoreline drops off steeply, the waves can pull hard. Keep a close eye on children, and be cautious if you are not a strong swimmer.',
    },
    {
      title: 'Footwear Helps',
      icon: '🩴',
      desc: 'If you have sensitive feet, bring a pair of flip-flops or water shoes, as walking on the shell-mixed sand can get hot and prickly in the afternoon sun.',
    },
  ],
};
