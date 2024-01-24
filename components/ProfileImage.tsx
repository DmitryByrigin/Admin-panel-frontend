'use client';
import { Backend_URL } from '@/lib/Contants';
import { schemaPost } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import {IconDownload} from '@tabler/icons-react'
import { revalidatePath, revalidateTag } from 'next/cache';
import { uploadImage } from '@/lib/actions';

export default function ProfileImage() {
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
    // resolver: zodResolver(schemaPost),
    mode: 'onChange',
  });
  // console.log(watch('file'));

  const onSubmit = async (data) => {
    console.log("data");
    const formData = new FormData();

    if (data.file) {
      formData.append('image', data.file[0]);
    }

    await uploadImage(formData, session!);
  };


  return (
    <section className="flex">
      <article className="my-3 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>




          <div className="flex items-center justify-center w-full mb-3">
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IconDownload size={60}/>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                  drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.SIZE 3mb)</p>
              </div>
              <input
                  {...register('file')}
                  id="dropzone-file"
                  accept="image/*"
                  type="file"
                  name="file"
                  className="hidden"
              />
            </label>
          </div>


          <Button
              type="submit"
              className={`relative py-3 px-4 text-sm leading-5 rounded-xl text-default-600 border-0 transition-all duration-200 overflow-hidden cursor-pointer ${
                  errors.file
                      ? 'text-red-500 bg-red-950'
                      : watch('file')?.length
                          ? 'text-green-500 bg-green-950'
                          : ''
              }`}
          >
            Upload profile image
          </Button>
          <strong
              className={`mx-2 ${errors.file ? 'text-danger' : 'text-success'}`}
          >
            {errors.file
                ? errors.file.message
                : watch('file')?.length
                    ? 'Success'
                    : ''}
          </strong>
        </form>

      </article>
    </section>
  );
};