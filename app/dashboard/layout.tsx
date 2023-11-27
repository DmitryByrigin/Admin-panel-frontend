import Link from 'next/link';
import { auth } from '@/auth';
import ProfilePage from './user/[id]/page';

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  const session = await auth();
  return (
    // <div className=" grid ">
    //   <div className="grid-cols-4 border-r shadow h-screen p-2">
    //     <Link href={`/dashboard/user/${session?.user.id}`}>User Profile</Link>
    //   </div>
    //   <div className="col-span-4">{props.children}</div>
    // </div>
    <ProfilePage
      req={undefined}
      params={{
        id: '',
      }}
    />
  );
};

export default DashBoardLayout;
