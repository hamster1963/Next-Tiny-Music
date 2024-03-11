"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

export function Providers({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
