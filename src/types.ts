export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}
