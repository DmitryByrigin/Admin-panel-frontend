'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { logout } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const iconUser = ({ userEmail, userId }) => {
  // const session = await auth();
  function logout() {
    signOut();
    redirect('/');
  }

  // console.log(userEmail, userId);

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
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{userEmail}</p>
        </DropdownItem>

        <DropdownItem
          as={Link}
          href={`/dashboard/user/${userId}`}
          key="settings"
        >
          Profile Settings
        </DropdownItem>

        <DropdownItem key="logout" color="danger" onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
      {/* <h1>{session.user.name}</h1> */}
    </Dropdown>
  );
};

export default iconUser;
