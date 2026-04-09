import { useState } from 'react'
import './App.css'
import {Navbar,SideBar} from './components/NavBar'
import Landing from './components/Landing'
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
