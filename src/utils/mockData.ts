// Mock Data and Utilities for SST Groomers Website

export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  type: 'dog' | 'cat';
  weight: string;
  age: string;
  coatCondition: string;
  earStatus: string;
  nailStatus: string;
  lastGrooming: string;
  nextGrooming: string;
  overallScore: number;
}

export const mockPets: PetProfile[] = [
  {
    id: 'bella',
    name: 'Bella',
    breed: 'Golden Retriever',
    type: 'dog',
    weight: '18 kg',
    age: '2 Years',
    coatCondition: 'Healthy & Shiny',
    earStatus: 'Clean & Completed',
    nailStatus: 'Trimming Done (Good)',
    lastGrooming: '12 July',
    nextGrooming: '12 August',
    overallScore: 96,
  },
  {
    id: 'coco',
    name: 'Coco',
    breed: 'Persian Cat',
    type: 'cat',
    weight: '4.2 kg',
    age: '1.5 Years',
    coatCondition: 'Fluffy (De-shedded)',
    earStatus: 'Cleaned',
    nailStatus: 'Clipped & Filed (Good)',
    lastGrooming: '05 July',
    nextGrooming: '05 August',
    overallScore: 98,
  },
  {
    id: 'max',
    name: 'Max',
    breed: 'Shih Tzu',
    type: 'dog',
    weight: '6.5 kg',
    age: '3 Years',
    coatCondition: 'Nourished & Styled',
    earStatus: 'Treated & Clean',
    nailStatus: 'Rounded (Good)',
    lastGrooming: '18 July',
    nextGrooming: '18 August',
    overallScore: 94,
  }
];

export interface GroomingPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

export const groomingPackages: GroomingPackage[] = [
  {
    id: 'basic',
    name: 'Basic Grooming',
    price: 799,
    duration: '45 Minutes',
    features: [
      'Warm Water Bath & Shampoo',
      'Blow Dry & Brush Out',
      'Gentle Nail Trimming',
      'Ear Cleaning & De-waxing',
      'Perfumed Spritz'
    ],
    recommendedFor: 'Routine hygiene check-ups, short-haired breeds'
  },
  {
    id: 'premium',
    name: 'Premium Grooming',
    price: 1499,
    duration: '75 Minutes',
    features: [
      'Everything in Basic Grooming',
      'Breed-Specific Hair Styling',
      'Deep Undercoat De-Shedding',
      'Pet-Safe Teeth Cleaning',
      'Soothing Paw Butter Massage',
      'Anatomical Check & Brush out'
    ],
    recommendedFor: 'Medium/Long hair styling, medium shedders',
    isPopular: true
  },
  {
    id: 'luxury',
    name: 'Luxury Spa',
    price: 2499,
    duration: '120 Minutes',
    features: [
      'Everything in Premium Grooming',
      'Organic Oatmeal Mud Bath',
      'Deep Coat Conditioning Treatment',
      'Soothing Aromatherapy Spa',
      'Sanitary Area Hygiene Cut',
      'Complimentary Digital Health Summary',
      'Premium Custom Pet Bandana'
    ],
    recommendedFor: 'Show-quality looks, anxious pets, complete relaxation'
  }
];

export interface AIRecommendationResult {
  packageName: string;
  price: number;
  estimatedTime: string;
  reason: string;
  benefits: string[];
  healthTip: string;
}

export function calculateRecommendation(
  breed: string,
  coatLength: 'short' | 'medium' | 'long',
  shedding: 'low' | 'moderate' | 'heavy',
  age: string
): AIRecommendationResult {
  const ageNum = parseFloat(age) || 2;
  
  if (shedding === 'heavy' || coatLength === 'long') {
    return {
      packageName: 'Luxury Spa',
      price: 2499,
      estimatedTime: '120 Minutes',
      reason: `Based on your pet's long coat/heavy shedding profile, they need deep hydration and premium styling. Long coats mat easily and require extensive dematting, while heavy shedders benefit greatly from our Organic Oatmeal Mud Bath which releases trapped undercoat.`,
      benefits: [
        'Complete undercoat release to reduce home shedding by up to 90%',
        'Deep coat conditioning to prevent painful matting and tangling',
        'Stress-relief aromatherapy to keep your pet relaxed during the longer styling process'
      ],
      healthTip: `Since they are ${ageNum > 7 ? 'a senior pet' : 'in their prime'}, regular coat conditioning every 4 weeks helps keep their skin hydrated and free of itching in Coimbatore's tropical weather.`
    };
  }

  if (coatLength === 'medium' || shedding === 'moderate' || ageNum < 1) {
    return {
      packageName: 'Premium Grooming',
      price: 1499,
      estimatedTime: '75 Minutes',
      reason: `For medium coats or active puppies, our Premium package provides the perfect balance of custom styling and hygienic maintenance. Puppies get gentle acclimation, while adult dogs receive structural breed-specific styling and teeth hygiene.`,
      benefits: [
        'Breed-specific style cut matching their coat structure',
        'Paw care treatment to soothe dry or cracked pads from hard walks',
        'Oral hygiene brush to control plaque and ensure fresh breath'
      ],
      healthTip: 'Ensure you groom your pet every 5-6 weeks. Starting dental hygiene early prevents long-term periodontal diseases.'
    };
  }

  // Fallback / Basic
  return {
    packageName: 'Basic Grooming',
    price: 799,
    estimatedTime: '45 Minutes',
    reason: `Your pet has a short, low-maintenance coat. The Basic Grooming package is ideal for keeping up with routine hygiene, ensuring clean ears, clipped nails, and a refreshingly clean coat without over-grooming.`,
    benefits: [
      'Hygienic nail trimming to prevent joint discomfort from overgrowth',
      'Gentle ear de-waxing to reduce the risk of tropical ear infections',
      'Quick refreshing bath and blow dry to remove outdoor dirt and odor'
    ],
    healthTip: 'Even short-haired pets need nail trims every 3-4 weeks to maintain proper posture and healthy paws.'
  };
}

export const safetyChecklist = [
  { item: 'All stainless steel tables and tubs autoclaved', time: '08:30 AM', status: 'Completed' },
  { item: 'Fresh towel sterilizer fully stocked & powered', time: '08:45 AM', status: 'Completed' },
  { item: 'Climate control verified (constant 24°C in grooming zone)', time: '09:00 AM', status: 'Completed' },
  { item: 'First-aid & pet oxygen kits checked & accessible', time: '09:15 AM', status: 'Completed' },
  { item: 'Water filter & pH levels checked (pH 7.1, pet-safe)', time: '09:30 AM', status: 'Completed' },
  { item: 'UV disinfection lamps activated in suites', time: '01:00 PM', status: 'Completed' }
];

export const mockReviews = [
  {
    id: '1',
    customerName: 'Ananth Krishnan',
    petName: 'Rocky (Labrador)',
    rating: 5,
    text: 'SST Groomers is a gem in Coimbatore! Rocky is usually very anxious during baths, but the team here was so gentle. He came out looking handsome, smelling great, and completely happy. The transparency and cleanliness are top-notch.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    petPic: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    customerName: 'Priya Sundar',
    petName: 'Milo (Persian Cat)',
    rating: 5,
    text: 'Highly recommend their cat grooming! Finding good cat groomers in Coimbatore is tough, but they handled Milo with such expertise. The Premium cut is gorgeous. The rewards wallet is a fun touch too; I already have 650 points!',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    petPic: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop'
  },
  {
    id: '3',
    customerName: 'Dr. Vignesh Kumar',
    petName: 'Zara (Golden Retriever)',
    rating: 5,
    text: 'Being a veterinarian, hygiene is my biggest concern. I was thoroughly impressed by SST Groomers’ open salon concept and their 100% daily hygiene score. Their staff are certified and understand dog behavior perfectly. Excellent work!',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    petPic: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop'
  }
];

export const faqList = [
  {
    question: "How often should I groom my pet?",
    answer: "For most dogs and long-haired cats, we recommend grooming every 4 to 6 weeks. Short-haired breeds can stretch this to 8-10 weeks. Regular trims help prevent skin irritation, shedding, and overgrown nails that can damage joints."
  },
  {
    question: "Is grooming safe? How do you handle anxious pets?",
    answer: "Safety is our absolute priority. We use a gentle, fear-free handling approach. Our groomers are certified in pet first-aid and canine psychology. We never use sedation. For highly anxious pets, we schedule quiet hours and take frequent breaks, keeping the environment calm with low noise levels and soothing pheromones."
  },
  {
    question: "Do you groom cats as well as dogs?",
    answer: "Yes, absolutely! We have dedicated cat grooming specialists and use customized, cat-friendly shampoo and styling tools. Cat sessions are scheduled in specific slots to minimize overlap with larger dogs, reducing cat anxiety."
  },
  {
    question: "Which grooming package is best for my pet?",
    answer: "If your pet just needs a refresh, 'Basic Grooming' is perfect. If they need a custom hairstyle, dematting, or teeth brushing, choose 'Premium'. For senior pets, pets with skin allergies, or for a full spa day with organic mud baths, we recommend the 'Luxury Spa'. Try our interactive AI Recommendation tool above to find the perfect fit!"
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer: "Yes. You can reschedule or cancel up to 12 hours before your appointment free of charge. You can do this by clicking the link in your SMS confirmation or calling us directly at +91 98765 43210."
  }
];

export const galleryCategories = ['All', 'Happy Pets', 'Salon Interior', 'Styling Sessions'];

export const galleryItems = [
  {
    id: 'g1',
    category: 'Happy Pets',
    title: 'Fluffy Golden Retriever Post-Spa',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=450&fit=crop'
  },
  {
    id: 'g2',
    category: 'Styling Sessions',
    title: 'Teddy Bear Cut on a Shih Tzu',
    imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=450&fit=crop'
  },
  {
    id: 'g3',
    category: 'Salon Interior',
    title: 'Sterilized Grooming & Bathing Bays',
    imageUrl: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&h=450&fit=crop'
  },
  {
    id: 'g4',
    category: 'Happy Pets',
    title: 'Persian Cat Fluff Blowout',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=450&fit=crop'
  },
  {
    id: 'g5',
    category: 'Styling Sessions',
    title: 'Professional Nail Trimming Session',
    imageUrl: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=450&fit=crop'
  },
  {
    id: 'g6',
    category: 'Salon Interior',
    title: 'Pet Relaxation Lounge',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=450&fit=crop'
  }
];
