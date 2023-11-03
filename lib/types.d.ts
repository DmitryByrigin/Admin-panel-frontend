import { SVGProps } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
