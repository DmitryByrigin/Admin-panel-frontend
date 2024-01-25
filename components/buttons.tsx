'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { IconHeartFilled } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { Backend_URL } from '@/lib/Contants';
import { loginGoogle, uploadImage } from '@/lib/actions';
import { GoogleIcon } from '@/config/icons';
import { useForm } from 'react-hook-form';
import { ImageFeels } from '@/components/inputs';

interface SubmitButtonProps {
  isLoading?: boolean;
  buttonText: string;
}

export function LikeButton({
  id,
  initialLikes,
}: {
  id: number;
  initialLikes: number;
}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);

  const handleIncrementLike = async () => {
    try {
      const response = await fetch(Backend_URL + `/blog/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setLikes(data.countLikes);
      } else {
        // Handling non-ok response
        console.error('Non-ok response:', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error(
          `Error incrementing like: ${response.status} ${response.statusText}`,
        );
      }
    } catch (error) {
      console.error('Error handling like:', error);
      throw error;
    }
  };
  return (
    <Button className="text-red-500" onClick={handleIncrementLike}>
      <IconHeartFilled className="w-4 h-4" />
      {likes} Like
    </Button>
  );
}

export function SubmitButton({ isLoading, buttonText }: SubmitButtonProps) {
  // console.log(isLoading);
  return (
    <Button
      type="submit"
      className={`text-sm mt-3 font-normal text-default-600 bg-default-100 p-6  ${isLoading === null && 'text-default-600'}`}
      variant="flat"
      isLoading={isLoading}
    >
      {buttonText}
    </Button>
  );
}

export function UploadImage() {
  const {
    register,
    watch,
    trigger,
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    // resolver: zodResolver(schemaPost),
    mode: 'onChange',
  });
  const { data: session } = useSession();
  const onSubmit = async (data) => {
    // console.log('data');
    const formData = new FormData();

    if (data.file) {
      formData.append('image', data.file[0]);
    }

    await uploadImage(formData, session!);
  };

  const [fileName, setFileName] = useState('Выберите файл');
  const file = watch('file');
  useEffect(() => {
    if (file && file.length > 0) {
      setFileName(file[0].name);
    } else {
      setFileName('Необходимо выбрать хотя бы один файл');
    }
  }, [file]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageFeels register={register} errors={errors} watch={watch} />
      <SubmitButton buttonText="Upload image" />
    </form>
  );
}

export default function GoogleButton() {
  return (
    <form action={loginGoogle} className="my-3">
      <Button
        type="submit"
        value="google"
        className="text-sm font-normal text-default-600 bg-default-100 p-6"
        variant="flat"
        startContent={<GoogleIcon />}
      >
        Sign up with Google
      </Button>
    </form>
  );
}
