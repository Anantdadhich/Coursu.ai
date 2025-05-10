"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryclient=new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryclient}>
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
    </QueryClientProvider>
  )
}
