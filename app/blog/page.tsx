import { title } from '@/components/primitives';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'ADMIN') {
    // throw new Error('You need be an admin');
    // console.log('You need be an admin');
  }
  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
