'use client';

// import { Button } from '@nextui-org/button';
import {
  IconCalendarMinus,
  IconCalendarPlus,
  IconEyeDown,
  IconEyeUp,
  IconThumbDown,
  IconThumbUp,
} from '@tabler/icons-react';
import React, { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';

// interface SortedButtonsProps {
//   onSort: () => void;
//   onSortByLike: () => void;
//   onSortByViews: () => void;
// }

export default function SortedButtons({}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  let [sort, setSort] = useState<'asc' | 'desc'>('asc');
  // console.log(sort);
  const [sortByLike, setSortByLike] = useState('');
  const [sortByViews, setSortByViews] = useState('');

  return (
    <div className="flex gap-5 items-center">
      <Button
        isIconOnly
        variant="faded"
        aria-label="Sorted by"
        className="flex flex-col"
        onClick={() => {
          setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'));

          router.push(pathname + '?' + createQueryString('sortType', sort));
        }}
      >
        {sort === 'asc' ? <IconCalendarPlus /> : <IconCalendarMinus />}
      </Button>

      <Button
        isIconOnly
        variant="faded"
        aria-label="Sorted by"
        className="flex flex-col"
        onPress={() => {
          setSortByLike((prevSortByLike) =>
            prevSortByLike === '' ? 'like' : '',
          );
          router.push(pathname + '?' + createQueryString('sortBy', sortByLike));
          // onSortByLike();
        }}
      >
        {sortByLike === '' ? <IconThumbUp /> : <IconThumbDown />}
      </Button>

      <Button
        isIconOnly
        variant="faded"
        aria-label="Sorted by"
        className="flex flex-col"
        onPress={() => {
          setSortByViews((prevSortByLike) =>
            prevSortByLike === '' ? 'views' : '',
          );
          router.push(
            pathname + '?' + createQueryString('sortBy', sortByViews),
          );
          // onSortByViews();
        }}
      >
        {sortByViews === '' ? <IconEyeUp /> : <IconEyeDown />}
      </Button>
    </div>
  );
}
