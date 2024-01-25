'use client';
import { useState } from 'react';
import { Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useSession } from 'next-auth/react';
import { createComment } from '@/lib/actions';

export default function NewCommentFill({ id }) {
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState(''); // State to hold the comment text

  async function GetDataForComment() {
    // console.log(id);
    await createComment(id, session, commentText);
  }

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
      <Button variant="bordered" onClick={GetDataForComment}>
        Post Comment
      </Button>
    </div>
  );
}
