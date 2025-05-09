
import { LucideIcon, Scissors, Home, Calendar, Clock, ShoppingBag, User, Users } from "lucide-react";

// Create an interface for the category item
export interface Category {
  id: string;
  title: string;
  iconName: string;
  icon: LucideIcon;
  description: string;
  href: string;
}

export const categories: Category[] = [
  {
    id: "haircuts",
    title: "Haircuts & Styling",
    iconName: "scissors",
    icon: Scissors,
    description: "Professional haircuts and styling services",
    href: "/services/haircuts",
  },
  {
    id: "cleaning",
    title: "Home Cleaning",
    iconName: "home",
    icon: Home,
    description: "House cleaning and maintenance services",
    href: "/services/cleaning",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    iconName: "user",
    icon: User,
    description: "Plumbing repair and installation",
    href: "/services/plumbing",
  },
  {
    id: "electrical",
    title: "Electrical",
    iconName: "users",
    icon: Users,
    description: "Electrical repair and installation",
    href: "/services/electrical",
  },
  {
    id: "tutoring",
    title: "Tutoring",
    iconName: "calendar",
    icon: Calendar,
    description: "Academic and skills tutoring",
    href: "/services/tutoring",
  },
  {
    id: "events",
    title: "Event Planning",
    iconName: "clock",
    icon: Clock,
    description: "Event planning and coordination",
    href: "/services/events",
  },
  {
    id: "delivery",
    title: "Delivery",
    iconName: "shoppingBag",
    icon: ShoppingBag,
    description: "Delivery and pickup services",
    href: "/services/delivery",
  },
  {
    id: "repairs",
    title: "Home Repairs",
    iconName: "home",
    icon: Home,
    description: "General home repairs and maintenance",
    href: "/services/repairs",
  },
];

export const featuredServices = [
  {
    id: "1",
    title: "Premium Haircut & Styling",
    provider: "Urban Cuts Luanda",
    image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=800&q=80",
    price: 5000,
    rating: 4.8,
    reviewCount: 124,
    category: "Haircuts",
  },
  {
    id: "2",
    title: "Complete House Cleaning",
    provider: "CleanHome Services",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
    price: 8500,
    rating: 4.7,
    reviewCount: 98,
    category: "Cleaning",
  },
  {
    id: "3",
    title: "Plumbing Repair Service",
    provider: "Fast Fix Plumbing",
    image: "https://images.unsplash.com/photo-1575998733749-16a657403d5e?auto=format&fit=crop&w=800&q=80",
    price: 6000,
    rating: 4.5,
    reviewCount: 67,
    category: "Plumbing",
  },
  {
    id: "4",
    title: "Home Electrical Services",
    provider: "PowerPro Angola",
    image: "https://images.unsplash.com/photo-1558618666-16639628875b?auto=format&fit=crop&w=800&q=80",
    price: 7500,
    rating: 4.6,
    reviewCount: 52,
    category: "Electrical",
  },
  {
    id: "5",
    title: "Math & Science Tutoring",
    provider: "Academic Excellence",
    image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80",
    price: 4000,
    rating: 4.9,
    reviewCount: 38,
    category: "Tutoring",
  },
  {
    id: "6",
    title: "Event Planning & Coordination",
    provider: "Celebration Events",
    image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?auto=format&fit=crop&w=800&q=80",
    price: 15000,
    rating: 4.7,
    reviewCount: 29,
    category: "Events",
  },
  {
    id: "7",
    title: "Express Delivery Service",
    provider: "Swift Delivery Angola",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    price: 3000,
    rating: 4.6,
    reviewCount: 112,
    category: "Delivery",
  },
  {
    id: "8",
    title: "General Home Repairs",
    provider: "Handy Solutions",
    image: "https://images.unsplash.com/photo-1613323593608-abc90fec84ff?auto=format&fit=crop&w=800&q=80",
    price: 9000,
    rating: 4.4,
    reviewCount: 43,
    category: "Repairs",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "João Silva",
    location: "Luanda",
    content: "I've been using ServiAngola for all my home cleaning needs. The service providers are professional and the booking process is seamless.",
    rating: 5,
    service: "House Cleaning",
  },
  {
    id: "2",
    name: "Maria Santos",
    location: "Benguela",
    content: "Found an amazing hairstylist through this platform. Saved me so much time searching around the city!",
    rating: 4,
    service: "Haircuts",
  },
  {
    id: "3",
    name: "Pedro Neto",
    location: "Lubango",
    content: "The plumber I hired through ServiAngola fixed my issue quickly and at a reasonable price. Highly recommend this platform.",
    rating: 5,
    service: "Plumbing",
  },
];
