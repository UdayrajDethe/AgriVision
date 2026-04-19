import React from 'react'
import './Navbar.css'
import agrivision from '../assets/agrivision.png'

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark px-4">
        <a className="navbar-brand" href="#">
          <img src={agrivision} width="40px" alt="AgriVision" />
          AgriVision
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ">
            <li className="nav-item"><a className="nav-link active" href="/">Feature</a></li>
            <li className="nav-item"><a className="nav-link" href="#section-feature">How it Works</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Reports</a></li>
          </ul>
          <ul className="navbar-nav right-item ms-auto ">
            <li className="nav-item logo-item"><a className="nav-link mr-3" href="#">Login</a></li>
            <li className="nav-item"><a href="#" className="btn btn-start btn-light btn-lg">Get Started</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export const SideBar = ({ active = 'Dashboard', onNavigate, onLogout }) => {
  const items = [
    { label: 'Dashboard', icon: 'bi-house-door-fill' },
    { label: 'Upload', icon: 'bi-cloud-arrow-up-fill' },
    { label: 'Analysis', icon: 'bi-bezier2' },
    { label: 'Settings', icon: 'bi-gear-fill' },
  ]

  return (
    <>
      <div className="sidebar text-center">
        <div className="sidebar-header">
          <img src={agrivision} alt="AgriVision Logo" width="32px" />
          <h2>AgriVision</h2>
        </div>

        <div className="sidebar-items">
          {items.map((item) => (
            <a
              key={item.label}
              href="#"
              className={active === item.label ? 'active' : ''}
              onClick={(event) => {
                event.preventDefault()
                onNavigate?.(item.label)
              }}
            >
              <span className="icon">
                <i className={`bi ${item.icon}`} aria-hidden="true" />
              </span>
              {item.label}
            </a>
          ))}
        </div>

        {/* ✅ LOGOUT WORKING */}
        <div className="sidebar-footer">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              onLogout()   // 🔥 redirect to login
            }}
          >
            <i className="bi bi-door-open-fill" aria-hidden="true" /> Logout
          </a>
        </div>
      </div>
    </>
  )
}