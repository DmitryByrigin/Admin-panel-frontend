import { Avatar, Card, CardBody, CardHeader, Link } from '@nextui-org/react';
import { format } from 'date-fns';
interface Props {
  avatarImg: string;
  title: string;
  user: string;
  date: Date;
  postImage: string;
  content: string;
}
export default function BlogCard({
  avatarImg,
  title,
  user,
  date,
  postImage,
  content,
}: Props) {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd/HH:mm:ss');
  return (
    <Card className="p-4 bg-white">
      <CardHeader className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          <Avatar showFallback src={avatarImg} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">
            {user}, {formattedDate}
          </p>
        </div>
      </CardHeader>
      <CardBody className="mt-4">
        <img
          alt="Blog post cover"
          className="w-full h-[200px] object-cover mb-4"
          height="200"
          src={postImage}
          style={{
            aspectRatio: '500/200',
            objectFit: 'cover',
          }}
          width="500"
        />
        <p className="text-gray-700">{content}</p>
        <Link className="text-blue-600 hover:underline" href="#">
          Read more
        </Link>
      </CardBody>
    </Card>
  );
}
