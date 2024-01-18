'use client';
import { Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Post } from '@/lib/types';
import { Backend_URL } from '@/lib/Contants';
import { useSession } from 'next-auth/react';

export default function CommentFill() {
  const { data: session } = useSession();
  async function createComment(id: number): Promise<Post> {
    console.log(session);
    const response = await fetch(Backend_URL + `/blog/${id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  }
  return (
    <div className="mt-6 grid w-full gap-2">
      <Textarea placeholder="Type your comment here." />
      <Button variant="bordered" onClick={createComment}>
        Post Comment
      </Button>
    </div>
  );
}
