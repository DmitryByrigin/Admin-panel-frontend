'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { IconHeartFilled } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { Backend_URL } from '@/lib/Contants';

export default function LikeButton({
  id,
  initialLikes,
}: {
  id: number;
  initialLikes: number;
}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);

  const handleIncrementLike = async () => {
    try {
      const response = await fetch(Backend_URL + `/blog/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLikes(data.countLikes);
      } else {
        // Handle non-ok response if needed
        console.error('Non-ok response:', response.status, response.statusText);
        throw new Error('Failed to increment like.');
      }
    } catch (error) {
      console.error('Error handling like:', error);
      throw error; // Rethrow the error to be handled by the calling code
    }
  };

  // useEffect(() => {
  //   handleIncrementLike();
  //   // console.log(likes);
  // }, []);
  // console.log(session);

  return (

      <Button className="text-red-500" onClick={handleIncrementLike}>
        <IconHeartFilled className="w-4 h-4" />
        {likes} Like
      </Button>

  );
}
