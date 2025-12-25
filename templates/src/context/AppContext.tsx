import React, { createContext, useContext, ReactNode } from 'react'
import { useAppStore } from '../stores/appStore'

interface AppContextValue {
  // Add any additional context values here
  appName: string
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppContextProvider({ children }: { children: ReactNode }) {
  const appName = import.meta.env.VITE_APP_NAME || 'My Web App'

  const value: AppContextValue = {
    appName,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}