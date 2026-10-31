export interface PodiumWinner {
  name: string;
  handle: string;
  placement: string;
  boardModel: string;
  details: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  date: string;
  eventDates: string;
  location: string;
  author: string;
  readTime: string;
  coverImage: string;
  galleryImages: {
    url: string;
    caption: string;
    alt: string;
  }[];
  podium: PodiumWinner[];
  leadParagraph: string;
  sections: {
    heading: string;
    body: string[];
    quote?: {
      text: string;
      author: string;
      role: string;
    };
  }[];
  gearUsed: {
    name: string;
    type: string;
    price: number;
    description: string;
    category: 'carbon' | 'foamy';
  }[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'one-drop-slide-zambales-2026',
    slug: 'one-drop-slide-zambales-2026',
    title: 'Saint Joe Team Sweeps 1st, 2nd, and 3rd at One Drop Slide Open Category Zambales',
    subtitle: 'Absolute podium lockout at Brgy. Pundaquit: Ding Fariñas takes Champion, Macoy Racil 1st Runner Up, and Mark Racosa 2nd Runner Up—all riding handcrafted Saint Joe Skimboards.',
    badge: 'Competition Victory • Podium Sweep',
    date: 'October 18, 2026',
    eventDates: 'October 16–17, 2026',
    location: 'Brgy. Pundaquit, San Antonio, Zambales',
    author: 'Saint Joe Skimboards Field Report',
    readTime: '3 min read',
    coverImage: '/onedropslide_blog.jpg',
    galleryImages: [
      {
        url: '/onedropslide_blog.jpg',
        caption: 'Official Event Poster: One Drop Slide Open Category Skimboard Competition in Brgy. Pundaquit, San Antonio, Zambales (October 16–17, 2026).',
        alt: 'One Drop Slide Skimboard Competition Official Poster'
      },
      {
        url: '/onedropslide.jpg',
        caption: 'The boys repping Saint Joe Skimboards on the volcanic sandbar of Pundaquit with their custom carbon weapons.',
        alt: 'Saint Joe team riders with skimboards at Pundaquit Beach'
      },
      {
        url: '/src/assets/images/onedrop_podium_1792336245104.jpg',
        caption: 'Podium Lockout: Champion @dingfarinas (center), 1st Runner Up @macoy_racil (left), and 2nd Runner Up @mark_racosa (right).',
        alt: 'Awarding ceremony with podium trophies'
      }
    ],
    podium: [
      {
        name: 'Ding Fariñas',
        handle: '@dingfarinas',
        placement: 'CHAMPION',
        boardModel: 'Saint Joe Custom Double Carbon Pintail',
        details: 'Dominant heat runs with high-speed wrap recoveries and smooth frontside carves in Pundaquit’s steep dumping shorebreak.'
      },
      {
        name: 'Macoy Racil',
        handle: '@macoy_racil',
        placement: '1ST RUNNER UP',
        boardModel: 'Saint Joe Carbon Apex Custom',
        details: 'Relentless power and critical lip snaps across the outer sandbar reef edge to lock in 2nd place overall.'
      },
      {
        name: 'Mark Racosa',
        handle: '@mark_racosa',
        placement: '2ND RUNNER UP',
        boardModel: 'Saint Joe Custom Speed Fish Carbon',
        details: 'Flawless wave selection and explosive barrel tucks on the shorewash line to round out the historic Saint Joe podium sweep.'
      }
    ],
    leadParagraph: 'A historic weekend on the Zambales coast: Saint Joe Skimboards riders took over the podium at the prestigious One Drop Slide Open Category Skimboard Competition held on October 16–17, 2026, in Barangay Pundaquit, San Antonio, Zambales. Riding custom handcrafted Saint Joe carbon boards, team riders @dingfarinas, @macoy_racil, and @mark_racosa claimed 1st, 2nd, and 3rd place in a complete clean sweep of Class A.',
    sections: [
      {
        heading: 'Pundaquit Shorebreak: Pure Power and Testing Ground',
        body: [
          'Brgy. Pundaquit is celebrated across the Philippine wave community as the launchpad to Anawangin and the home of the famed "Magic Left." Its heavy volcanic black sandbars and pitching, heavy shorebreak create an uncompromising arena where boards are pushed to their absolute flex and strength limits.',
          'Over two days of non-stop action, the shorebreak delivered crisp, fast-peeling wedges that tested every competitor’s sprint speed, board drop timing, and rail hold. In the Open Category Class A—the most competitive bracket of the tournament—the Saint Joe team demonstrated total command from the opening heats to the grand finals.'
        ]
      },
      {
        heading: 'The Podium Lockout: Champion & Runners Up',
        body: [
          'Ding Fariñas (@dingfarinas) set the pace early in the finals, connecting steep outer waves with seamless drop-knee wraps and clean sandbar slides to claim the undisputed Champion trophy.',
          'Macoy Racil (@macoy_racil) brought razor-sharp precision to each heat, pushing heavy lip lines to secure 1st Runner Up honors.',
          'Mark Racosa (@mark_racosa) delivered technical mastery on every incoming set, locking in 2nd Runner Up to complete the 1-2-3 podium lockout for Saint Joe Skimboards.'
        ],
        quote: {
          text: 'Every single rider on the Class A podium was on a Saint Joe board. Seeing the Leyte craftsmanship hold up and dominate on heavy Zambales shorebreak waves is what our workshop lives for.',
          author: 'Saint Joe Shaping Bay',
          role: 'Tacloban City, Leyte'
        }
      },
      {
        heading: 'Handcrafted in Leyte, Proven in Competition',
        body: [
          'All three podium finishers rode Saint Joe custom carbon layups shaped in our Tacloban City factory. Engineered with high-density aerospace foam cores, vacuum-infused Toray 3K carbon fiber, and calibrated rocker profiles, these boards provided the exact stiffness and hydrodynamic glide needed to transfer across deep water into heavy shorebreak pockets.',
          'Congratulations to Ding (@dingfarinas), Macoy (@macoy_racil), Mark (@mark_racosa), and the entire Zambales skimboarding community, organizers, and sponsors who made One Drop Slide 2026 an unforgettable celebration of grassroots Philippine surf culture.'
        ]
      }
    ],
    gearUsed: [
      {
        name: 'Saint Joe Double Carbon Pintail',
        type: 'Toray 3K Double Carbon • Competition Pintail',
        price: 220,
        description: 'The weapon of choice for Champion @dingfarinas. Engineered for hold in hollow waves, extreme rigidity, and explosive pop off shorebreak lips.',
        category: 'carbon'
      },
      {
        name: 'Saint Joe Carbon Apex Custom',
        type: 'High-Density Foamcore • Custom Rail Contour',
        price: 220,
        description: 'Ridden by 1st Runner Up @macoy_racil for lightning-quick rail-to-rail transitions and maximum glide across flatwater.',
        category: 'carbon'
      },
      {
        name: 'Saint Joe Custom Speed Fish',
        type: 'Swallow Tail • Wide Planning Surface',
        price: 220,
        description: 'Ridden by 2nd Runner Up @mark_racosa to maximize wave count and accelerate through fat shoulder sections.',
        category: 'carbon'
      }
    ]
  }
];
