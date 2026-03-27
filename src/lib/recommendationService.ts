// AI Recommendation scoring service for UniTrack

export interface StudentProfile {
  department: string;
  interests: string[];
  skills: string[];
}

export interface ScoredItem {
  title: string;
  category?: string;
  department?: string;
  description: string;
  credits: number;
  skills: string[];
  matchScore: number;
  matchPercent: number;
  type: "volunteering" | "activity";
  status: string;
  currentParticipants?: number;
  maxParticipants?: number;
  capacity?: number;
  enrolled?: number;
  duration?: string;
  date?: string;
  blockchainVerified?: boolean;
  faculty?: string;
  activityType?: string;
}

const mockStudent: StudentProfile = {
  department: "Computer Science",
  interests: ["AI", "Blockchain", "Sustainability", "Machine Learning", "Data Science"],
  skills: ["Leadership", "DSA", "Communication", "Python"],
};

const volunteeringData = [
  {
    title: "Campus Green Initiative Coordinator",
    category: "Sustainability & Environmental",
    description: "Lead weekly campus sustainability workshops and coordinate recycling drives across dormitories.",
    credits: 4,
    duration: "6 weeks",
    maxParticipants: 15,
    currentParticipants: 8,
    skills: ["Leadership", "Communication"],
    blockchainVerified: true,
    status: "open",
  },
  {
    title: "Peer Tutoring — Data Structures",
    category: "Academic Support",
    description: "Assist junior students with Data Structures coursework during weekly lab sessions.",
    credits: 3,
    duration: "4 weeks",
    maxParticipants: 10,
    currentParticipants: 10,
    skills: ["DSA", "Teaching"],
    blockchainVerified: true,
    status: "full",
  },
  {
    title: "Open Day Event Volunteer",
    category: "Event Management & Outreach",
    description: "Guide prospective students and families during the annual university open day event.",
    credits: 2,
    duration: "1 day",
    maxParticipants: 30,
    currentParticipants: 12,
    skills: ["Communication"],
    blockchainVerified: false,
    status: "open",
  },
  {
    title: "Library Digitization Assistant",
    category: "Campus Life & Services",
    description: "Help digitize rare manuscripts and organize the digital archive cataloging system.",
    credits: 3,
    duration: "3 weeks",
    maxParticipants: 8,
    currentParticipants: 3,
    skills: ["Attention to Detail", "Digital Tools"],
    blockchainVerified: true,
    status: "open",
  },
  {
    title: "AI Research Lab Assistant",
    category: "Specialized Roles",
    description: "Support ongoing research experiments in the AI lab including data collection and preprocessing.",
    credits: 5,
    duration: "8 weeks",
    maxParticipants: 5,
    currentParticipants: 2,
    skills: ["Python", "ML Basics"],
    blockchainVerified: true,
    status: "open",
  },
];

const activitiesData = [
  {
    title: "AI & Machine Learning Workshop 2025",
    activityType: "Workshop",
    department: "AI & ML Dept.",
    description: "Intensive hands-on workshop covering supervised learning, neural networks, and real-world ML deployment.",
    credits: 5,
    date: "Feb 20, 2025",
    duration: "3 Days",
    enrolled: 42,
    capacity: 50,
    status: "open",
    blockchainVerified: true,
    faculty: "Dr. Arun Kumar",
    skills: ["Python", "ML Basics"],
  },
  {
    title: "Blockchain Dev Bootcamp",
    activityType: "Bootcamp",
    department: "Computer Science",
    description: "Learn smart contract development with Solidity, deploy on testnet, and build decentralized applications.",
    credits: 5,
    date: "Feb 25, 2025",
    duration: "5 Days",
    enrolled: 28,
    capacity: 35,
    status: "open",
    blockchainVerified: true,
    faculty: "Prof. Meena Raj",
    skills: ["DSA", "Problem Solving"],
  },
  {
    title: "Research Paper Submission Drive",
    activityType: "Research",
    department: "Research Cell",
    description: "Submit your original research paper to the inter-university journal.",
    credits: 4,
    date: "Mar 1, 2025",
    duration: "2 Weeks",
    enrolled: 15,
    capacity: 25,
    status: "open",
    blockchainVerified: false,
    faculty: "Dr. Priya Nair",
    skills: ["Communication", "Research"],
  },
  {
    title: "Cultural Fest — TechNova 2025",
    activityType: "Event",
    department: "Student Affairs",
    description: "Annual inter-college technical and cultural festival with hackathons and paper presentations.",
    credits: 3,
    date: "Mar 10, 2025",
    duration: "3 Days",
    enrolled: 120,
    capacity: 150,
    status: "open",
    blockchainVerified: true,
    faculty: "Dean, Student Affairs",
    skills: ["Leadership", "Communication"],
  },
  {
    title: "Data Science Certification Program",
    activityType: "Certification",
    department: "Analytics Lab",
    description: "Comprehensive 6-week program covering Python, Pandas, ML pipelines, and final capstone project.",
    credits: 8,
    date: "Mar 15, 2025",
    duration: "6 Weeks",
    enrolled: 35,
    capacity: 35,
    status: "full",
    blockchainVerified: true,
    faculty: "Dr. Suresh Iyer",
    skills: ["Python", "Data Analysis"],
  },
  {
    title: "Ethics in Technology Seminar",
    activityType: "Seminar",
    department: "Humanities",
    description: "Explore AI ethics, data privacy, digital rights and responsible tech development.",
    credits: 2,
    date: "Feb 28, 2025",
    duration: "1 Day",
    enrolled: 60,
    capacity: 80,
    status: "open",
    blockchainVerified: false,
    faculty: "Dr. Ananya Bose",
    skills: ["Communication"],
  },
];

function calculateScore(
  item: { title: string; description: string; category?: string; department?: string; skills: string[]; currentParticipants?: number; maxParticipants?: number; enrolled?: number; capacity?: number },
  profile: StudentProfile
): number {
  let score = 0;

  // Department match (+5)
  const itemDept = (item.department || item.category || "").toLowerCase();
  if (itemDept.includes(profile.department.toLowerCase()) || profile.department.toLowerCase().includes("computer")) {
    if (itemDept.includes("computer") || itemDept.includes("ai") || itemDept.includes("analytics") || itemDept.includes("specialized")) {
      score += 5;
    }
  }

  // Interest match (+3 each)
  const text = `${item.title} ${item.description} ${item.category || ""} ${item.department || ""}`.toLowerCase();
  for (const interest of profile.interests) {
    if (text.includes(interest.toLowerCase())) {
      score += 3;
    }
  }

  // Skill match (+2 each)
  for (const skill of profile.skills) {
    if (item.skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      score += 2;
    }
  }

  // Popularity (+1)
  const current = item.currentParticipants || item.enrolled || 0;
  const max = item.maxParticipants || item.capacity || 1;
  if (current / max > 0.5) {
    score += 1;
  }

  return score;
}

function scoreToPercent(score: number, maxPossible: number): number {
  return Math.min(Math.round((score / maxPossible) * 100), 99);
}

export function getRecommendedVolunteering(): ScoredItem[] {
  const maxScore = 5 + (mockStudent.interests.length * 3) + (mockStudent.skills.length * 2) + 1;
  
  return volunteeringData
    .map((v) => {
      const score = calculateScore(v, mockStudent);
      return {
        ...v,
        matchScore: score,
        matchPercent: scoreToPercent(score, maxScore),
        type: "volunteering" as const,
        blockchainVerified: v.blockchainVerified,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}

export function getRecommendedActivities(): ScoredItem[] {
  const maxScore = 5 + (mockStudent.interests.length * 3) + (mockStudent.skills.length * 2) + 1;

  return activitiesData
    .map((a) => {
      const score = calculateScore(a, mockStudent);
      return {
        ...a,
        matchScore: score,
        matchPercent: scoreToPercent(score, maxScore),
        type: "activity" as const,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}
