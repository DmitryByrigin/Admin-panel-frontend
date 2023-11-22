import Link from 'next/link';
import { auth } from '@/auth';

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  const session = await auth();
  return (
    <div className=" grid grid-cols-12">
      <div className="grid-cols-4 border-r shadow h-screen p-2">
        <Link href={`/dashboard/user/${session?.user.id}`}>User Profile</Link>
      </div>
      <div className="col-span-4">{props.children}</div>
    </div>
  );
};

export default DashBoardLayout;
