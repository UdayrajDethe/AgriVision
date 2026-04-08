import { useState } from 'react'
import './App.css'
import Navbar from './components/NavBar'
import Landing from './components/Landing'
import SideBar from './components/SideBar'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
    {/* <Navbar /> */}
    {/* <Landing/> */}
    <SideBar />
    <Dashboard/>
    </>
  )
}
export default App
