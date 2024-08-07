'use client'
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function HamburgerMenu({ isOpen, setIsOpen }: any) {

  return (
    <Bars3Icon className="rounded-xl size-14 hover:bg-orange-300 my-2"
      onClick={isOpen} />
  )

}
