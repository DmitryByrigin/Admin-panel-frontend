'use client';

import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import Link from 'next/link';
import { categoriesForAsidePanel } from '@/config/site';

export default function AsideItems() {
  return (
    <div className="flex flex-col gap-2">
      <Listbox
        aria-label="Single selection example"
        variant="solid"
        disallowEmptySelection
        selectionMode="single"
        defaultSelectedKeys="All"
        selectedKeys="All"
      >
        {categoriesForAsidePanel.map((item, id) => (
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
  );
}
