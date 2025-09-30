import { useState } from 'react'
import { LoginPage } from './components/LoginPage'
import { DashboardPage } from './components/DashboardPageNew'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <DashboardPage />
}

export default App