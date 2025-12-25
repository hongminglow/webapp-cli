import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'
import { Button } from '../components/ui/Button'
import { useUser, useAppActions } from '../hooks/useAppStore'

export function Home() {
  const { t } = useTranslation()
  const user = useUser()
  const { setUser } = useAppActions()

  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('pages.home.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('pages.home.description')}
        </p>
        
        {user ? (
          <div className="space-y-4">
            <p className="text-green-600 dark:text-green-400">
              {t('pages.home.welcome', { name: user.name })}
            </p>
            <Button onClick={handleLogout} variant="destructive">
              {t('auth.logout')}
            </Button>
          </div>
        ) : (
          <Button onClick={handleLogin}>
            {t('auth.login')}
          </Button>
        )}
      </div>
    </Layout>
  )
}