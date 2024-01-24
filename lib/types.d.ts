import { SVGProps } from 'react';

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  profileImage: string;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface BlogFormData {
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  userid: string;
  userimage: string;
  comments: string[];
  image: string;
}

export interface Post {
  id: number;
  image: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  like: string[];
  views: string[];
  categories: string[];
  comments: Comment[];
  user: User;
}
export interface Comment {
  id: number;
  text: string;
  createdAt: Date;
  user: User;
}
