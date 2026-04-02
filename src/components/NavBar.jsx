import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-success px-4">
        <a className="navbar-brand" href="#">
          <img src="https://res.cloudinary.com/dzu5rgm5y/image/upload/v1752464503/logo-remove-bg_o0qxqr.png" width="40px" alt=""/>
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
            <li className="nav-item"><a href="#" className="btn btn-start btn-light  btn-lg">Get Started</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}