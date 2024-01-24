'use client'
import React from 'react';
import { Avatar } from '@nextui-org/react';
import { User } from '@/lib/types';
import { format } from 'date-fns';
import { IconTrash } from '@tabler/icons-react';
import { Backend_URL } from '@/lib/Contants';
import { useSession } from 'next-auth/react';
import { createComment, RemoveComment } from '@/lib/actions';

interface CommentsProps {
  id: number
  text: string
  user: User
  createdAt: Date
  postId: number
}

export default function Comments({ id, text, user, createdAt, postId }: CommentsProps) {
  const { data: session } = useSession();

  async function GetDataForRemoveComment() {
    console.log(id);
    await RemoveComment(id, session, postId);
  }


  // const RemoveComment = async () => {
  //   try {
  //     const res = await fetch(Backend_URL + `/blog/${postId}/comments/${commentId}`, {
  //       method: 'DELETE',
  //       cache: 'no-store',
  //       headers: {
  //         Authorization: `Bearer ${session.backendTokens.accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //
  //     if (!res.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     // const data = res.json();
  //     // console.log(data);
  //     // return data;
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //     // return [];
  //   }
  // };


  const formattedDate = format(new Date(createdAt), 'yyyy-MM-dd/HH:mm:ss');
  const userImage = `${Backend_URL}/image/profile/${user.profileImage}`
  return (
    <div className="flex items-start gap-4">
      <Avatar
          showFallback
        className="w-10 h-10 border "
        alt={user.name}
        src={userImage}
      />
      <div>{user.role === 'ADMIN' && <IconTrash onClick={() => GetDataForRemoveComment()} />}</div>
      <div className="grid gap-1.5">
        <div className="flex items-center gap-2">
          <div className="font-semibold">@{user.name + ' ' + user.surname}</div>
          <div className="text-gray-500 text-xs dark:text-gray-400">
            {formattedDate}
          </div>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
