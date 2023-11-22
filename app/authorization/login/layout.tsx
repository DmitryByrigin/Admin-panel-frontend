// export default function LoginLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//       <div className="inline-block max-w-lg text-center justify-center">{children}</div>
//     </section>
//   );
// }
import clsx from 'clsx';

import { fontSans } from '@/config/fonts';
import { Providers } from '@/app/providers';
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx('bg-background font-sans antialiased', fontSans.variable)}>
      {/*<Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>*/}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block w-full">{children}</div>
      </section>
      {/*</Providers>*/}
    </div>
  );
}
