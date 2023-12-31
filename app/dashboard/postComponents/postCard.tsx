import { Avatar, Button, Textarea } from '@nextui-org/react';
import { format } from 'date-fns';

interface Props {
  avatarImg: string;
  title: string;
  user: string;
  date: Date;
  postImg: string;
  content: string;
  likes: number;
  userImg: string;
  coments: string;
}
export default function PostCard({
  title,
  date,
  postImg,
  content,
  user,
  likes,
  userImg,
  coments,
}: Props) {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd/HH:mm:ss');
  return (
    <div className="px-4 py-6 md:px-6 lg:py-16 md:py-12">
      <article className="prose prose-gray mx-auto dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
            {title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Posted on {formattedDate}
          </p>
        </div>
        <figure>
          <img
            alt="Cover image"
            className="aspect-video object-cover"
            height="340"
            src={postImg}
            width="1250"
          />
          <figcaption className="text-gray-500">
            Image caption goes here
          </figcaption>
        </figure>
        <p>{content}</p>
      </article>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Avatar alt="User Avatar" className="w-8 h-8" src={userImg} />
          <span className="text-sm text-gray-600">Posted by {user}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="text-red-500">
            <HeartIcon className="w-4 h-4 mr-2" />
            Like
          </Button>
          <div className="bg-red-100 text-red-500">{likes}</div>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="font-semibold text-2xl mb-4">Coments</h2>
        <div className="grid gap-4">
          <div className="flex items-start gap-4">
            <Avatar
              className="w-10 h-10 border "
              alt="@user1"
              src="/placeholder-user.jpg"
            ></Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@{user}</div>
                <div className="text-gray-500 text-xs dark:text-gray-400">
                  {formattedDate}
                </div>
              </div>
              <div>{coments}</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar
              className="w-10 h-10 border"
              alt="@user2"
              src="/placeholder-user.jpg"
            ></Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@{user}</div>
                <div className="text-gray-500 text-xs dark:text-gray-400">
                  {formattedDate}
                </div>
              </div>
              <div>{coments}</div>
            </div>
          </div>
        </div>
        <div className="mt-6 grid w-full gap-2">
          <Textarea placeholder="Type your comment here." />
          <Button variant="bordered">Post Comment</Button>
        </div>
      </section>
    </div>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
