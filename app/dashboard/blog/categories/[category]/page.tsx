import BlogCard from '@/app/dashboard/blogComponents/blogCard';
import { Backend_URL } from '@/lib/Contants';

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
}) {
  // console.log(searchParams['sortType']);
  const url = new URLSearchParams(searchParams);
  // console.log(url);
  const res = await fetch(`${Backend_URL}/blog?${url}`, {
    cache: 'no-store',
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
      id={post.id}
      avatarImg=""
      title={post.title}
      content={post.content}
      category={post.categories}
      date={post.createdAt}
      user={post.user.name + ' ' + post.user.surname}
      postImage={post.image}
      like={post.like}
      views={post.views}
    />
  ));
  console.log(postList);

  return (
    <>
      <div className="flex">
        {postList.length == 0 ? <BlogCard /> : postList}
      </div>
    </>
  );
}
