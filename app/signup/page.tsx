// 'use client';

import { Backend_URL } from '@/lib/Contants';
import InputBox from '@/ui/inputbox';
import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
// import register from './actions';
import { SubmitButton } from '@/components/shared/SubmitButtonLogin';
import GoogleButton from '@/components/GoogleButton';
import register from '@/lib/actions';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

async function SignupPage() {
  // const register = async () => {
  //   try {
  //     const res = await fetch(Backend_URL + '/auth/register', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         // name: data.current.name,
  //         // email: data.current.email,
  //         // password: data.current.password,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (!res.ok) {
  //       if (res.status === 409) {
  //         alert('Пользователь уже существует');
  //       } else {
  //         alert(res.statusText);
  //       }
  //       return;
  //     }
  //     const response = await res.json();
  //     alert('User Registered!');
  //     // console.log({ response });
  //   } catch (error) {
  //     console.error('Ошибка при выполнении fetch:', error);
  //   }
  // }

  // const data = useRef<FormInputs>({
  //   name: '',
  //   email: '',
  //   password: '',
  // });
  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">Sign up</div>
      <form action={register}>
        <div className="p-2 flex flex-col gap-6">
          <InputBox
            autoComplete="off"
            name="name"
            labelText="Name"
            required
            // onChange={(e) => (data.current.name = e.target.value)}
          />
          <InputBox
            name="email"
            labelText="Email"
            required
            // onChange={(e) => (data.current.email = e.target.value)}
          />
          <InputBox name="password" labelText="password" type="password" required />
          <SubmitButton />
          <div className="flex justify-center items-center gap-2">
            <Link className="" href={'/'}>
              Cancel
            </Link>
          </div>
        </div>
      </form>
      <GoogleButton />
    </div>
  );
}
export default SignupPage;
