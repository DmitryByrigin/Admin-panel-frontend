'use client';
import React from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import {
  IconBoxMultiple1,
  IconBoxMultiple2,
  IconEdit,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaPost } from '@/lib/schema';
import { Post } from '@/lib/types';
import { updateBlogPost } from '@/lib/actions';
import { CategoriesFeels, ImageFeels } from '@/components/inputs';

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
    // console.log(data);
    await trigger();

    if (!isValid) return;

    const formData = createFormData(data);
    await updateBlogPost(formData, post, session);
  };

  return (
    <>
      <Button onPress={onOpen} color="default">
        <IconEdit size={18} /> Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col ml-4">
                Edit post
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        autoFocus
                        endContent={<IconBoxMultiple1 />}
                        type="title"
                        label="Title"
                        name="title"
                        className="my-3"
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
                      />
                    )}
                  />
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        endContent={<IconBoxMultiple2 />}
                        label="Content"
                        className="my-3"
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
                      />
                    )}
                  />
                  <section className="flex ">
                    <article className="w-full my-3">
                      <ImageFeels
                        register={register}
                        errors={errors}
                        watch={watch}
                      />
                    </article>
                  </section>

                  <div className="flex flex-col items-start mx-3 my-3">
                    <CategoriesFeels control={control} register={register} />
                  </div>
                  <Button
                    type="submit"
                    className="text-sm font-normal text-default-600 bg-default-100 p-6 my-3"
                    variant="flat"
                  >
                    Update post
                  </Button>

                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                    className="mx-3"
                  >
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
