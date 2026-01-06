
export interface Project {
  id: string;
  name: string;
  location: string;
  category: string;
  status: 'Construction' | 'Ready' | 'Pre-Launch';
  image: string;
  plotSize: string;
  rate: string;
  description: string;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectName?: string;
}

export interface Achievement {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: 'CONSTRUCTION UPDATE' | 'MARKET NEWS' | 'EVENT';
  excerpt: string;
  content: string;
  image: string;
  author: string;
}
