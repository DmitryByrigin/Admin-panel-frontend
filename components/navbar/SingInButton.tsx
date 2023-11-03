'use client';
import { signOut, useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const SingInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="flex gap-4 ml-auto text-red-600">
          Sing Out
        </button>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto item-center">
      <Link href={'/api/auth/signin'} className="flex gap-4 ml-auto text-green-600">
        <button onClick={() => signIn('google')} className="text-green-600 ml-auto">
          Sign In
        </button>
      </Link>

      <Link href={'/signup'} className="flex gap-4 ml-auto text-green-600">
        Sing up
      </Link>
    </div>
  );
};

export default SingInButton;
