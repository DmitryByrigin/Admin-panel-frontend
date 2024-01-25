'use client';

import { Card, CardBody, Input, Textarea } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaPost } from '@/lib/schema';
import { useSession } from 'next-auth/react';
import { postBlog } from '@/lib/actions';
import { SubmitButton } from '@/components/buttons';
import { CategoriesFeels, ImageFeels } from '@/components/inputs';

type FormValues = {
  file: FileList;
  title: string;
  content: string;
  categories: Array<string>;
};

export default function BlogPage() {
  const { data: session } = useSession() || {};
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const {
    register,
    watch,
    trigger,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaPost),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    await trigger();

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    if (data.file) {
      formData.append('image', data.file[0]);
    }

    formData.append('title', data.title);
    formData.append('content', data.content);

    if (data.categories) {
      data.categories.forEach((category: string) => {
        formData.append('categories[]', category);
      });
    }

    try {
      const result = await postBlog(formData, session);
      // console.log(session);
      setIsLoading(false);
      return result;
    } catch (error) {
      // console.error('Error posting blog:', error.message);
      setIsLoading(false);
    }
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
    <>
      <section>
        <h1 className="text-2xl font-bold pb-3 pl-3">Blog</h1>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 mx-3"
          shadow="sm"
        >
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6 md:gap-4 justify-center items-stretch">
                <section className="flex mx-3 flex-row">
                  <article className="w-full mt-3 flex ">
                    <div className="flex w-full">
                      <ImageFeels
                        register={register}
                        errors={errors}
                        watch={watch}
                      />
                    </div>
                  </article>
                </section>

                <section className="flex mx-3">
                  <article className="w-full">
                    <Input
                      {...register('title')}
                      defaultValue={watch('title')}
                      type="title"
                      label="Title"
                      name="title"
                      placeholder="Enter blog title"
                      labelPlacement="outside"
                      errorMessage={
                        <strong>
                          {errors.title
                            ? errors.title.message
                            : watch('title') && errors.title?.message}
                        </strong>
                      }
                      color={
                        !watch('title')
                          ? 'default'
                          : errors.title
                            ? 'danger'
                            : 'success'
                      }
                    />
                  </article>
                </section>
                <section className="flex mx-3">
                  <article className="w-full">
                    <Textarea
                      {...register('content')}
                      defaultValue={watch('content')}
                      type="content"
                      name="content"
                      variant="bordered"
                      labelPlacement="outside"
                      label="Сontent"
                      placeholder="Enter your content"
                      errorMessage={
                        <strong>
                          {errors.content
                            ? errors.content.message
                            : watch('content') && errors.content?.message}
                        </strong>
                      }
                      color={
                        !watch('content')
                          ? 'default'
                          : errors.content
                            ? 'danger'
                            : 'success'
                      }
                    />
                  </article>
                </section>
              </div>

              <div className="flex flex-col items-start mx-3 my-3">
                <CategoriesFeels control={control} register={register} />

                <SubmitButton isLoading={isLoading} buttonText="Create Post" />
              </div>
            </form>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
