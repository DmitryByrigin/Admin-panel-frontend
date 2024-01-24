'use client';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem, SelectedItems,
  Textarea,
} from '@nextui-org/react';
import { IconBoxMultiple1, IconBoxMultiple2, IconEdit, IconDownload } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaPost } from '@/lib/schema';
import { Backend_URL } from '@/lib/Contants';
import { Post } from '@/lib/types';
import { updateBlogPost } from '@/lib/actions';

const categoriesData: Array<{label: string, value: string}> = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Health', value: 'Health' },
  { label: 'Business', value: 'Business' },
  { label: 'Education', value: 'Education' },
  { label: 'Environment', value: 'Environment' },
];

type FormValues = {
  file: string | Blob;
  title: string;
  content: string;
  categories: Array<string>;
};

interface EditPostProps {
  post: Post;
}

export default function EditPost({ post }: EditPostProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();


  const {
    watch,
    register,
    trigger,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaPost),
    mode: 'onChange',
    defaultValues: {
      title: post.title,
      content: post.content,
      categories: post.categories,
    },
  });


  const [fileName, setFileName] = useState('Выберите файл');


  const file = watch('file');
  useEffect(() => {
    if (file && file.length > 0) {
      setFileName(file[0].name);
    } else {
      setFileName('Необходимо выбрать хотя бы один файл');
    }
  }, [file]);


  const createFormData = (data) => {
    const formData = new FormData();

    if (data.file) {
      formData.append('image', data.file[0]);
    }

    formData.append('title', data.title);
    formData.append('content', data.content);

    if (Array.isArray(data.categories)) {
      data.categories.forEach((category: string) => {
        formData.append('categories[]', category);
      });
    } else {
      formData.append('categories[]', data.categories);
    }

    return formData;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    await trigger();

    if (!isValid) return;

    const formData = createFormData(data);
    await updateBlogPost(formData, post, session);
  };


  return (
    <>
      <Button onPress={onOpen} color="default">
        <IconEdit size={18}/> Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col ml-4">Edit post</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                      name="title"
                      control={control}
                      render={({field}) =>
                          <Input
                              {...field}
                              autoFocus
                              endContent={<IconBoxMultiple1/>}
                              type="title"
                              label="Title"
                              name="title"
                              className='my-3'
                              placeholder="Edit title"

                              variant="bordered"
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
                          />}
                  />
                  <Controller
                      name="content"
                      control={control}
                      render={({field}) =>
                          <Textarea
                              {...field}
                              endContent={<IconBoxMultiple2/>}
                              label="Content"
                              className='my-3'
                              type="text"
                              placeholder="Edit content"
                              variant="bordered"
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
                          />}
                  />
                  <section className="flex ">
                    <article className="w-full my-3">
                      <div className="flex w-full">
                        <label htmlFor="file_input"
                               className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <IconDownload size={60}/>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                className="font-semibold">Click to upload</span> or
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
                      <p className={errors.file ? 'text-danger' : 'text-success'}>
                        {errors.file ? errors.file.message : watch('file', [])?.length ? 'Image uploaded' : ''}

                      </p>
                    </article>
                  </section>

                  <div className='flex flex-col items-start mx-3 my-3'>
                    <Controller control={control} rules={{required: true}}
                                render={({field: {onChange, value}, fieldState: {invalid, error}}) => {
                                  return (
                                      <Select
                                          {...value}
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
                                }} name='categories'/>
                    </div>
                    <Button type="submit" className="text-sm font-normal text-default-600 bg-default-100 p-6 my-3"
                            variant="flat">
                      Update post
                    </Button>

                    <Button color="danger" variant="flat" onPress={onClose} className='mx-3'>
                      Close
                    </Button>
                </form>
              </ModalBody>
            </>
            )}
        </ModalContent>
      </Modal>
    </>
);
}
