'use client';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { useContext } from 'react';
import { Logo } from '@/config/icons';

import { usePathname } from 'next/navigation';
import { SidebarContext } from '@/app/sidebar/SidebarContext';
import { Tooltip } from '@nextui-org/react';
import { sidebarItems } from '@/config/site';

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div
      className="sidebar__wrapper mr-7 max-sm:hidden"
      onClick={toggleSidebarcollapse}
    >
      <button className="btn">
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Logo width={80} height={80} className="sidebar__logo" />
          <p className="sidebar__logo-name">BEST-WEB-DESIGN</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Tooltip
                  isDisabled={!isCollapsed}
                  content={name}
                  placement="right"
                >
                  <Link
                    className={`sidebar__link ${
                      pathname === href ? 'sidebar__link--active' : ''
                    }`}
                    href={href}
                  >
                    <span className="sidebar__icon">
                      <Icon />
                    </span>
                    <span className="sidebar__name">{name}</span>
                  </Link>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
