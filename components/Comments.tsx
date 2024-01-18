import React from 'react';
import { Avatar } from '@nextui-org/react';

// const GetComments = async (id: number) => {
//   try {
//     const res = await fetch(Backend_URL + `/blog/${id}/comments`, {
//       cache: 'no-store',
//     });
//
//     if (!res.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const data = res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     return [];
//   }
// };

export default async function Comments({ id, text, user, createdAt }) {
  // const commentsData = await GetComments(id);
  // console.log(text);
  return (
    <div className="flex items-start gap-4">
      <Avatar
        className="w-10 h-10 border "
        alt="@user1"
        src="/placeholder-user.jpg"
      ></Avatar>
      <div className="grid gap-1.5">
        <div className="flex items-center gap-2">
          <div className="font-semibold">@{user}</div>
          <div className="text-gray-500 text-xs dark:text-gray-400">
            {createdAt}
          </div>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
