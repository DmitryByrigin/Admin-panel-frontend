import React from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import BlogPage from './blog/page';
import ProfilePage from './user/[id]/page';

export default function DashboardPage() {
  return <BlogPage />;
}
