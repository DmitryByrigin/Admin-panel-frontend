'use client';

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  Selection,
} from '@nextui-org/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PostSchemaType, schemaLogin, schemaPost } from '@/lib/schema';
import { Checkbox } from '@nextui-org/checkbox';
import { login } from '@/lib/actions';
import { Backend_URL } from '@/lib/Contants';
import { useSession } from 'next-auth/react';

const categoriesData = [
  {
    label: 'Cat',
    value: 'cat',
    description: 'The second most popular pet in the world',
  },
  {
    label: 'Dog',
    value: 'dog',
    description: 'The most popular pet in the world',
  },
  {
    label: 'Elephant',
    value: 'elephant',
    description: 'The largest land animal',
  },
];

export default function BlogPage() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['text']));
  const { data: session } = useSession();

  // @ts-ignore
  const [values, setValues] = React.useState<Selection>(
    new Set(['cat', 'dog']),
  );
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );
  const {
    register,
    watch,
    trigger,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(schemaPost),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<PostSchemaType> = async (data) => {
    console.log(session);

    trigger(); // Trigger validation

    console.log(errors);
    if (!isValid) return;

    // if (errors.file || errors.title || errors.content) {
    //   // If there are errors in file, title, or content fields, do not proceed
    //   return;
    // }

    const res = await fetch(Backend_URL + '/blog', {
      method: 'POST',

      body: JSON.stringify({
        image: data.file[0].name,
        title: data.title,
        content: data.content,
        categories: data.categories,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });
    console.log(data.file[0].name);

    if (res.status === 409) {
      return { error: 'You have already been registered before!' };
    }
    return res.json();
  };

  return (
    <>
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
                        ? 'text-green-500 bg-green-950 hover:bg-green-900'
                        : 'text-default-600 bg-default-100'
                    }`}
                  >
                    <i className="fa fa-upload "></i> Upload image
                    <input
                      {...register('file', { required: 'File is required' })}
                      id="fileinput"
                      accept="image/*"
                      type="file"
                      // max={10000000}
                      name="file"
                      className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                  <strong
                    className={!errors.file ? 'text-success' : 'text-danger'}
                  >
                    {errors.file
                      ? errors.file.message
                      : watch('file') && errors.file?.message}
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
                label="Favorite Animal"
                selectionMode="multiple"
                placeholder="Select an animal"
                selectedKeys={values}
                className="max-w-xs"
                onSelectionChange={(selected) => {
                  setValues(selected);
                  trigger('categories');
                }}
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
    </>
  );
}
