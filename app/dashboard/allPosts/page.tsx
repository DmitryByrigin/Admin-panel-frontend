import { Button } from '@nextui-org/button';
import { Avatar, Card, CardBody, CardHeader, Link } from '@nextui-org/react';
import { Backend_URL } from '@/lib/Contants';
import { log } from 'console';
import { title } from 'process';
import BlogCard from '../blogComponents/blogCard';

async function getData() {
  const res = await fetch(Backend_URL + '/blog', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function AllPosts() {
  const data = await getData();
  console.log(data);

  const postList = data.map((post) => (
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
            <div className="flex flex-col gap-2">
              <Button className="text-left" variant="bordered">
                Technology
              </Button>
              <Button className="text-left" variant="bordered">
                Health
              </Button>
              <Button className="text-left" variant="bordered">
                Business
              </Button>
              <Button className="text-left" variant="bordered">
                Education
              </Button>
              <Button className="text-left" variant="bordered">
                Environment
              </Button>
              <Button className="text-left" variant="bordered">
                Culture
              </Button>
            </div>
          </Card>
        </aside>
        <main className="space-y-8">{postList}</main>
      </div>
    </div>
  );
}
