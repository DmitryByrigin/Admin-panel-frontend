'use client';
import { useState } from 'react'; // Import useState
import { Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Backend_URL } from '@/lib/Contants';
import { useSession } from 'next-auth/react';

export default function NewCommentFill({ id }) {
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState(''); // State to hold the comment text

  const createComment = async () => {
    console.log(id);
    console.log(session);

    const response = await fetch(Backend_URL + `/blog/${id}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: commentText }), // Send the comment text in the body
    });

    // You can handle the response here, e.g., check if it was successful
  };

  const handleTextareaChange = (event) => {
    setCommentText(event.target.value); // Update the comment text state on textarea change
  };

  return (
    <div className="mt-6 grid w-full gap-2">
      <Textarea
        placeholder="Type your comment here."
        value={commentText}
        onChange={handleTextareaChange} // Attach onChange event handler
      />
      <Button variant="bordered" onClick={createComment}>
        Post Comment
      </Button>
    </div>
  );
}
