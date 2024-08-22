'use client'
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const NavLinksContext = createContext(
  {
    isEventLinkShown: false,
    setIsEventLinkShown: (value: boolean) => { }
  })

export function Providers({ children }: { children: React.ReactNode }) {

  const [isEventLinkShown, setIsEventLinkShown] = useState(false)

  return (
    <NavLinksContext.Provider value={{ isEventLinkShown, setIsEventLinkShown }}>
      <SessionProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </SessionProvider>
    </NavLinksContext.Provider>
  )
}

