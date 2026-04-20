import { useState } from 'react'
import './App.css'
import { SideBar } from './components/NavBar'
import Dashboard from './components/Dashboard'
import UploadPage from './components/UploadPage'
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  const [activePage, setActivePage] = useState(localStorage.getItem('token') ? 'Dashboard' : 'Landing')

  if (activePage === 'Landing') {
    return (
      <Landing
        onStartScanning={() => setActivePage('Login')}
        onTakePictureUpload={() => setActivePage('Login')}
        onGetStarted={() => setActivePage('Register')}
      />
    )
  }

  if (activePage === 'Login') {
    return (
      <Login
        onLogin={() => setActivePage('Dashboard')}
        onRegister={() => setActivePage('Register')}
        onBackToLanding={() => setActivePage('Landing')}
      />
    )
  }

  if (activePage === 'Register') {
    return <Register onBackToLogin={() => setActivePage('Login')} onBackToLanding={() => setActivePage('Landing')} />
  }

  if (activePage === 'Upload') {
    return <UploadPage onBack={() => setActivePage('Dashboard')} />
  }

  return (
    <>
      <SideBar
        active={activePage}
        onNavigate={setActivePage}
        onLogout={() => {
          localStorage.clear()
          setActivePage('Landing')
        }}
      />
      <Dashboard onOpenUpload={() => setActivePage('Upload')} />
    </>
  )
}

export default App
