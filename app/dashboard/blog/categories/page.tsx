import { Card } from '@nextui-org/react';
import { Backend_URL } from '@/lib/Contants';
import BlogCard from '@/app/dashboard/blogComponents/blogCard';

export async function getData() {
  const res = await fetch(Backend_URL + '/blog', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function AllPosts() {
  let posts = await getData();

  const postList = posts.map((post) => (
    <BlogCard
      key={post.id}
      avatarImg=""
      title={post.title}
      content={post.content}
      date={post.createdAt}
      user={post.user.name + ' ' + post.user.surname}
      postImage={post.image}
    />
  ));

  return (
    <div className="bg-[#f9fafb] min-h-screen p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
        <aside>
          <Card className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Categories</h2>

            <div className="flex w-full flex-col gap-2">
              {/*<AsideItems}/>*/}
            </div>
          </Card>
        </aside>
        <main className="space-y-8">{postList}</main>
      </div>
    </div>
  );
}
