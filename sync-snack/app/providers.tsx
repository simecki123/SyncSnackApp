'use client'
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
})

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
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </SessionProvider>
    </NavLinksContext.Provider>
  )
}

