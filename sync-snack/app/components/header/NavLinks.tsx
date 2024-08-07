"use client";

import { Box } from "@chakra-ui/react";
import { HomeIcon, CalendarIcon, CommandLineIcon, ChartBarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function NavLinks({ setIsOpen }: any) {
  const pathname = usePathname();

  return (
    <Box className="flex flex-col">
      {links.map((link, index) => {
        const IconLink = link.icon;
        return (
          <Link key={index} href={link.href}>
            <Box onClick={() => setIsOpen(false)} className={clsx(
              "flex items-center rounded-xl px-4 py-3 m-2 hover:text-orange-400 dark:hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-500",
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
      })}
    </Box>
  );
}

const links = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Event', href: '/event', icon: CalendarIcon },
  { name: 'Orders', href: '/orders', icon: CommandLineIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Group', href: '/group', icon: UserCircleIcon },
];
