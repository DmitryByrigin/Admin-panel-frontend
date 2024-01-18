import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';

const categories = [
  'All',
  'Technology',
  'Health',
  'Business',
  'Education',
  'Environment',
];

// eslint-disable-next-line @next/next/no-async-client-component
export default async function AsideItems() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['text']));

  // @ts-ignore
  return (
    <div className="flex flex-col gap-2">
      <Listbox
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        // selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        // onAction={(key) => setFilters(key)}
      >
        {categories.map((item, id) => (
          <ListboxItem key={item}>{item}</ListboxItem>
        ))}
      </Listbox>

      {/*<p className="text-small text-default-500">*/}
      {/*  Selected value: {selectedValue}*/}
      {/*</p>*/}
    </div>
  );
}
