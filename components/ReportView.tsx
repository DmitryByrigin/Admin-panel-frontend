'use client';

import { useEffect, useState } from 'react';
import { Backend_URL } from '@/lib/Contants';
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import { IconEye } from '@tabler/icons-react';
import {Chip} from "@nextui-org/react";

export const ReportView: React.FC<{ id: number }> = ({ id }) => {
  const { data: session } = useSession();
  const [views, setViews] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Backend_URL + `/blog/${id}/view`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      // console.log(response);

      if (response.ok) {
        const data = await response.json();
        setViews(data.views.length);
        // console.log(data.views.length);
      } else {
        // Handle non-ok response if needed
        console.error('Non-ok response:', response.status, response.statusText);
      }
    };
    fetchData();
  }, [id]);

  return (


      <Chip
          className='w-60 h-10 rounded-xl cursor-default'
          startContent={<IconEye size={20} className='mr-1 ml-2'/>}
          color="default"
      >
        {views} Views
      </Chip>



  );
};
