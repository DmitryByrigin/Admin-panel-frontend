import { auth } from '@/auth';
import Link from 'next/link';
import { logout } from '@/lib/actions';

const SingInButton = async () => {
  const session = await auth();

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <form action={logout}>
          <button type="submit" className="flex gap-4 ml-auto text-red-600">
            Sing Out
          </button>
        </form>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto item-center">
      <Link href={'/authorization/login'} className="flex gap-4 ml-auto text-green-600">
        <button
          //onClick={() => signIn('google')}
          className="text-green-600 ml-auto">
          Sign In
        </button>
      </Link>

      <Link href={'/authorization/register'} className="flex gap-4 ml-auto text-green-600">
        Sing up
      </Link>
    </div>
  );
};

export default SingInButton;
