import AsideItems from '@/components/aside/AsideItems';
import { Card } from '@nextui-org/react';
import SortedButtons from '@/components/blogComponents/SortedButtons';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center gap-4 py-8 md:py-10 ">
      <div className="flex items-start gap-10 w-full max-lg:flex-col">
        <aside className="flex w-1/4 max-lg:w-full">
          <Card className="p-4 w-full gap-6 ">
            <h2 className="text-lg font-semibold">Categories</h2>

            <div className="flex w-full  flex-col gap-2">
              <AsideItems />
            </div>
            <div className="flex w-full flex-col gap-8">
              <h2 className="text-lg font-semibold">Sorts</h2>
              <SortedButtons />
            </div>
          </Card>
        </aside>
        <section className="flex space-y-8 w-full mr-5 max-lg:w-full">
          {children}
        </section>
      </div>
    </section>
  );
}
