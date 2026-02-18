"use client"

import { ContextProvider as SettingsProvider } from "@/context/context"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>
}
