'use client'
import { HamburgerIcon } from "@chakra-ui/icons";

export default function HeaderMenu() {
  return (
    <div onClick={() => { console.log('moon') }}>
      <HamburgerIcon boxSize={16} />
    </div>
  )
}
