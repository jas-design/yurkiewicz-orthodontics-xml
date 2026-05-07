import { 
  Stethoscope, 
  Dna, 
  CircleOff, 
  Smile, 
  Sparkles, 
  Microscope,
  ShieldCheck,
  Star,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'general-dental-care',
    title: 'General Dental Care',
    description: 'We are excited to meet you and provide the best dental care for your family.',
    icon: 'Stethoscope'
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Our team loves dental trivia. Did you know that tooth enamel.',
    icon: 'Activity'
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    description: 'We are excited to meet you and provide the best dental care for your family.',
    icon: 'Smile'
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'We are excited to meet you and provide the best dental care for your family.',
    icon: 'Sparkles'
  }
];

export const WHY_CHOOSE_US = [
  { id: 1, title: 'Experienced Doctor', description: 'The goal of our clinic is to provide friendly, caring dentistry and the.', icon: 'Users' },
  { id: 2, title: 'Personalized Care', description: 'The goal of our clinic is to provide friendly, caring dentistry and the.', icon: 'Heart' },
  { id: 3, title: 'Flexible Payment Options', description: 'The goal of our clinic is to provide friendly, caring dentistry and the.', icon: 'CreditCard' },
  { id: 4, title: 'Emergency Services', description: 'The goal of our clinic is to provide friendly, caring dentistry and the.', icon: 'Clock' },
  { id: 5, title: 'Positive Patient Reviews', description: 'The goal of our clinic is to provide friendly, caring dentistry and the.', icon: 'Star' },
  { id: 6, title: 'Latest Technology', description: 'The goal of our clinic is to provide friendly, caring dentistry and the.', icon: 'Cpu' },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Robert Lee',
    role: 'Software Engineer',
    content: 'I want to say thank you to my doctor Steve! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus. Thank you for helping me overcome my fear of the dentist! Vivamus sagittis massa vitae bibendum rhoncus. Duis cursus.',
    avatar: 'https://i.pravatar.cc/100?u=robert',
    rating: 4.7
  }
];

export const TEAM = [
  {
    id: '1',
    name: 'Dr. Johan Joe',
    specialty: 'Lead Dentist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Lead Dentist',
    experience: '15+',
    patients: '2k+'
  },
  {
    id: '2',
    name: 'Dr. Mike Johnson',
    specialty: 'Senior Dentist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Senior Dentist',
    experience: '12+',
    patients: '1.5k+'
  },
  {
    id: '3',
    name: 'Dr. Alison Banson',
    specialty: 'Orthodontist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Orthodontist',
    experience: '10+',
    patients: '1.2k+'
  },
  {
    id: '4',
    name: 'Dr. Christopher Case',
    specialty: 'Periodontist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Periodontist',
    experience: '18+',
    patients: '3k+'
  }
];

export const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Importance Of Regular Dental Check-Ups',
    date: 'March 15, 2024',
    excerpt: 'Our waiting room features a variety of plants that help purify the air.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Dental Tips'
  },
  {
    id: '2',
    title: 'Top 5 Benefits Of Professional Teeth Whitening',
    date: 'March 10, 2024',
    excerpt: 'We believe in promoting health and wellness in every aspect of our clinic.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Whitening'
  },
  {
    id: '3',
    title: 'Understanding Dental Implants: What You Need To Know',
    date: 'March 05, 2024',
    excerpt: 'Our clinic donates dental care services to underprivileged families.',
    image: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Implants'
  }
];
