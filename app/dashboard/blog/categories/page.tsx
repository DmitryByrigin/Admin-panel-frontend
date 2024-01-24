import BlogCard from '@/app/dashboard/blogComponents/blogCard';
import { getData } from '@/app/dashboard/blog/categories/[category]/page';
import {Avatar, Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import defaultIconUser from "@/public/user-circle.svg";
import defaultPostImage from "@/public/defaultPostImage.jpg";
import DefaultPost from "@/components/DefaultPost";

export default async function AllPosts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const posts = await getData({ searchParams });

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
