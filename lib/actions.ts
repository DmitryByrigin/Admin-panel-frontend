'use server';

import { signIn, signOut } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { Backend_URL } from '@/lib/Contants';
import { schema, schemaLogin } from '@/lib/schema';
import { revalidateTag } from 'next/cache';
import { Session } from 'next-auth';
import { Post } from '@/lib/types';

export async function register(formData: FormData) {
  // console.log('Register');
  const data = Object.fromEntries(formData);
  try {
    schema.parse(data);
  } catch (error) {
    // console.error('Ошибка валидации:', error);
    return data;
  }

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
    // console.error('Ошибка валидации:', error);
    // return { error: 'Ошибка валидации: ' + error };
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
    return { error: 'You entered the wrong username or password' };
  }

  if (!res.ok) {
    // console.error('Ошибка при выполнении fetch:', res.status, res.statusText);
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
  // console.log('Login google');
  const url = await signIn(
    'google',
    { redirect: false },
    {
      callbackUrl: '/dashboard',
    },
  );
  redirect(url.replace('signin', 'api/auth/signin'));
}

export async function uploadImage(data: FormData, session: Session) {
  try {
    const res = await fetch(Backend_URL + `/user/upload/`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });

    if (res.ok) {
      // console.log('Image upload successful');
      revalidateTag('updateBlogData');
    } else {
      console.error(res);
    }
  } catch (error) {
    console.error('Error during submission:', error);
  }
}

export async function RemovePost(id: number, session: Session) {
  // console.log(id);
  try {
    const res = await fetch(Backend_URL + `/blog/remove/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      // console.log('Blog deleting successful');
      revalidateTag('updateBlogData');
    } else {
      console.error('Blog creation failed');
    }
  } catch (error) {
    console.error('Error during submission:', error);
  }
}

export const createComment = async (
  id: number,
  session: Session,
  commentText: string,
) => {
  try {
    const res = await fetch(Backend_URL + `/blog/${id}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: commentText }), // Send the comment text in the body
    });

    if (res.ok) {
      // console.log('Comment creation successful');
      // setFileUploaded(true);
      revalidateTag('updateBlogData');
    } else {
      console.error('Comment creation failed');
    }
  } catch (error) {
    console.error('Error during submission:', error);
  }
};

export async function postBlog(formData: FormData, session: Session) {
  try {
    const res = await fetch(Backend_URL + '/blog', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    });

    if (res.ok) {
      revalidateTag('updateBlogData');
      // console.log('Blog creation successful');
      return 'Success';
    } else {
      console.error('Blog creation failed');
      return 'Error';
    }
  } catch (error) {
    console.error('Error during submission:', error);
    return 'Error';
  }
}

export const updateBlogPost = async (
  formData: FormData,
  post: Post,
  session: Session,
) => {
  try {
    const res = await fetch(Backend_URL + `/blog/${post.id}`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
      next: { tags: ['updateBlogPost'] },
    });

    if (res.ok) {
      revalidateTag('updateBlogData');
      // console.log('Blog update successful');
    } else {
      console.error('Blog update failed');
    }
  } catch (error) {
    console.error('Error during submission:', error);
  }
};

export const RemoveComment = async (
  commentId: number,
  session: Session,
  postId: number,
) => {
  try {
    const res = await fetch(
      Backend_URL + `/blog/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (res.ok) {
      revalidateTag('updateBlogData');
    }

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
