import { title } from '@/components/primitives';
import {auth} from "@/auth";

export default async function BlogPage() {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') {
    throw new Error('You need be an admin');
    // console.log('You need be an admin');
  }
  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
