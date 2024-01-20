'use client';
import { Backend_URL } from '@/lib/Contants';
import { schemaPost } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export default function ProfileImage(id: string) {
  const { data: session } = useSession();

  const {
    register,
    watch,
    trigger,
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schemaPost),
    mode: 'onChange',
  });
  console.log(watch('file'));

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.file) {
      formData.append('image', data.file[0]);
    }
    console.log('wefwef');

    try {
      const res = await fetch(Backend_URL + `/user/${id}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });

      if (res.ok) {
        console.log('Blog creation successful');
      } else {
        console.error('Blog creation failed');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <section className="flex ">
      <article className="w-full my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            type="submit"
            htmlFor="fileinput"
            className={`relative py-3 px-4 text-sm leading-5 rounded-xl text-default-600 border-0 transition-all duration-200 overflow-hidden cursor-pointer ${
              errors.file
                ? 'text-red-500 bg-red-950'
                : watch('file')?.length
                ? 'text-green-500 bg-green-950'
                : 'text-default-600 bg-default-100'
            }`}
          >
            <input
              {...register('file', { required: 'File is required' })}
              id="fileinput"
              accept="image/*"
              type="file"
              name="file"
              className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
            />
            Upload profile image
          </Button>
        </form>

        <strong
          className={`mx-1 ${errors.file ? 'text-danger' : 'text-success'}`}
        >
          {errors.file
            ? errors.file.message
            : watch('file')?.length
            ? 'Image uploaded'
            : ''}
        </strong>
      </article>
    </section>
  );
}
