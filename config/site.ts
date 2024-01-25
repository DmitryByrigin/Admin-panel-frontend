import { IconMessageShare } from '@tabler/icons-react';
import { BsPeople } from 'react-icons/bs';

export type SiteConfig = typeof siteConfig;

export const categoriesForAsidePanel = [
  'All',
  'Technology',
  'Health',
  'Business',
  'Education',
  'Environment',
];

export const categoriesData = [
  {
    label: 'Technology',
    value: 'Technology',
  },
  {
    label: 'Health',
    value: 'Health',
  },
  {
    label: 'Business',
    value: 'Business',
  },
  {
    label: 'Education',
    value: 'Education',
  },
  {
    label: 'Environment',
    value: 'Environment',
  },
];

export const sidebarItems = [
  {
    name: 'Create post',
    href: '/dashboard',
    icon: IconMessageShare,
  },
  {
    name: 'Blog',
    href: '/dashboard/blog/categories',
    icon: BsPeople,
  },
];

export const siteConfig = {
  name: 'Next.js + NextUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [],
  links: {
    github:
      'https://github.com/DmitryByrigin/Admin-panel-frontend/tree/development',
  },
};
