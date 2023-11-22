'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { Backend_URL } from '@/lib/Contants';
import { schema, schemaLogin } from '@/lib/schema';

export default async function register(prevState: string | undefined, formData: FormData) {
  console.log('Register');
  const data = Object.fromEntries(formData);
  try {
    schema.parse(data);
  } catch (error) {
    console.error('Ошибка валидации:', error);
    return data;
  }

  // if (data.name || !data.email || !data.password) {
  //     console.log('Поля не могут быть пустыми');
  //     return;
  // }

  const res = await fetch(Backend_URL + '/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),

    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 409) {
    return { message: 'Email duplicated' };
  }
  await signIn('credentials', data, { callbackUrl: `/dashboard/user` });
  /*
        } catch (error) {
            console.log(error)
            if ((error as Error).message.includes('email duplicated')) {
                return {message: 'email duplicated'};
            }
            throw error;
        }*/

  // console.log(await res.json());

  /*if (!res.ok) {
        if (res.status === 409) {
            console.log('Пользователь уже существует');
        } else {
            console.log('Ошибка при выполнении fetch:', res.status, res.statusText);
        }
        return;
    }*/
}
export async function login(formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    schemaLogin.parse(data);
  } catch (error) {
    console.error('Ошибка валидации:', error);
    return data;
  }

  await signIn('credentials', data, { callbackUrl: '/dashboard' });
}
export async function logout() {
  await signOut();
  redirect('/');
}
export async function loginGoogle() {
  console.log('Login google');
  const url = await signIn(
    'google',
    { redirect: false },
    {
      callbackUrl: '/dashboard',
    },
  );
  redirect(url.replace('signin', 'api/auth/signin'));
}
