import { useAppStore as useStore } from '../stores/appStore'

// Custom hooks for specific store slices
export const useUser = () => useStore((state) => state.user)
export const useTheme = () => useStore((state) => state.theme)
export const useLoading = () => useStore((state) => state.isLoading)

// Actions hooks
export const useAppActions = () => {
  const setUser = useStore((state) => state.setUser)
  const setLoading = useStore((state) => state.setLoading)
  const setTheme = useStore((state) => state.setTheme)
  const toggleTheme = useStore((state) => state.toggleTheme)

  return {
    setUser,
    setLoading,
    setTheme,
    toggleTheme,
  }
}

// Re-export the main store hook
export const useAppStore = useStore