"use client";

import { Box } from "@chakra-ui/react";
import { HomeIcon, CalendarIcon, CommandLineIcon, ChartBarIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function NavLinks({ setIsOpen, IsEventLinkShown, IsAdminLinkShown }: {
  setIsOpen: (isOpen: boolean) => void;
  IsEventLinkShown: boolean;
  IsAdminLinkShown: boolean;
}) {
  const pathname = usePathname();

  const filteredLinks = links.filter(link => {
    if (link.name === 'Event' && !IsEventLinkShown) return false;
    if (link.name === 'Admin' && !IsAdminLinkShown) return false;
    return true;
  });

  return (
    <Box className="flex flex-col">
      {filteredLinks.map((link, index) => {
        const IconLink = link.icon;
        return (
          <Link key={index} href={link.href}>
            <Box onClick={() => setIsOpen(false)} className={clsx(
              "flex items-center rounded-xl px-4 py-3 m-2 hover:text-white hover:bg-blue-2",
              {
                'bg-blue-2 text-white': pathname === link.href,
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
  { name: 'Group', href: '/group', icon: UserGroupIcon },
  { name: 'Admin', href: '/group-admin', icon: ChartBarIcon }, 
];