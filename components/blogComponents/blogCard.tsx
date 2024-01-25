'use client';
import { Avatar, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import LinkJS from 'next/link';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { LikeButton } from '@/components/buttons';
import { ReportView } from '@/components/blogComponents/ReportView';
import { IconTrash } from '@tabler/icons-react';
import { Backend_URL } from '@/lib/Contants';
import { RemovePost } from '@/lib/actions';
import { Post } from '@/lib/types';

interface Props {
  post: Post;
}

export default function BlogCard({
  post: { id, content, like, user, createdAt, title, image, categories },
}: Props) {
  const { data: session } = useSession();

  async function GetIdForDeletingPost(id: number) {
    // console.log(id);
    await RemovePost(id, session!);
  }

  let categoryString =
    categories.length > 0 ? categories.join(', ') : 'No categories';

  const formattedDate = format(new Date(createdAt), 'yyyy-MM-dd/HH:mm:ss');
  const postImageUrl = `${Backend_URL}/image/blog/${image}`;
  const userFullname = `${user.name} ${user.surname}`;
  const userImage = `${Backend_URL}/image/profile/${user.profileImage}`;

  return (
    <Card className="p-4 mb-4 w-full">
      <CardHeader className="flex items-center gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <Avatar showFallback src={userImage} />
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">
              {userFullname}, {formattedDate}, {categoryString}
            </p>
          </div>
        </div>
        <div>
          {session?.user.role === 'ADMIN' && (
            <IconTrash
              className="cursor-pointer"
              onClick={() => GetIdForDeletingPost(id)}
            />
          )}
        </div>
      </CardHeader>
      <CardBody className="mt-4">
        <Image
          src={postImageUrl}
          className="max-w-full max-h-unit-9xl pointer-events-none"
          alt=""
        />
        <p className="mt-5 mb-12 text-xl">{content}</p>
        <article className="flex">
          <div className="flex flex-row gap-2">
            <ReportView id={id} />
            <LikeButton initialLikes={like.length} id={id} />
            {id !== 0 && (
              <LinkJS
                className="text-blue-600 hover:underline mx-2 my-2"
                href={`/dashboard/blog/posts/${id}`}
              >
                Read more
              </LinkJS>
            )}
          </div>
        </article>
      </CardBody>
    </Card>
  );
}
