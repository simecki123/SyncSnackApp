'use client'
import { Button, ChakraProvider, StyleFunctionProps } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    xblue: {
      100: "#5078bf",
      500: "#15408c",
      600: "#0d2b68",
      700: "#000000",
    },
    xorange: {
      500: "#f2a470",
      600: "#d98068",
      700: "#8c3331",
    },
    xred: {
      100: "#bd6a68",
      500: "#8c3331",
      600: "#681615",
      700: "#000000",
    }
  },
})

export const NavLinksContext = createContext(
  {
    isEventLinkShown: false,
    setIsEventLinkShown: (value: boolean) => { },
    isAdminLinkShown: false,
    setIsAdminLinkShown: (value: boolean) => { }
  })

export function Providers({ children }: { children: React.ReactNode }) {

  const [isEventLinkShown, setIsEventLinkShown] = useState(false)
  const [isAdminLinkShown, setIsAdminLinkShown] = useState(false)

  return (
    <NavLinksContext.Provider value={{ isEventLinkShown, setIsEventLinkShown, isAdminLinkShown, setIsAdminLinkShown }}>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </SessionProvider>
    </NavLinksContext.Provider>
  )
}

