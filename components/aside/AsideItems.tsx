'use client';

import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import Link from 'next/link';

const categories = [
  'All',
  'Technology',
  'Health',
  'Business',
  'Education',
  'Environment',
];

export default function AsideItems() {
  return (
    <>
      {/*<ListboxWrapper>*/}
      <div className="flex flex-col gap-2">
        <Listbox
          aria-label="Single selection example"
          variant="solid"
          disallowEmptySelection
          selectionMode="single"
          defaultSelectedKeys="All"
          selectedKeys="All"
          // onSelectionChange={setSelectedKeys}
        >
          {categories.map((item, id) => (
            <ListboxItem
              key={item}
              href={`/dashboard/blog/categories/${item === 'All' ? '' : item}`}
              as={Link}
            >
              {item}
            </ListboxItem>
          ))}
        </Listbox>
      </div>
      {/*</ListboxWrapper>*/}
    </>
  );
}
