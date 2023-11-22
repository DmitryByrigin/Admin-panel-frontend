'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import registerDark from '#/public/registerdark.jpg';
import registerLight from '#/public/registerlight.jpg';
import loginDark from '#/public/loginDark.jpg';
import loginLight from '#/public/loginLight.jpg';
import { Skeleton } from '@nextui-org/react';
import { Card } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

function ChangeImage() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {}, [theme]);
  // console.log(theme)
  if (isClient) {
    let imageDark, imageLight;
    if (pathname === '/authorization/register') {
      imageDark = registerDark;
      imageLight = registerLight;
    } else if (pathname === '/authorization/login') {
      imageDark = loginDark;
      imageLight = loginLight;
    }
    if (theme === 'light') {
      return (
        <NextImage
          className="w-full h-full object-cover object-center rounded-none"
          width={500}
          height={500}
          alt="NextUI hero Image"
          src={imageLight.src}
        />
      );
    }
    if (theme === 'dark') {
      return (
        <NextImage
          className="w-full h-full object-cover object-left rounded-none"
          width={500}
          height={500}
          alt="NextUI hero Image"
          src={imageDark.src}
        />
      );
    }
  }
  return (
    <Skeleton className="w-full h-full">
      <NextImage
        className="w-full h-full object-cover object-left rounded-none"
        width={500}
        height={500}
        alt="NextUI hero Image"
        src={registerDark.src}
      />
    </Skeleton>
  );
}

export default ChangeImage;
