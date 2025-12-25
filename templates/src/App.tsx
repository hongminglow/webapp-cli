import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { AppContextProvider } from './context/AppContext'

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default App