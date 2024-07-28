"use client"

import { Box } from "@chakra-ui/react"
import { HomeIcon, CalendarIcon, CommandLineIcon, ChartBarIcon, TrophyIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import Link from "next/link"

export default function NavLinks() {

  const pathname = usePathname()

  return (
    <Box>
      {links.map((link) => {
        const IconLink = link.icon
        return (
          <Link href={link.href}>
            <Box className={clsx(
              "flex rounded-xl bg-orange-100 px-2 py-4 m-2 hover:text-white hover:bg-orange-300",
              {
                'bg-orange-300 text-white': pathname === link.href,
              }
            )
            }>
              <IconLink className="size-6 mr-1" />
              <Box className="font-semibold">
                {link.name}
              </Box>
            </Box>
          </Link>
        )
      })}
    </Box>
  )
}

const links = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Event', href: '/event', icon: CalendarIcon },
  { name: 'Leaderboard', href: '/leaderboard', icon: TrophyIcon },
  { name: 'Orders', href: '/orders', icon: CommandLineIcon },
  { name: 'Stats', href: '/statistics', icon: ChartBarIcon },
]
