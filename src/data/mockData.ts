
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
    title: "Cortes de Cabelo",
    iconName: "scissors",
    icon: Scissors,
    description: "Serviços profissionais de corte e penteado",
    href: "/services/haircuts",
  },
  {
    id: "cleaning",
    title: "Limpeza Doméstica",
    iconName: "home",
    icon: Home,
    description: "Serviços de limpeza e manutenção residencial",
    href: "/services/cleaning",
  },
  {
    id: "plumbing",
    title: "Canalização",
    iconName: "user",
    icon: User,
    description: "Reparo e instalação de canalização",
    href: "/services/plumbing",
  },
  {
    id: "electrical",
    title: "Electricidade",
    iconName: "users",
    icon: Users,
    description: "Reparo e instalação elétrica",
    href: "/services/electrical",
  },
  {
    id: "tutoring",
    title: "Explicações",
    iconName: "calendar",
    icon: Calendar,
    description: "Explicações académicas e de competências",
    href: "/services/tutoring",
  },
  {
    id: "events",
    title: "Eventos",
    iconName: "clock",
    icon: Clock,
    description: "Planejamento e coordenação de eventos",
    href: "/services/events",
  },
  {
    id: "delivery",
    title: "Entrega",
    iconName: "shoppingBag",
    icon: ShoppingBag,
    description: "Serviços de entrega e recolha",
    href: "/services/delivery",
  },
  {
    id: "repairs",
    title: "Reparos Domésticos",
    iconName: "home",
    icon: Home,
    description: "Reparos gerais e manutenção residencial",
    href: "/services/repairs",
  },
];

export const featuredServices = [
  {
    id: "1",
    title: "Corte de Cabelo Premium",
    provider: "Urban Cuts Luanda",
    image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=800&q=80",
    price: 5000,
    rating: 4.8,
    reviewCount: 124,
    category: "Cortes",
  },
  {
    id: "2",
    title: "Limpeza Completa de Casa",
    provider: "CleanHome Services",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
    price: 8500,
    rating: 4.7,
    reviewCount: 98,
    category: "Limpeza",
  },
  {
    id: "3",
    title: "Reparo de Canalização",
    provider: "Fast Fix Plumbing",
    image: "https://images.unsplash.com/photo-1575998733749-16a657403d5e?auto=format&fit=crop&w=800&q=80",
    price: 6000,
    rating: 4.5,
    reviewCount: 67,
    category: "Canalização",
  },
  {
    id: "4",
    title: "Serviços Elétricos",
    provider: "PowerPro Angola",
    image: "https://images.unsplash.com/photo-1558618666-16639628875b?auto=format&fit=crop&w=800&q=80",
    price: 7500,
    rating: 4.6,
    reviewCount: 52,
    category: "Electricidade",
  },
  {
    id: "5",
    title: "Explicações de Matemática",
    provider: "Excelência Académica",
    image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80",
    price: 4000,
    rating: 4.9,
    reviewCount: 38,
    category: "Explicações",
  },
  {
    id: "6",
    title: "Planejamento de Eventos",
    provider: "Celebration Events",
    image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?auto=format&fit=crop&w=800&q=80",
    price: 15000,
    rating: 4.7,
    reviewCount: 29,
    category: "Eventos",
  },
  {
    id: "7",
    title: "Entrega Expressa",
    provider: "Swift Delivery Angola",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    price: 3000,
    rating: 4.6,
    reviewCount: 112,
    category: "Entrega",
  },
  {
    id: "8",
    title: "Reparos Gerais para Casa",
    provider: "Handy Solutions",
    image: "https://images.unsplash.com/photo-1613323593608-abc90fec84ff?auto=format&fit=crop&w=800&q=80",
    price: 9000,
    rating: 4.4,
    reviewCount: 43,
    category: "Reparos",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "João Silva",
    location: "Luanda",
    content: "Eu uso o ServiAngola para todas as minhas necessidades de limpeza doméstica. Os prestadores são profissionais e o processo de reserva é simples.",
    rating: 5,
    service: "Limpeza de Casa",
  },
  {
    id: "2",
    name: "Maria Santos",
    location: "Benguela",
    content: "Encontrei um cabeleireiro incrível através desta plataforma. Economizei muito tempo procurando pela cidade!",
    rating: 4,
    service: "Corte de Cabelo",
  },
  {
    id: "3",
    name: "Pedro Neto",
    location: "Lubango",
    content: "O canalizador que contratei através do ServiAngola resolveu meu problema rapidamente e a um preço razoável. Recomendo muito esta plataforma.",
    rating: 5,
    service: "Canalização",
  },
];
