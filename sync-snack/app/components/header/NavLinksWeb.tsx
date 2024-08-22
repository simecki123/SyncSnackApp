"use client";

import { Box } from "@chakra-ui/react";
import { HomeIcon, CalendarIcon, CommandLineIcon, ChartBarIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { NavLinksContext } from "@/app/providers";

export default function NavLinksWeb({ token }: any) {
  const pathname = usePathname();

  const eventContext = useContext(NavLinksContext)

  console.log(token, 'THIS IS THE TOKEN OF THE TOKENS')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
  })

  return (
    <Box className="flex flex-col">
      {links.map((link, index) => {
        const IconLink = link.icon;
        if (link.name === 'Event') {
          if (eventContext.isEventLinkShown) {
            return (
              <a key={index} href={link.href}>
                <Box className={clsx(
                  "flex items-center rounded-xl px-4 py-3 m-2 hover:text-orange-400 hover:bg-orange-100",
                  {
                    'bg-orange-100 text-orange-400': pathname === link.href,
                  }
                )}>
                  <IconLink className="h-6 w-6 mr-2" />
                  <Box className="font-semibold">
                    {link.name}
                  </Box>
                </Box>
              </a>
            )
          } else {
            return <p key={index}></p>
          }
        } else {
          return (
            <Link key={index} href={link.href}>
              <Box className={clsx(
                "flex items-center rounded-xl px-4 py-3 m-2 hover:text-orange-400 hover:bg-orange-100",
                {
                  'bg-orange-100 text-orange-400': pathname === link.href,
                }
              )}>
                <IconLink className="h-6 w-6 mr-2" />
                <Box className="font-semibold">
                  {link.name}
                </Box>
              </Box>
            </Link>
          )
        }
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
];

