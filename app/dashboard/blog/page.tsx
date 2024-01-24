'use client';

import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PostSchemaType, schemaPost } from '@/lib/schema';
import { useSession } from 'next-auth/react';
import { postBlog } from '@/lib/actions';
import {IconDownload} from "@tabler/icons-react";

const categoriesData = [
  {
    label: 'Technology',
    value: 'Technology',
  },
  {
    label: 'Health',
    value: 'Health',
  },
  {
    label: 'Business',
    value: 'Business',
  },
  {
    label: 'Education',
    value: 'Education',
  },
  {
    label: 'Environment',
    value: 'Environment',
  },
];
type FormValues = {
  file: Array<(string | Blob)>
  title: string;
  content: string;
  categories: Array<string>;
}
export default function BlogPage() {
  const { data: session } = useSession();
  // const [values, setValues] = useState(new Set(['technology']));

  const [isLoading, setIsLoading] = useState(null);


  const {
    register,
    watch,
    trigger,
    setError,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaPost),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    await trigger();

    if (!isValid) return;

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

    const result = await postBlog(formData, session);

    setIsLoading(false);
    return result;
  };


    const [fileName, setFileName] = useState('Выберите файл');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('Необходимо выбрать хотя бы один файл');
    }
  };

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
        <h1 className='text-2xl font-bold pb-3 pl-3'>Blog</h1>
        <Card
          isBlurred
          className='border-none bg-background/60 dark:bg-default-100/50 mx-3'
          shadow='sm'
        >
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6 md:gap-4 justify-center items-stretch'>
                {/* <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cove"
                height={200}
                shadow="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                width="100%"
              />
            </div> */}

                <section className='flex mx-3 flex-row'>
                  <article className='w-full mt-3 flex '>

                    <div className="flex w-full">
                      <label htmlFor="file_input"
                             className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <IconDownload size={60}/>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.SIZE
                            3mb)</p>
                        </div>
                        <input
                            {...register('file', {required: 'File is required'})}
                            id='file_input'
                            accept='image/*'
                            type='file'
                            name='file'
                            className='hidden'
                            // onChange={handleFileChange}
                        />

                        <p className='text-sm text-gray-900 pb-3 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'>{fileName}</p>
                      </label>
                    </div>

                  </article>
                </section>
                <strong
                    className={errors.file ? 'text-danger text-sm ml-3' : 'text-success text-sm ml-3'}
                >
                  {errors.file
                      ? errors.file.message
                      : watch('file')?.length
                          ? 'Image uploaded'
                          : ''}
                </strong>
                <p>{}</p>

                <section className='flex mx-3'>
                  <article className='w-full'>
                    <Input
                        {...register('title')}
                        defaultValue={watch('title')}
                        type='title'
                        label='Title'
                        name='title'
                        placeholder='Enter blog title'
                        labelPlacement='outside'
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
                <section className='flex mx-3'>
                  <article className='w-full'>
                    <Textarea
                        {...register('content')}
                        defaultValue={watch('content')}
                        type='content'
                        name='content'
                        variant='bordered'
                        labelPlacement='outside'
                        label='Сontent'
                        placeholder='Enter your content'
                        // defaultValue="NextUI is a React UI library with..."
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

              {/*<Checkbox defaultSelected className="mx-3 my-3">Save to history</Checkbox>*/}
              <div className='flex flex-col items-start mx-3 my-3'>
                <Controller control={control} rules={{required: true}}
                            render={({field: {onChange, value}, fieldState: {invalid, error}}) => {
                              return (
                                  <Select
                                  {...register('categories')}
                                  name='categories'
                                  label='Categories'
                                  selectionMode='multiple'
                                  value={value}
                                  placeholder='Select an categories'
                                  className='max-w-xs'
                                  // errorMessage={error?.message}
                                  onChange={(event) => onChange((event.target.value === '' ? undefined : event.target.value.split(',')))}
                                  errorMessage={
                                    <strong>
                                      {error?.message}
                                    </strong>
                                  }
                                  color={
                                    value === undefined
                                      ? 'default'
                                      : error?.message
                                        ? 'danger'
                                        : 'success'
                                  }
                                >
                                  {categoriesData.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                      {category.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              );
                            }} name='categories' />

                <Button
                    type='submit'
                    className={`text-sm font-normal text-default-600 bg-default-100 p-6 my-3 ${isLoading === null ? 'text-default-600' : 'text-green-500'}`}
                    variant='flat'
                    isLoading={isLoading}
                >
                  Create post
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
