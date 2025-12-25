import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { RouteConfig } from '../types'

// Declarative router configuration
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

export function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  )
}

export { routes }