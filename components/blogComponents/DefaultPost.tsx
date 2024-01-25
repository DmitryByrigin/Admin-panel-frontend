import { Avatar, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import defaultIconUser from '@/public/img/user-circle.svg';
import defaultPostImage from '@/public/img/defaultPostImage.jpg';

export default function DefaultPost() {
  return (
    <Card className="p-4 mb-4 w-full">
      <CardHeader className="flex items-center gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <Avatar showFallback src={defaultIconUser} />
          <div>
            <h2 className="text-2xl font-semibold">
              How I Found My Wanderlust!🌄
            </h2>
            <p className="text-sm text-gray-500"></p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mt-4">
        <Image
          src={defaultPostImage.src}
          className="max-w-full max-h-unit-9xl pointer-events-none"
          alt=""
        />
        <p className="mt-5 mb-12 text-xl">
          Tell us about your adventures and travel experiences that helped you
          find your wanderlust. Share your favorite places and travel tips with
          your readers.🔥🔥🔥
        </p>
        <article className="flex">
          <div className="flex flex-row gap-2"></div>
        </article>
      </CardBody>
    </Card>
  );
}
