'use client';
import { AccordionItem } from '@nextui-org/react';
import React from 'react';
import { IconAlertCircle, IconKey } from '@tabler/icons';

export default function Accordion() {
  const itemClasses = {
    base: 'py-0 w-full',
    title: 'font-normal text-medium',
    trigger:
      'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
    indicator: 'text-medium',
    content: 'text-small px-2',
  };

  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  return (
    <div>
      <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
        variant="shadow"
        itemClasses={itemClasses}
      >
        <AccordionItem
          key="1"
          aria-label="Apps Permissions"
          startContent={<IconKey />}
          subtitle="3 apps have read permissions"
          title="Apps Permissions"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Pending tasks"
          classNames={{ subtitle: 'text-warning' }}
          startContent={<IconAlertCircle className="text-warning" />}
          subtitle="Complete your profile"
          title="Pending tasks"
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
