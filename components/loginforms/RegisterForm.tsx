'use client';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import main from '#/public/main.jpg';
import { ThemeSwitch } from '@/components/theme-switch';
import style from '@/app/authorization/login/page.module.css';
import { IconAt, IconEyeClosed, IconEyeFilled, IconUserCircle } from '@tabler/icons-react';
import NextLink from 'next/link';
import GoogleButton from '@/components/GoogleButton';
import PasswordInput from '@/components/loginforms/PasswordInput';
import { register as actionRegister } from '@/lib/actions';
import { IconUserSquareRounded } from '@tabler/icons-react';
import ChangeImage from '@/components/ChangeImage';
import { useFormState } from 'react-dom';
import { z } from 'zod';
import { log } from 'util';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema } from '@/lib/schema';
import { SubmitButtonRegister } from '../shared/SubmitButtonRegister';

export default function RegisterForm() {
  const {
    register,
    watch,
    trigger,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  // console.log(value);
  const [isLoading, setIsLoading] = useState(null);

  const onSubmit = async (formData: FormData) => {
    await trigger();
    if (!isValid) return;
    setIsLoading(true);
    const dataForm = await actionRegister(formData);
    setIsLoading(false);
    console.log(dataForm?.error);
    if (dataForm?.error) {
      setError('form', {
        type: 'manual',
        message: dataForm.error,
      });
    }
  };

  // @ts-ignore
  return (
    <section className="rounded-3xl shadow-xl overflow-hidden">
      <div className="md:flex w-full">
        <article className="hidden md:block w-1/2 bg-indigo-500 relative">
          <ChangeImage />
        </article>

        <article className={`w-full md:w-1/2 py-5 px-5 md:px-10 ${style.verticalCenter}`}>
          <div className="flex justify-end">
            <ThemeSwitch />
          </div>

          <div className="text-center mb-2">
            <h1 className="font-bold text-3xl">REGISTER</h1>
            <p>Enter your information to register</p>
          </div>

          <form action={onSubmit}>
            <section>
              <div className="flex flex-col mx-6">
                <article className="flex px-3 mb-2">
                  <Input
                    {...register('email')}
                    value={watch('email')}
                    type="email"
                    label="Email"
                    // variant="bordered"
                    placeholder="johnSmit@mail.com"
                    labelPlacement="outside"
                    // isInvalid={isInvalid}
                    color={!watch('email') ? 'default' : errors.email ? 'danger' : 'success'}
                    errorMessage={
                      <strong>
                        {errors.email
                          ? errors.email.message
                          : watch('email') && errors.email?.message}
                      </strong>
                    }
                    // onValueChange={setValue}
                    className="max-w-xs"
                    endContent={
                      <IconAt className="text-2xl text-default-400 pointer-events-none" />
                    }
                  />
                </article>

                <article className=" flex px-3 mb-2">
                  <Input
                    {...register('surname')}
                    value={watch('surname')}
                    type="surname"
                    label="Surname"
                    placeholder="Smith"
                    labelPlacement="outside"
                    color={!watch('surname') ? 'default' : errors.surname ? 'danger' : 'success'}
                    errorMessage={
                      <strong>
                        {errors.surname
                          ? errors.surname.message
                          : watch('surname') && errors.surname?.message}
                      </strong>
                    }
                    // onValueChange={setValue}
                    className="max-w-xs"
                    endContent={
                      <IconUserCircle className="text-2xl text-default-400 pointer-events-none" />
                    }
                  />
                  {/*<p>{errors.surname}</p>*/}
                </article>
              </div>

              <section className="flex mx-6">
                <article className="w-full px-3 mb-2">
                  <div className="flex">
                    <Input
                      {...register('name')}
                      value={watch('name')}
                      type="name"
                      label="Name"
                      placeholder="John"
                      labelPlacement="outside"
                      color={!watch('name') ? 'default' : errors.name ? 'danger' : 'success'}
                      errorMessage={
                        <strong>
                          {errors.name
                            ? errors.name.message
                            : watch('name') && errors.name?.message}
                        </strong>
                      }
                      className="max-w-xs"
                      endContent={
                        <IconUserSquareRounded className="text-2xl text-default-400 pointer-events-none" />
                      }
                      // onChange={(e) => validate('name', e.target.value)}
                      // onBlur={() => setErrors({ ...errors, name: undefined })}
                      // onFocus={(e) => validate('name', e.target.value)}
                    />
                    {/*<p>{errors.name}</p>*/}
                  </div>
                </article>
              </section>

              <section className="flex mx-6">
                <article className="w-full px-3 mb-3">
                  <div className="flex">
                    {/*<PasswordInput />*/}
                    <Input
                      {...register('password')}
                      value={watch('password')}
                      type={isVisible ? "text" : "password"}
                      label="Password"
                      name="password"
                      // variant="bordered"
                      placeholder="Enter your password"
                      labelPlacement="outside"
                      color={
                        !watch('password') ? 'default' : errors.password ? 'danger' : 'success'
                      }
                      errorMessage={
                        <strong>
                          {errors.password
                            ? errors.password.message
                            : watch('password') && errors.password?.message}
                        </strong>
                      }
                      className="max-w-xs"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}>
                          {isVisible ? (
                            <IconEyeFilled className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <IconEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                    />
                  </div>
                </article>
              </section>

              <article className="mb-3">
                <p className="mb-2 mx-8">
                  Already Registered?{' '}
                  <NextLink href="/authorization/login" className="text-blue-600">
                    Login
                  </NextLink>
                </p>
                <strong className=" mx-8 text-danger-400 text-sm">
                  {errors.form ? errors.form.message : watch('form') && errors.form?.message}
                </strong>
              </article>

              <section className="flex -mx-2">
                <article className="w-full px-3 mb-2">
                  <div className="flex items-center justify-center">
                    <SubmitButtonRegister isLoading={isLoading} />
                  </div>

                  <div className="flex items-center justify-center">
                    <hr className="flex flex-grow" />
                    <span className="px-3 m-1">or</span>
                    <hr className="flex flex-grow" />
                  </div>
                </article>
              </section>
            </section>
          </form>

          <div className="flex items-center justify-center">
            <GoogleButton />
          </div>
        </article>
      </div>
    </section>
  );
}
