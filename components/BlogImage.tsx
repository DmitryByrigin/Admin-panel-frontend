'use client';

import { Backend_URL } from '@/lib/Contants';
import { useEffect, useState } from 'react';

async function getImage(imageUrl: string) {
  const res = await fetch(`${Backend_URL}/image/${imageUrl}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

export default function BlogImage({ imageUrl }: { imageUrl: string }) {
  const [url, setUrl] = useState(imageUrl);
  const fetchImage = async () => {
    const res = await getImage(imageUrl);
    // const imageBlob = await res.blob();
    // const imageObjectURL = URL.createObjectURL(imageBlob);
    setUrl(res);
  };

  useEffect(() => {
    fetchImage();
  }, [imageUrl]);

  return (
    <img
      alt="Blog post cover"
      className="w-full h-[200px] object-cover mb-4"
      height="200"
      src={url}
      style={{
        aspectRatio: '500/200',
        objectFit: 'cover',
      }}
      width="500"
    />
  );
}
