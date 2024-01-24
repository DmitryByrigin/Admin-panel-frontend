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
import { Backend_URL } from '@/lib/Contants';
import { User } from '@/lib/types';
import { getUser } from '@/app/dashboard/user/[id]/page';
import {IconUserHexagon} from "@tabler/icons-react";
import defaultIconUser from "@/public/user-circle.svg"

const iconUser = ({ user }: {user: User}) => {

  function logout() {
    signOut();
    redirect('/');
  }
  const userImage = `${Backend_URL}/image/profile/${user.profileImage}`

  const defaultIcon = <IconUserHexagon/>;
  const avatarSrc = userImage || defaultIcon;

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
        <DropdownItem           as={Link}
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
      {/* <h1>{session.user.name}</h1> */}
    </Dropdown>
  );
};

export default iconUser;
