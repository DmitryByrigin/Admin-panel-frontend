import React from 'react';
import { Backend_URL } from '@/lib/Contants';
import { Avatar } from '@nextui-org/react';

const getComments = async (id) => {
  const res = await fetch(`${Backend_URL}/blog//comments`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
};

export default async function GetComments() {
  return (
    <div className="flex items-start gap-4">
      <Avatar
        className="w-10 h-10 border "
        alt="@user1"
        src="/placeholder-user.jpg"
      ></Avatar>
      <div className="grid gap-1.5">
        <div className="flex items-center gap-2">
          <div className="font-semibold">@user1</div>
          <div className="text-gray-500 text-xs dark:text-gray-400">
            2 days ago
          </div>
        </div>
        <div>
          This is a sample comment. The content of the comment would go here.
        </div>
      </div>
    </div>
  );
}
