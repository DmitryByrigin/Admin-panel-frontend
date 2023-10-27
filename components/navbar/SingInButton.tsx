'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const SingInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <Link href={'/api/auth/singout'} className="flex gap-4 ml-auto text-red-600">
          Sing Out
        </Link>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto item-center">
      <Link href={'/api/auth/signin'} className="flex gap-4 ml-auto text-green-600">
        Sing in
      </Link>

      <Link href={'/signup'} className="flex gap-4 ml-auto text-green-600">
        Sing up
      </Link>
    </div>
  );
};

export default SingInButton;
