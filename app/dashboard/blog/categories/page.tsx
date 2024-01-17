import BlogCard from '@/app/dashboard/blogComponents/blogCard';
import { getData } from '@/app/dashboard/blog/categories/[category]/page';
import { Backend_URL } from '@/lib/Contants';

// async function getData() {
//   const res = await fetch(`${Backend_URL}/blog`, {
//     cache: 'no-store',
//   });
//
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//
//   return await res.json();
// }

export default async function AllPosts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const posts = await getData({ searchParams });
  console.log(searchParams);

  const postList = posts.map((post) => (
    <BlogCard
      key={post.id}
      id={post.id}
      avatarImg=""
      title={post.title}
      content={post.content}
      category={post.categories}
      date={post.createdAt}
      user={post.user.name + ' ' + post.user.surname}
      postImage={`${Backend_URL}/image/${post.image}`}
      // C:\Users\dmitr\Desktop\Admin-Panel\Admin-panel-backend\uploads\profileimages\photo170255087571fa1686-a2e7-4d75-810a-c52f38811a2b.jpeg
      like={post.like}
      views={post.views}
    />
  ));

  return <div>{postList.length == 0 ? <BlogCard /> : postList}</div>;
}
