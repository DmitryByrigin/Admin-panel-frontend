import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import IconUser from '@/components/userProfile/IconUser';
import { sidebarItems, siteConfig } from '@/config/site';
import { auth } from '@/auth/auth';
import { GithubIcon } from '@/config/icons';
import { ThemeSwitch } from '@/components/blogComponents/theme-switch';
import { getUser } from '@/app/dashboard/user/[id]/page';

export default async function Navbar() {
  const session = await auth();
  const user = await getUser(session?.user.id, session);

  return (
    <>
      <NextUINavbar
        className="flex items-start"
        maxWidth="full"
        shouldHideOnScroll
      >
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal href={siteConfig.links.github} aria-label="Github">
              <GithubIcon className="text-default-500" />
            </Link>
          </NavbarItem>
          <ThemeSwitch />
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle className="" />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {sidebarItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full text-default-500"
                  href={item.href}
                  size="lg"
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
        <IconUser user={user} />
        <NavbarItem className="flex flex-col max-md:hidden">
          <h1 className="font-bold">{session.user.name}</h1>
          <h3 className="text-xs text-primary-500">{session.user.role}</h3>
        </NavbarItem>
      </NextUINavbar>
    </>
  );
}
