import { useTranslation } from 'react-i18next'
import { Layout } from '../components/Layout'

export function About() {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {t('pages.about.title')}
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t('pages.about.description')}
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {t('pages.about.features.title')}
          </h2>
          
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>{t('pages.about.features.react')}</li>
            <li>{t('pages.about.features.typescript')}</li>
            <li>{t('pages.about.features.vite')}</li>
            <li>{t('pages.about.features.tailwind')}</li>
            <li>{t('pages.about.features.zustand')}</li>
            <li>{t('pages.about.features.router')}</li>
            <li>{t('pages.about.features.i18n')}</li>
            <li>{t('pages.about.features.eslint')}</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}