'use client';
import { Avatar, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import LinkJS from 'next/link';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import LikeButton from '@/components/LikeButton';
import { usePathname } from 'next/navigation';
import { ReportView } from '@/components/ReportView';

interface Props {
  id: number;
  avatarImg: string;
  title: string;
  user: string;
  date: Date;
  postImage: string;
  content: string;
  category: string[];
  like: string[];
  views: string[];
}

BlogCard.defaultProps = {
  id: 0,
  avatarImg: 'defaultAvatar.png',
  title: 'Default Title',
  user: 'Default User',
  date: new Date(),
  postImage: 'defaultPostImage.png',
  content: 'Default Content',
  category: ['Default Category'],
  like: [],
  views: [],
};

export default function BlogCard({
  id,
  avatarImg,
  title,
  user,
  category,
  date,
  postImage,
  content,
  like,
  views,
}: Props) {
  let categoryString =
    category.length > 0 ? category.join(', ') : 'No categories';

  const formattedDate = format(new Date(date), 'yyyy-MM-dd/HH:mm:ss');
  // const session = await auth();
  const { data: session } = useSession();

  const route = usePathname();

  return (
    <Card className="p-4 mb-4">
      <CardHeader className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          <Avatar showFallback src={avatarImg} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">
            {user}, {formattedDate}, {categoryString}
          </p>
        </div>
      </CardHeader>
      <CardBody className="mt-4">
        {/*<img*/}
        {/*  alt="Blog post cover"*/}
        {/*  className="w-full h-[200px] object-cover mb-4"*/}
        {/*  height="200"*/}
        {/*  src={postImage}*/}
        {/*  style={{*/}
        {/*    aspectRatio: '500/200',*/}
        {/*    objectFit: 'cover',*/}
        {/*  }}*/}
        {/*  width="500"*/}
        {/*/>*/}
        {/*<Suspense fallback={'loading...'}>*/}
        {/*  <BlogImage imageUrl={postImage} />*/}
        {/*</Suspense>*/}

        <Image src={postImage} className="max-w-4xl max-h-unit-9xl" alt="" />

        <p className="mt-5 mb-12 text-xl">{content}</p>
        <article className="flex">
          {' '}
          <div className="flex flex-row gap-2">
            <ReportView id={id} />
            <LikeButton initialLikes={like.length} id={id} />
          </div>
          <LinkJS
            className="text-blue-600 hover:underline mx-2 my-2"
            href={`/dashboard/blog/posts/${id}`}
          >
            Read more
          </LinkJS>
        </article>

        {/*<ReportView id={id} />*/}
      </CardBody>
    </Card>
  );
}
