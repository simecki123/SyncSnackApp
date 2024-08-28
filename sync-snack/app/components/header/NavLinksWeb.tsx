"use client";

import { Box } from "@chakra-ui/react";
import { HomeIcon, CalendarIcon, CommandLineIcon, ChartBarIcon, UserCircleIcon, UserGroupIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NavLinksContext } from "@/app/providers";

export default function NavLinksWeb({ user }: any) {
  const pathname = usePathname();
  const eventContext = useContext(NavLinksContext)

  console.log(user, 'user in navlink')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
      },
    }).then((value) => {
      if (!value.ok) {
        throw new Error('no event')
      }
      eventContext.setIsEventLinkShown(true)
      return value.json()
    }).catch((_) => {
      console.log('no current event')
    });

    if (user.roles.includes('ADMIN')) {
      eventContext.setIsAdminLinkShown(true)
    }
  })

  return (
    <Box className="flex flex-col w-full">
      {links.map((link, index) => {
        if (link.name === 'Event' && !eventContext.isEventLinkShown) {
          return (<p key={index}></p>)
        }
        if (link.name === 'Admin' && !eventContext.isAdminLinkShown) {
          return (<p key={index}></p>)
        }
        return (<NavLink link={link} pathname={pathname} key={index} />)
      })}
    </Box>
  );
}

const links = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Event', href: '/event', icon: CalendarIcon },
  { name: 'Orders', href: '/orders', icon: CommandLineIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Group', href: '/group', icon: UserGroupIcon },
  { name: 'Admin', href: '/group-admin', icon: AdjustmentsHorizontalIcon }
];

function NavLink({ link, pathname }: any) {
  const IconLink = link.icon;
  return (
    <a href={link.href}>
      <Box className={clsx(
        "w-full flex items-center rounded-xl px-4 py-3 mx-4 my-2 hover:text-white hover:bg-blue-2",
        {
          'bg-blue-2 text-white': pathname === link.href,
        }
      )}>
        <IconLink className="h-6 w-6 mr-2" />
        <Box className="font-semibold">
          {link.name}
        </Box>
      </Box>
    </a>
  )
}
