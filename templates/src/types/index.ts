export interface User {
  id: string
  name: string
  email: string
}

export interface AppState {
  user: User | null
  isLoading: boolean
  theme: 'light' | 'dark'
}

export interface RouteConfig {
  path: string
  name: string
  component: React.ComponentType
  exact?: boolean
}