import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AppState, User } from '../types'

interface AppStore extends AppState {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        theme: 'light',
        setUser: (user) => set({ user }),
        setLoading: (isLoading) => set({ isLoading }),
        setTheme: (theme) => set({ theme }),
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
          })),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          user: state.user,
          theme: state.theme,
        }),
      }
    ),
    { name: 'app-store' }
  )
)