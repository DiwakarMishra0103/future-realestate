
import React from 'react';
import { Award, Building2, Users, MapPin } from 'lucide-react';
import { Project, Achievement, BlogPost } from './types';

export const PRIMARY_COLOR = '#0056b3';

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Arham Morya',
    location: 'Chembur East, Mumbai',
    category: 'Mumbai',
    status: 'Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    plotSize: '700 sqft',
    rate: '₹ 2.19 cr ++',
    description: 'A luxurious lifestyle awaits you at Arham Morya, featuring 2 & 3 BHK apartments with world-class amenities.'
  },
  {
    id: '2',
    name: 'Visa to Mumbai 3.0',
    location: 'Navi Mumbai',
    category: 'Navi Mumbai',
    status: 'Pre-Launch',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    plotSize: '1200 sqft',
    rate: '₹ 1.50 cr ++',
    description: 'Experience the future of living in the heart of Navi Mumbai with sustainable architecture and modern comforts.'
  },
  {
    id: '3',
    name: 'Emerald Heights',
    location: 'Mumbai 3.0',
    category: 'Mumbai 3.0',
    status: 'Ready',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    plotSize: '950 sqft',
    rate: '₹ 3.05 cr ++',
    description: 'Move into your dream home today. Ready-to-occupy luxury villas with private gardens and premium finishes.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', value: '10+', label: 'Years Experience', icon: 'Award' },
  { id: '2', value: '50+', label: 'Projects', icon: 'Building2' },
  { id: '3', value: '1000+', label: 'Happy Families', icon: 'Users' },
  { id: '4', value: '3', label: 'Cities', icon: 'MapPin' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Arham Morya Construction Milestone Reached',
    date: 'Oct 12, 2024',
    category: 'CONSTRUCTION UPDATE',
    excerpt: 'We are thrilled to announce the successful completion of the 15th floor slab at Arham Morya.',
    content: 'Future Group is committed to timely delivery. The construction at Arham Morya is progressing at a rapid pace. Our team of engineers and architects are working tirelessly to ensure every detail meets our rigorous quality standards. The exterior facade work has commenced, and we are on track for possession by Q4 2025.',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800',
    author: 'PR Team'
  },
  {
    id: '2',
    title: 'Why Mumbai 3.0 is the Next Investment Frontier',
    date: 'Sep 28, 2024',
    category: 'MARKET NEWS',
    excerpt: 'Discover why smart investors are shifting their focus to the newest hub of real estate growth.',
    content: 'The real estate landscape of Mumbai is evolving. With new infrastructure projects connecting previously underserved areas, Mumbai 3.0 has emerged as the hotspot for both residential and commercial investments. Future Group projects in this region have seen a 25% appreciation in value over the last 12 months.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    author: 'Analyst Group'
  },
  {
    id: '3',
    title: 'Annual Customer Appreciation Day 2024',
    date: 'Aug 15, 2024',
    category: 'EVENT',
    excerpt: 'Celebrating our 1000+ happy families with a day of joy, entertainment, and community.',
    content: 'At Future Group, our customers are our biggest assets. This year\'s appreciation day was a grand success with over 500 families joining us for the festivities. We unveiled our vision for 2030 and distributed loyalty rewards to our long-term patrons.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    author: 'Event Dept'
  }
];

export const getIcon = (name: string, size = 32) => {
  switch (name) {
    case 'Award': return <Award size={size} />;
    case 'Building2': return <Building2 size={size} />;
    case 'Users': return <Users size={size} />;
    case 'MapPin': return <MapPin size={size} />;
    default: return null;
  }
};
