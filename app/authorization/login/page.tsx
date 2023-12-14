'use client';
import { Input } from '@nextui-org/input';
import { ThemeSwitch } from '@/components/theme-switch';
import { IconAt, IconEyeClosed, IconEyeFilled, IconUserCircle } from '@tabler/icons-react';

import NextLink from 'next/link';
import GoogleButton from '@/components/GoogleButton';
import { login } from '@/lib/actions';
import ChangeImage from '@/components/ChangeImage';
import React, {useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema, schemaLogin } from '@/lib/schema';
import { SubmitButtonLogin } from '@/components/shared/SubmitButtonLogin';

export default function LoginForm() {
  const {
    register,
    watch,
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schemaLogin),
    mode: 'onChange',
  });

  // console.log(errors);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (formData: FormData) => {
    trigger();
    if (!isValid) return;
    const dataForm = await login(formData);
    // console.log(dataForm?.error);
    if (dataForm?.error) {
      setError('form', {
        type: 'manual',
        message: dataForm.error,
      });
    }
  };

  return (
    <section className="rounded-3xl shadow-xl overflow-hidden">
      <div className="md:flex w-full">
        <article className="hidden md:block w-1/2 bg-indigo-500 relative">
          <ChangeImage />
        </article>

        <article className={`w-full md:w-1/2 py-5 px-5 md:px-10`}>
          <div className="flex justify-end">
            <ThemeSwitch />
          </div>

          <div className="text-center mb-2">
            <h1 className="font-bold text-3xl">Login</h1>
            <p>Enter your information to login</p>
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
                    placeholder="johnSmit@mail.com"
                    labelPlacement="outside"
                    errorMessage={
                      <strong>
                        {errors.email
                          ? errors.email.message
                          : watch('email') && errors.email?.message}
                      </strong>
                    }
                    color={!watch('email') ? 'default' : errors.email ? 'danger' : 'success'}
                    className="max-w-xs"
                    endContent={
                      <IconAt className="text-2xl text-default-400 pointer-events-none" />
                    }
                  />
                </article>

                <section className="flex mx-3">
                  <article className="w-full">
                    <div className="flex">
                      <Input
                        {...register('password')}
                        value={watch('password')}
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        labelPlacement="outside"
                        errorMessage={
                          <strong>
                            {errors.password
                              ? errors.password.message
                              : watch('email') && errors.password?.message}
                          </strong>
                        }
                        color={
                          !watch('password') ? 'default' : errors.password ? 'danger' : 'success'
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
              </div>

              <article className="mb-3">
                <p className="mb-2 mx-8">
                  Forget password?{' '}
                  <NextLink href="/authorization/register" className="text-blue-600">
                    Register
                  </NextLink>
                </p>

                <strong className=" mx-8 text-danger-400 text-sm">
                  {errors.form ? errors.form.message : watch('form') && errors.form?.message}
                </strong>
              </article>
              {/* <div className="flex items-center justify-center text-danger">
                {Object.values(errors).map((state, index) => (
                  <p key={index}>
                    <strong>{state?.message}</strong>
                  </p>
                ))}
              </div> */}

              <section className="flex -mx-2">
                <article className="w-full px-3 mb-2">
                  <div className="flex items-center justify-center">
                    <SubmitButtonLogin />
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
