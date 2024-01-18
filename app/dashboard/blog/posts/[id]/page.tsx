import { Button } from '@nextui-org/button';
import { Avatar, Image } from '@nextui-org/react';
import { Post } from '@/lib/types';
import { Backend_URL } from '@/lib/Contants';
import { format } from 'date-fns';
import { ReportView } from '@/components/ReportView';
import { IconBackspace } from '@tabler/icons-react';
import Link from 'next/link';
import Comments from '@/components/Comments';
import NewCommentFill from '@/components/NewCommentFill';
import LikeButton from '@/components/LikeButton';

interface Props {
  params: {
    id: number;
  };
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(Backend_URL + `/blog/${id}`, {
    cache: 'no-store',
    // next: { revalidate: 5 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  // console.log(data);
  return res.json();
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);
  console.log(post);
  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd/HH:mm:ss');
  const formattedDateComment = post.comments.map((comment) =>
    format(new Date(comment.createdAt), 'yyyy-MM-dd/HH:mm:ss'),
  );

  const commentsList = post.comments.map((comment, index) => (
    <Comments
      key={comment.id}
      id={comment.id}
      text={comment.text}
      createdAt={formattedDateComment[index]} // Use index to get the corresponding formatted date
      user={comment.user.name + ' ' + comment.user.surname}
    />
  ));

  return (
    <div className="px-4 py-6 md:px-6 lg:py-16 md:py-12 ">
      <article className="prose prose-gray mx-auto dark:prose-invert">
        <div className="space-y-2 not-prose">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <h1 className="flex gap-4 text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                {post.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
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
            src={`${Backend_URL}/image/${post.image}`}
          />
          {/*<figcaption className="text-gray-500">*/}
          {/*  Image caption goes here*/}
          {/*</figcaption>*/}
        </figure>
        <p>{post.content}</p>
      </article>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Avatar alt="User Avatar" className="w-8 h-8" src="" />
          <span className="text-sm text-gray-600">
            Posted by {post.user ? post.user.name : 'Unknown'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ReportView id={params.id} />
          <LikeButton initialLikes={post.like.length} id={params.id} />
          <div className="bg-red-100 text-red-500"></div>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="font-semibold text-2xl mb-4">Comments</h2>
        <div className="grid gap-4">
          {/*<div className="flex items-start gap-4">*/}
          {/*  <Avatar*/}
          {/*    className="w-10 h-10 border "*/}
          {/*    alt="@user1"*/}
          {/*    src="/placeholder-user.jpg"*/}
          {/*  ></Avatar>*/}
          {/*  <div className="grid gap-1.5">*/}
          {/*    <div className="flex items-center gap-2">*/}
          {/*      <div className="font-semibold">@user1</div>*/}
          {/*      <div className="text-gray-500 text-xs dark:text-gray-400">*/}
          {/*        2 days ago*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      This is a sample comment. The content of the comment would go*/}
          {/*      here.*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<Comments id={post.comments} />*/}
          {commentsList}
        </div>

        <NewCommentFill id={params.id} />
      </section>
    </div>
  );
}
