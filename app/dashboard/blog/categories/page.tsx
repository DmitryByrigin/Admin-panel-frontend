import BlogCard from '@/components/blogComponents/blogCard';
import { getData } from '@/app/dashboard/blog/categories/[category]/page';
import DefaultPost from '@/components/blogComponents/DefaultPost';

export default async function AllPosts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const posts = await getData({ searchParams });

  const postList = posts.map((post) => <BlogCard key={post.id} post={post} />);

  return (
    <div className="w-full">
      {postList.length > 0 ? postList : <DefaultPost />}
    </div>
  );
}
