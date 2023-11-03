'use client';

import { Backend_URL } from '@/lib/Contants';
import InputBox from '@/ui/inputbox';
import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useRef } from 'react';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    try {
      const res = await fetch(Backend_URL + '/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.current.name,
          email: data.current.email,
          password: data.current.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 409) {
          alert('Пользователь уже существует');
        } else {
          alert(res.statusText);
        }
        return;
      }

      const response = await res.json();
      alert('User Registered!');
      // console.log({ response });
    } catch (error) {
      console.error('Ошибка при выполнении fetch:', error);
    }
  };

  const data = useRef<FormInputs>({
    name: '',
    email: '',
    password: '',
  });
  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">Sign up</div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          autoComplete="off"
          name="name"
          labelText="Name"
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={'/'}>
            Cancel
          </Link>
        </div>
        <button onClick={() => signIn('google')} className="text-green-600 ml-auto">
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
