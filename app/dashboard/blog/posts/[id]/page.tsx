import { Button } from '@nextui-org/button';
import { Avatar, Image } from '@nextui-org/react';
import { Post } from '@/lib/types';
import { Backend_URL } from '@/lib/Contants';
import { format } from 'date-fns';
import { ReportView } from '@/components/blogComponents/ReportView';
import { IconBackspace } from '@tabler/icons-react';
import Link from 'next/link';
import Comments from '@/components/blogComponents/Comments';
import NewCommentFill from '@/components/blogComponents/NewCommentFill';
import { LikeButton } from '@/components/buttons';
import EditPost from '@/components/blogComponents/EditPost';
import { auth } from '@/auth/auth';

interface Props {
  params: {
    id: number;
  };
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(Backend_URL + `/blog/${id}`, {
    cache: 'no-store',
    next: { tags: ['createComment'] },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  // console.log(data);
  return res.json();
}

// export async function getComments(id: number): Promise<Comment[]> {
//   const res = await fetch(Backend_URL + `/blog/${id}/comments`, {
//     cache: 'no-store',
//     next: { tags: ['createComment'] },
//   });
//
//   if (!res.ok) {
//     throw new Error('Failed to fetch comments');
//   }
//
//   return res.json();
// }

export default async function PostPage({ params }: Props) {
  const session = await auth();
  const post = await getPost(params.id);
  // const comments = await getComments(params.id);
  // console.log(post.user);
  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd/HH:mm:ss');
  const userImage = `${Backend_URL}/image/profile/${post.user.profileImage}`;

  const commentsList = post.comments.map((comment) => (
    <Comments
      key={comment.id}
      id={comment.id}
      text={comment.text}
      createdAt={comment.createdAt}
      user={comment.user}
      postId={post.id}
    />
  ));
  // console.log(post.user);

  return (
    <div className="px-4 py-6 md:px-6 lg:py-16 md:py-12 ">
      <article className="prose prose-gray mx-auto dark:prose-invert">
        <div className="space-y-2 not-prose">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="flex text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                {post.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              {session?.user.role === 'ADMIN' && <EditPost post={post} />}
              <Button href={'/dashboard/blog/categories'} as={Link}>
                <IconBackspace className="w-4 h-4" />
                Back
              </Button>
            </div>
          </div>

          <p className="mb-4 text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>

        <figure className="my-5">
          <Image
            alt="Cover image"
            className="aspect-video object-cover"
            src={`${Backend_URL}/image/blog/${post.image}`}
          />
        </figure>
        <p className="text-xl">{post.content}</p>
      </article>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Avatar
            showFallback
            alt="User Avatar"
            className="w-8 h-8"
            src={userImage}
          />
          <span className="text-sm text-gray-600">
            Posted by {post.user ? post.user.name : 'Unknown'}
          </span>
        </div>
        <div className="flex items-center space-x-2 justify-end">
          <ReportView id={params.id} />
          <LikeButton initialLikes={post.like.length} id={params.id} />
        </div>
      </div>
      <section className="mt-8">
        <h2 className="font-semibold text-2xl mb-4">Comments</h2>
        <div className="grid gap-4">{commentsList}</div>

        <NewCommentFill id={params.id} />
      </section>
    </div>
  );
}
