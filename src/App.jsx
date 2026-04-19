import { useState } from 'react'
import './App.css'
import { SideBar } from './components/NavBar'
import Dashboard from './components/Dashboard'
import UploadPage from './components/UploadPage'
import Login from './components/Login'
import Register from './components/Register'
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  const [activePage, setActivePage] = useState(
    localStorage.getItem("token") ? "Dashboard" : "Login"
  )

  if (activePage === 'Login') {
    return (
      <Login
        onLogin={() => setActivePage('Dashboard')}
        onRegister={() => setActivePage('Register')}
      />
    )
  }

  if (activePage === 'Register') {
    return (
      <Register onBackToLogin={() => setActivePage('Login')} />
    )
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
          localStorage.clear();
          setActivePage('Login');
        }}
      />

      <Dashboard onOpenUpload={() => setActivePage('Upload')} />
    </>
  )
}

export default App


// import { useState, useEffect } from 'react'
// import './App.css'
// import { SideBar } from './components/NavBar'
// import Dashboard from './components/Dashboard'
// import UploadPage from './components/UploadPage'
// import Login from './components/Login'
// import Register from './components/Register'
// import 'bootstrap-icons/font/bootstrap-icons.css'

// function App() {
//   const [activePage, setActivePage] = useState("Login")

//   // ✅ CHECK LOGIN STATUS ON APP LOAD
//   useEffect(() => {
//     const token = localStorage.getItem("token")

//     if (token) {
//       setActivePage("Dashboard")
//     } else {
//       setActivePage("Login")
//     }
//   }, [])

//   // 🔥 LOGIN PAGE
//   if (activePage === 'Login') {
//     return (
//       <Login
//         onLogin={() => setActivePage('Dashboard')}
//         onRegister={() => setActivePage('Register')}
//       />
//     )
//   }

//   // 🔥 REGISTER PAGE
//   if (activePage === 'Register') {
//     return (
//       <Register onBackToLogin={() => setActivePage('Login')} />
//     )
//   }

//   // 🔥 UPLOAD PAGE
//   if (activePage === 'Upload') {
//     return <UploadPage onBack={() => setActivePage('Dashboard')} />
//   }

//   // 🔥 DASHBOARD + SIDEBAR
//   return (
//     <>
//       <SideBar
//         active={activePage}
//         onNavigate={setActivePage}
//         onLogout={() => {
//           localStorage.removeItem("token")
//           localStorage.removeItem("user")
//           setActivePage("Login")
//         }}
//       />

//       <Dashboard onOpenUpload={() => setActivePage('Upload')} />
//     </>
//   )
// }

// export default App


// import { useState, useEffect } from 'react'
// import './App.css'
// import { SideBar } from './components/NavBar'
// import Dashboard from './components/Dashboard'
// import UploadPage from './components/UploadPage'
// import Login from './components/Login'
// import Register from './components/Register'
// import 'bootstrap-icons/font/bootstrap-icons.css'

// function App() {
//   const [activePage, setActivePage] = useState(null)

//   useEffect(() => {
//     const token = localStorage.getItem("token")

//     if (token) {
//       setActivePage("Dashboard")
//     } else {
//       setActivePage("Login")
//     }
//   }, [])

//   // ⛔ IMPORTANT: wait until check completes
//   if (!activePage) return null

//   if (activePage === 'Login') {
//     return (
//       <Login
//         onLogin={() => setActivePage('Dashboard')}
//         onRegister={() => setActivePage('Register')}
//       />
//     )
//   }

//   if (activePage === 'Register') {
//     return (
//       <Register onBackToLogin={() => setActivePage('Login')} />
//     )
//   }

//   if (activePage === 'Upload') {
//     return <UploadPage onBack={() => setActivePage('Dashboard')} />
//   }

//   return (
//     <>
//       <SideBar
//         active={activePage}
//         onNavigate={setActivePage}
//         onLogout={() => {
//           localStorage.removeItem("token")
//           localStorage.removeItem("user")
//           setActivePage("Login")
//         }}
//       />

//       <Dashboard onOpenUpload={() => setActivePage('Upload')} />
//     </>
//   )
// }

// export default App