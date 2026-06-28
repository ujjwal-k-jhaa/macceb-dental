export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
  rating: number;
  availableDays: string[];
  availableSlots: string[];
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  costRange: { min: number; max: number };
  duration: string;
  benefits: string[];
  recoveryTime: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  treatment: string;
  date: string;
  verified: boolean;
  avatar: string;
}

export interface Technology {
  id: string;
  title: string;
  tag: string;
  description: string;
  advantage: string;
}

export interface BookingDetails {
  serviceId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}
