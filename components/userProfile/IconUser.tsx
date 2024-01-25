'use client';

import Link from 'next/link';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Backend_URL } from '@/lib/Contants';
import { User } from '@/lib/types';

export default function iconUser({ user }: { user: User }) {
  function logout() {
    signOut();
    redirect('/');
  }

  const userImage = `${Backend_URL}/image/profile/${user.profileImage}`;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          showFallback
          src={userImage}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          as={Link}
          href={`/dashboard/user/${user.id}`}
          key="profile"
          className="h-14 gap-2"
        >
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>

        <DropdownItem
          as={Link}
          href={`/dashboard/user/${user.id}`}
          key="settings"
        >
          Profile Settings
        </DropdownItem>

        <DropdownItem key="logout" color="danger" onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
