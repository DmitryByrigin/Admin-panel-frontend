import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Backend_URL } from '@/lib/Contants';
import { IncomingMessage } from 'http';
import { getServerSession } from 'next-auth';

type Props = {
  req: (Partial<IncomingMessage> & { body?: any }) | undefined;
  params: {
    id: string;
  };
};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  // const { data: session } = useSession();
  // const session = await getSession({ req: props.req });
  // console.log(session);

  const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${
        session && session.backendTokens ? session.backendTokens.accessToken : ''
      }`,
      'Content-Type': 'application/json',
    },
  });

  const user = await response.json();
  // console.log(user.name);
  // console.log(response);

  return (
    <div className="m-2 border rounded shadow overflow-hidden">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center">
        User Profile
      </div>

      <div className="grid grid-cols-2  p-2 gap-2">
        <p className="p-2 text-slate-400">Name:</p>
        <p className="p-2 text-black">{user.name}</p>
        <p className="p-2 text-slate-400">Email:</p>
        <p className="p-2 text-black">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
