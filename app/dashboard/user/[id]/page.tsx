import { auth } from '@/auth';
import { Backend_URL } from '@/lib/Contants';
import { IncomingMessage } from 'http';

import React from 'react';
import { Card, CardBody, Image } from '@nextui-org/react';
// import { IconAlertCircle, IconKey } from '@tabler/icons';
// import { NextIcon } from './NextIcon';
import AccordionPass from '../../../../components/AccordionPass';
import ProfileImage from '@/components/ProfileImage';

type Props = {
  req: (Partial<IncomingMessage> & { body?: any }) | undefined;
  params: {
    id: string;
  };
};

const ProfilePage = async ({ params: { id } }: Props) => {
  const session = await auth();

  const response = await fetch(Backend_URL + `/user/${id}`, {
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="text-large font-medium mt-2">
                    {session.user.name} {session.user.surname}
                  </h1>

                  <h3 className="font-semibold text-foreground/90">
                    {session.user.role}
                  </h3>
                  <p className="text-small text-foreground/80">About</p>
                </div>
              </div>{' '}
              <div>
                {' '}
                <AccordionPass />
              </div>
              <ProfileImage id={id} />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfilePage;
