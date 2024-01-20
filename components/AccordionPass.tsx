'use client';
import { Accordion, AccordionItem, Button, Input } from '@nextui-org/react';
import React from 'react';
import { IconAlertCircle, IconKey } from '@tabler/icons-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Backend_URL } from '@/lib/Contants';
import { useSession } from 'next-auth/react';

type ChangePass = {
  currentPass: string;
  newPass: string;
  confirmPass: string;
};

export default function AccordionPass() {
  const { data: session } = useSession();
  const changePassword = async (data: ChangePass) => {
    try {
      const response = await fetch(Backend_URL + `/user/changePass`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 204) {
        const data = await response.json();
        console.log(data);
      } else {
        // Handle non-ok response if needed
        console.error('Non-ok response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be handled by the calling code
    }
  };
  const itemClasses = {
    base: 'py-0 w-full',
    title: 'font-normal text-medium',
    trigger:
      'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
    indicator: 'text-medium',
    content: 'text-small px-2',
  };
  const {
    register,
    watch,
    trigger,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    // resolver: zodResolver(schemaLogin),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ChangePass> = async (data) => {
    await changePassword(data);
    // trigger();
    // if (!isValid) return;
    // const dataForm = await login(formData);
    // console.log(dataForm?.error);
    // if (dataForm?.error) {
    //   setError('form', {
    //     type: 'manual',
    //     message: dataForm.error,
    //   });
    // }
  };

  const passChangeInputs = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Your password</h1>
      <Input
        {...register('currentPass')}
        value={watch('currentPass')}
        type={'password'}
        name="currentPass"
        placeholder="Enter your password"
        labelPlacement="outside"
        errorMessage={
          <strong>
            {errors.password
              ? errors.password.message
              : watch('currentPass') && errors.password?.message}
          </strong>
        }
        color={
          !watch('password')
            ? 'default'
            : errors.password
            ? 'danger'
            : 'success'
        }
      ></Input>
      <h1>New password</h1>
      <Input
        {...register('newPass')}
        value={watch('newPass')}
        type={'password'}
        name="newPass"
        placeholder="Enter new password"
        labelPlacement="outside"
        errorMessage={
          <strong>
            {errors.password
              ? errors.password.message
              : watch('email') && errors.password?.message}
          </strong>
        }
        color={
          !watch('password')
            ? 'default'
            : errors.password
            ? 'danger'
            : 'success'
        }
      ></Input>
      <h1>Repeat password</h1>
      <Input
        {...register('confirmPass')}
        value={watch('confirmPass')}
        type={'password'}
        name="confirmPass"
        placeholder="Repeat password"
        labelPlacement="outside"
        errorMessage={
          <strong>
            {errors.password
              ? errors.password.message
              : watch('email') && errors.password?.message}
          </strong>
        }
        color={
          !watch('password')
            ? 'default'
            : errors.password
            ? 'danger'
            : 'success'
        }
      ></Input>
      <Button type="submit">Confirm</Button>
    </form>
  );

  return (
    <div>
      <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
        variant="shadow"
        itemClasses={itemClasses}
      >
        <AccordionItem
          key="1"
          aria-label="Apps Permissions"
          startContent={<IconKey />}
          subtitle="Change your password"
          title="New password"
        >
          {passChangeInputs}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Pending tasks"
          classNames={{ subtitle: 'text-warning' }}
          startContent={<IconAlertCircle className="text-warning" />}
          subtitle="Complete your profile"
          title="Pending tasks"
        ></AccordionItem>
      </Accordion>
    </div>
  );
}
