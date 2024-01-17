'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { Backend_URL } from '@/lib/Contants';
import { schema, schemaLogin } from '@/lib/schema';

export async function register(formData: FormData) {
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
      surname: data.surname,
      email: data.email,
      password: data.password,
    }),

    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 409) {
    return { error: 'You have already been registered before!' };
  }
  await signIn('credentials', data, { callbackUrl: `/dashboard/user` });
}
export async function login(formData: FormData) {
  // console.log(formData);
  const data = Object.fromEntries(formData);

  try {
    schemaLogin.parse(data);
  } catch (error) {
    console.error('Ошибка валидации:', error);
    return { error: 'Ошибка валидации: ' + error };
  }

  const res = await fetch(Backend_URL + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    return { error: 'This user does not exist!' };
  }

  if (!res.ok) {
    console.error('Ошибка при выполнении fetch:', res.status, res.statusText);
    // Handle other errors if needed
    return { error: 'An error occurred during login.' };
  }

  await signIn('credentials', data, {
    callbackUrl: '/dashboard/blog/categories',
  });
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

// export async function incrementLike(session, id) {
//   try {
//     const response = await fetch(Backend_URL + `/blog/${id}/like`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${session.backendTokens.accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       return data?.countLikes || 0;
//     } else {
//       // Handle non-ok response if needed
//       console.error('Non-ok response:', response.status, response.statusText);
//       throw new Error('Failed to increment like.');
//     }
//   } catch (error) {
//     console.error('Error handling like:', error);
//     throw error; // Rethrow the error to be handled by the calling code
//   }
// }
