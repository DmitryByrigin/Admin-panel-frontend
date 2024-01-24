import { auth } from '@/auth';
import { Backend_URL } from '@/lib/Contants';
import { IncomingMessage } from 'http';
import defaultIconUser from "@/public/user-circle.svg"

import React from 'react';
import { Card, CardBody, Image } from '@nextui-org/react';
import AccordionPass from '../../../../components/AccordionPass';
import ProfileImage from '@/components/ProfileImage';
import { Session } from 'next-auth';

type Props = {
  req: (Partial<IncomingMessage> & { body?: any }) | undefined;
  params: {
    id: string;
  };
};

export async function getUser(id: string, session: Session | null) {
  const response = await fetch(Backend_URL + `/user/${id}`, {
    next: { tags: ['userData'] },
    method: 'GET',
    headers: {
      authorization: `Bearer ${
        session && session.backendTokens
          ? session.backendTokens.accessToken
          : ''
      }`,
      'Content-Type': 'application/json',
    },
  });

  const user = await response.json();
  return user;
}

const ProfilePage = async ({ params: { id } }: Props) => {
  const session = await auth();

  const user = await getUser(id, session);


  // console.log(user);

  // if (session?.user.role !== 'ADMIN') {
  //   // throw new Error('You need be an admin');
  //   console.log('You need be an admin');
  // }

  return (
    <>
      <h1 className="text-2xl font-bold pb-3 pl-3">User profile</h1>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 mx-3"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cove"
                height={200}
                src={user.profileImage ? `${Backend_URL}/image/profile/${user.profileImage}` : defaultIconUser.src}
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="text-large font-medium mt-2">
                    {session?.user.name} {session?.user.surname} ({session?.user.role})
                  </h1>
                </div>
              </div>{' '}
              <div className="mt-3">
                {' '}
                <AccordionPass />
              </div>

            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfilePage;
