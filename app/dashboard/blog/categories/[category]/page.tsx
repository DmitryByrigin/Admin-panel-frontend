import BlogCard from '@/app/dashboard/blogComponents/blogCard';
import { Backend_URL } from '@/lib/Contants';
import { Post } from '@/lib/types';
import {Avatar, Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import defaultIconUser from "@/public/user-circle.svg"
import defaultPostImage from "@/public/defaultPostImage.jpg"
import {IconTrash} from "@tabler/icons-react";
import {ReportView} from "@/components/ReportView";
import LikeButton from "@/components/LikeButton";
import LinkJS from "next/link";
import DefaultPost from "@/components/DefaultPost";

interface Props {
  params: {
    category: string;
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  };
}

// const getComments = async () => {
//   const res = await fetch(`${Backend_URL}/blog//comments`, {
//     cache: 'no-store',
//   });
//
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//
//   return await res.json();
// };

export async function getData({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Post[]> {

  const url = new URLSearchParams(searchParams);
  const res = await fetch(`${Backend_URL}/blog?${url}`, {
    cache: 'no-store',
    next: { tags: ['deletePost', 'createPost', 'createComment', 'changePost', 'removeComment'] },
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

  const postList = posts.map((post) => (
    <BlogCard
      key={post.id}
      post={post}
    />
  ));

  return (

      <div className="w-full">
        {postList.length > 0 ? postList : <DefaultPost/>}
      </div>

  );
}
