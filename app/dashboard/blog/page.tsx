'use client';

import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  Selection,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PostSchemaType, schemaPost } from '@/lib/schema';
import { useSession } from 'next-auth/react';
import { Backend_URL } from '@/lib/Contants';

const categoriesData = [
  {
    label: 'Technology',
    value: 'technology',
  },
  {
    label: 'Health',
    value: 'health',
  },
  {
    label: 'Business',
    value: 'business',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Environment',
    value: 'environment',
  },
];

export default function BlogPage() {
  const { data: session } = useSession();
  const [values, setValues] = useState(new Set(['technology', 'education']));
  // console.log(values.size);

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

  // watch('file').length = 0;

  const handleSelectionChange = (e: { target: { value: string } }) => {
    const selectedValues = new Set(e.target.value.split(','));
    setValues(selectedValues);

    setValue('categories', Array.from(selectedValues)); // Установите значение в форме
  };

  // console.log(values);
  let [fileUploaded, setFileUploaded] = useState(false);
  // console.log(watch('file').length);
  // let file = watch('file');

  // console.log(fileUploaded);

  const onSubmit = async (data: {
    file: (string | Blob)[];
    title: string | Blob;
    content: string | Blob;
    categories: any[];
  }) => {
    // console.log('Form Data:', data);
    // console.log('Form isValid:', isValid);
    // console.log('Submit button clicked');
    if (data.categories.length === 1) {
      data.categories.push('');
    }
    console.log(data.file[0]);

    // if (!isValid) return;

    const formData = new FormData();

    if (data.file) {
      formData.append('image', data.file[0]);
    }

    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.categories && Array.isArray(data.categories)) {
      data.categories.forEach((category: string | Blob) => {
        formData.append('categories', category);
      });
    }

    try {
      const res = await fetch(Backend_URL + '/blog', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });

      if (res.ok) {
        console.log('Blog creation successful');
        // setFileUploaded(true);
      } else {
        console.error('Blog creation failed');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

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

                <section className="flex mx-3">
                  <article className="w-full my-3">
                    <label
                      htmlFor="fileinput"
                      className={`relative py-3 px-4 text-sm leading-5 rounded-xl text-default-600 border-0 transition-all duration-200 overflow-hidden cursor-pointer ${
                        errors.file
                          ? 'text-red-500 bg-red-950'
                          : watch('file')?.length
                          ? 'text-green-500 bg-green-950'
                          : 'text-default-600 bg-default-100'
                      }`}
                    >
                      <i className="fa fa-upload "></i> Upload image
                      <input
                        {...register('file', { required: 'File is required' })}
                        id="fileinput"
                        accept="image/*"
                        type="file"
                        name="file"
                        className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </label>
                    <strong
                      className={errors.file ? 'text-danger' : 'text-success'}
                    >
                      {errors.file
                        ? errors.file.message
                        : watch('file')?.length
                        ? 'yes'
                        : ''}
                    </strong>
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

                      // className="max-w-xs"
                    />
                  </article>
                </section>
              </div>

              {/*<Checkbox defaultSelected className="mx-3 my-3">Save to history</Checkbox>*/}
              <div className="flex flex-col items-start mx-3 my-3">
                <Select
                  {...register('categories')}
                  name="categories"
                  label="Categories"
                  selectionMode="multiple"
                  placeholder="Select an categories"
                  selectedKeys={values}
                  className="max-w-xs"
                  onSelectionChange={setValues}
                  errorMessage={
                    <strong>
                      {values.size === 0 ? 'Category is required' : ''}
                    </strong>
                  }
                  color={
                    watch('categories')
                      ? 'success'
                      : values.size === 0
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

                <p className="text-small text-default-500">
                  Selected: {Array.from(values).join(', ')}
                </p>

                <Button
                  // onClick={handleSaveBlogPost}
                  type="submit"
                  className="text-sm font-normal text-default-600 bg-default-100 p-6 my-3"
                  variant="flat"
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
