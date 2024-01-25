import BlogCard from '@/components/blogComponents/blogCard';
import { Backend_URL } from '@/lib/Contants';
import { Post } from '@/lib/types';
import DefaultPost from '@/components/blogComponents/DefaultPost';

export async function getData({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Post[]> {
  const url = new URLSearchParams(searchParams);
  const res = await fetch(`${Backend_URL}/blog?${url}`, {
    cache: 'no-store',
    next: {
      tags: ['updateBlogData'],
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

async function getPostsByCategory(
  category: string,
  searchParams: { [key: string]: string | string[] | undefined },
) {
  const posts = await getData({ searchParams });
  return posts.filter((post) => post.categories.includes(category));
}

export default async function CurrentCategory({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const posts = await getPostsByCategory(params.category, searchParams || {});

  const postList = posts.map((post) => <BlogCard key={post.id} post={post} />);

  return (
    <div className="w-full">
      {postList.length > 0 ? postList : <DefaultPost />}
    </div>
  );
}
