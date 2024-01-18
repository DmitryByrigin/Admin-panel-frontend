'use client';

import { useEffect, useState } from 'react';
import { Backend_URL } from '@/lib/Contants';
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import { IconEye } from '@tabler/icons-react';

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
    <div className="flex items-center space-x-2">
      <Button>
        <IconEye className="w-4 h-4" />
        {views} Views
      </Button>
    </div>
  );
};
