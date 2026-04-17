import { useState } from 'react'
import './App.css'
import { SideBar } from './components/NavBar'
import Dashboard from './components/Dashboard'
import UploadPage from './components/UploadPage'
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  if (activePage === 'Upload') {
    return <UploadPage onBack={() => setActivePage('Dashboard')} />
  }

  return (
    <>
      <SideBar active={activePage} onNavigate={setActivePage} />
      <Dashboard onOpenUpload={() => setActivePage('Upload')} />
    </>
  )
}

export default App
