import { Doctor, Service, Review, Technology } from "./types";

export const IMAGES = {
  heroLobby: "/src/assets/images/clinic_lobby_1782454496014.jpg",
  drCeb: "/src/assets/images/lead_dentist_1782454568794.jpg",
  drRostova: "/src/assets/images/chief_dentist_1782454511401.jpg",
  drKincaid: "/src/assets/images/orthodontist_dentist_1782454584705.jpg",
};

export const SERVICES: Service[] = [
  {
    id: "cosmetic",
    title: "Digital Smile Design",
    tagline: "AI-Augmented Aesthetic Artistry",
    description: "Using predictive facial topography and high-definition virtual sculpting, we design your ideal smile alignment before any treatment even begins. Peerless artistry meet advanced biometric planning.",
    iconName: "Sparkles",
    costRange: { min: 2500, max: 7500 },
    duration: "1 - 2 Sessions",
    benefits: [
      "Custom mockups mapped to your natural bone structure",
      "No invasive prep work for visual previews",
      "Fully personalized tooth proportions and shade values",
      "Integrates with ultra-thin porcelain porcelain veneers"
    ],
    recoveryTime: "Immediate"
  },
  {
    id: "implants",
    title: "Micro-Guided Implants",
    tagline: "3D Surgical Navigation & Bioceramics",
    description: "Replace lost teeth with premium biocompatible zirconia or titanium implants. Utilizing computed micro-guided surgery, we ensure millimeter-level placement accuracy with near-zero recovery times.",
    iconName: "ShieldCheck",
    costRange: { min: 1800, max: 4500 },
    duration: "1 - 3 Sessions",
    benefits: [
      "Millimeter-level placement precision via real-time 3D scans",
      "Painless computerized anesthetic administration",
      "Biocompatible non-metal zirconia implants available",
      "Lifetime material warranty with continuous monitoring"
    ],
    recoveryTime: "24 - 48 Hours"
  },
  {
    id: "veneers",
    title: "Ultra-Thin Porcelain Veneers",
    tagline: "Enamel-Preserving Micro-Plates",
    description: "The peak of bespoke cosmetic dentistry. Handcrafted microscopic ceramic facades that correct spacing, discoloration, or minor misalignment while conserving your natural tooth structural integrity.",
    iconName: "Layers",
    costRange: { min: 1200, max: 2800 },
    duration: "2 Sessions",
    benefits: [
      "Zero-enamel-shave or ultra-conservative preparation",
      "Hand-finished by ceramic artisans in Switzerland",
      "Extreme stain resistance against coffee, wine, and tea",
      "Natural crystalline light transmission mimicking organic enamel"
    ],
    recoveryTime: "Immediate"
  },
  {
    id: "aligners",
    title: "Biocompatible Clear Aligners",
    tagline: "Advanced Smart-Polymer Alignment",
    description: "Invisible orthodontic aligners utilizing state-of-the-art shape-memory polymers. Engineered to distribute subtle, constant orthodontic force, correcting alignment up to 40% faster than older braces.",
    iconName: "Compass",
    costRange: { min: 3000, max: 6500 },
    duration: "4 - 12 Months",
    benefits: [
      "Advanced smart-polymer with superior optical clarity",
      "Removable for effortless eating and thorough oral hygiene",
      "Weekly virtual progression check-ups through our app",
      "Accelerated movement without discomfort"
    ],
    recoveryTime: "Immediate"
  },
  {
    id: "whitening",
    title: "Deep Laser Oxidation & Polish",
    tagline: "Hypersensitivity-Free Chromatic Lift",
    description: "Raise your shade scale safely up to 8 levels. Using cold-blue laser wavelengths paired with high-mineral remineralizing pastes, we eliminate organic deep-stain matrices without causing neural tooth sensitivity.",
    iconName: "Sun",
    costRange: { min: 600, max: 1400 },
    duration: "60 Minutes",
    benefits: [
      "Guaranteed immediate lift of 5 to 8 shade levels",
      "Formulated with sensitivity-blocking nano-hydroxyapatite",
      "Deep enamel strengthening treatment included",
      "Bespoke post-treatment color protection kit"
    ],
    recoveryTime: "Immediate"
  },
  {
    id: "preventive",
    title: "Cellular Gum Screening & Care",
    tagline: "Microbial Balancing & Gum Protection",
    description: "Prevention for the modern era. We analyze your saliva micro-flora and perform molecular gum mapping to target and prevent periodontitis before any clinical signs manifest.",
    iconName: "Activity",
    costRange: { min: 250, max: 650 },
    duration: "45 Minutes",
    benefits: [
      "Comprehensive salivary microbiome DNA mapping",
      "Ultrasonic micro-mist polishing (air-flow tech)",
      "Strengthens deep periodontal structural ligaments",
      "Personalized bio-active oral care prescription"
    ],
    recoveryTime: "Immediate"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-ceb",
    name: "Dr. Marc Ceb",
    role: "Founder & Master of Implantology",
    specialties: ["Dental Implantology", "Micro-Guided Surgery", "Reconstructive Dentistry"],
    bio: "With over 18 years of surgical mastery and academic research, Dr. Ceb founded macceb Dental to pioneer surgical practices where technical perfection meets artistic vision. He sits on the European Board of Oral Implantology.",
    image: IMAGES.drCeb,
    rating: 4.9,
    availableDays: ["Mon", "Tue", "Thu", "Fri"],
    availableSlots: ["09:00 AM", "10:30 AM", "01:30 PM", "03:00 PM"]
  },
  {
    id: "dr-rostova",
    name: "Dr. Elena Rostova",
    role: "Lead Cosmetic & Digital Smile Designer",
    specialties: ["Smile Design", "Swiss Veneer Artistry", "Cosmetic Dentistry"],
    bio: "Dr. Elena Rostova holds custom masters certifications in Swiss Aesthetic Dentistry. She leverages biometric dental tech to sculpt stunning, high-definition smiles that look beautifully natural and unique to each patient.",
    image: IMAGES.drRostova,
    rating: 5.0,
    availableDays: ["Tue", "Wed", "Fri"],
    availableSlots: ["10:00 AM", "11:30 AM", "02:30 PM", "04:00 PM"]
  },
  {
    id: "dr-kincaid",
    name: "Dr. Liam Kincaid",
    role: "Aesthetic Orthodontics Specialist",
    specialties: ["Smart Clear Aligners", "Interceptive Orthodontics", "Maxillofacial Alignment"],
    bio: "A pioneer in shape-memory polymer aligner treatments, Dr. Kincaid merges advanced dental physics with patient comfort, providing swift alignment corrections for discerning adult and adolescent professionals.",
    image: IMAGES.drKincaid,
    rating: 4.8,
    availableDays: ["Mon", "Wed", "Thu"],
    availableSlots: ["09:30 AM", "11:00 AM", "01:00 PM", "03:30 PM"]
  }
];

export const TECHNOLOGIES: Technology[] = [
  {
    id: "scanner",
    title: "3D Intraoral Laser Imaging",
    tag: "Aesthetic Diagnostics",
    description: "Captures 12,000 microscopic spatial points per second, rendering a flawless 3D model of your dentition within 90 seconds. Absolutely no uncomfortable chemical putty impressions required.",
    advantage: "100% comfortable, precise bite alignment mapping, zero chemical taste."
  },
  {
    id: "anesthesia",
    title: "Computerized Local Anesthesia",
    tag: "Painless Comfort",
    description: "The Wand™ system delivers state-of-the-art computerized anesthetic flow tracking tissue density. The result is a completely painless single-tooth freeze with no lingering face numbness.",
    advantage: "Zero-pressure injection pain, precise single-tooth targeting, fast sensation recovery."
  },
  {
    id: "laser",
    title: "LightScalpel CO2 Medical Laser",
    tag: "Micro-Surgical Preciseness",
    description: "Replaces standard blades with an ultra-fine thermal light beam. It instantly vaporizes micro-bacterial colonies, sterilizes contact sites, and minimizes post-operative swelling or healing lag.",
    advantage: "Virtually bloodless treatment, immediate healing stimulation, reduced need for sutures."
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Genevieve Dubois",
    rating: 5,
    comment: "The absolute zenith of dental care. The glassmorphic interiors, the computerized numbing system that felt like absolutely nothing, and Dr. Elena's meticulous Swiss veneer craftsmanship transformed my confidence completely.",
    treatment: "Ultra-Thin Porcelain Veneers",
    date: "May 14, 2026",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "rev-2",
    name: "Marcus Sterling",
    rating: 5,
    comment: "I was highly skeptical of getting a molar implant, but Dr. Ceb used a 3D guided surgical scanner right in front of me and placed the ceramic implant in under 20 minutes. The post-op recovery felt like standard hygiene! Remarkable modern tech.",
    treatment: "Micro-Guided Implants",
    date: "June 02, 2026",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "rev-3",
    name: "Aria Takahashi",
    rating: 5,
    comment: "My clear aligner schedule was fully digitized. I checked in with Dr. Kincaid via spatial app scan reports, saving me hours of clinical transit. The shape-memory polymer aligners were incredibly clear and light.",
    treatment: "Biocompatible Clear Aligners",
    date: "June 21, 2026",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
  }
];

export const FAQS = [
  {
    q: "How does Digital Smile Design differ from traditional dentistry planning?",
    a: "Traditional planning relies on mental visualization or static dental wax molds. Digital Smile Design (DSD) uses real-time 3D facial modeling, AI skeletal analysis, and high-contrast simulations. We project the precise dimensional measurements onto your face on high-resolution screens, allowing you to co-design your custom smile's width, height, and color values before any dental work begins."
  },
  {
    q: "Is the computerized local anesthesia completely painless?",
    a: "Yes. Most dental injection pain originates from the pressure of the fluid stretching the tissue, rather than the needle itself. Our computerized system (The Wand™) tracks real-time tissue resistance, administering anesthesia molecule-by-molecule. You only experience a cool, light drop with absolutely zero standard pinch or pinch-related anxiety."
  },
  {
    q: "Do you offer international concierge services for overseas clients?",
    a: "We frequently host international clients seeking premium Swiss dental work and advanced guided surgery. We offer full concierge coordination, including premium airport transfers, adjacent five-star hotel arrangements, and intensive fast-track treatment sequencing."
  },
  {
    q: "How long do custom Switzerland-crafted porcelain veneers last?",
    a: "With standard hygiene care and routine checkups at macceb Dental, our ultra-thin porcelain veneers are designed to retain their absolute luster, structural alignment, and bond strength for 15 to 25 years. They are handcrafted using crystalline feldspathic porcelain, which possesses structural characteristics superior to normal tooth enamel."
  }
];
