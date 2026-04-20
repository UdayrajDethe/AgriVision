import React from 'react'
import './Landing.css'
import FarmerImg from '../assets/Farmer.png'
import camera from '../assets/camera.png'
import search from '../assets/search.png'
import medicine from '../assets/medicine.png'
import arrow from '../assets/arrow.png'
import people from '../assets/people.png'
import instant from '../assets/instant.png'
import accurate from '../assets/accurate.png'
import agrivision from '../assets/agrivision.png'

export default function Landing({ onStartScanning, onTakePictureUpload, onGetStarted }) {
  const scrollToId = (id) => {
    const node = document.getElementById(id)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleClick = (event, callback) => {
    event.preventDefault()
    callback?.()
  }

  return (
    <>
      <header className="landing-topbar">
        <div className="container landing-topbar-inner">
          <a href="#" className="landing-brand" onClick={(event) => handleClick(event, () => scrollToId('landing-home'))}>
            <img src={agrivision} width="36" alt="AgriVision" />
            <span>AgriVision</span>
          </a>

          <nav className="landing-nav-links">
            <a href="#" onClick={(event) => handleClick(event, () => scrollToId('landing-home'))}>Home</a>
            <a href="#" onClick={(event) => handleClick(event, () => scrollToId('landing-how'))}>How It Works</a>
            <a href="#" onClick={(event) => handleClick(event, () => scrollToId('landing-choose'))}>Why Choose</a>
          </nav>

          <div className="landing-topbar-actions">
            <button type="button" className="btn btn-topbar-secondary" onClick={onStartScanning}>
              Login
            </button>
            <button type="button" className="btn btn-topbar-primary" onClick={onGetStarted}>
              Register
            </button>
          </div>
        </div>
      </header>

      <div id="landing-home" className="landing-container">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6 col-md-7 landing-text">
              <h1 className="display-4 fw-bold text-white">Welcome to AgriVision</h1>
              <p className="lead fw-bold text-white mt-3">
                AI-powered crop disease detection to assist farmers.
                Identify plant diseases instantly and get treatment recommendations.
              </p>
              <div className="btns mt-4">
                <a href="#" className="btn btn-landing btn-lg me-3" onClick={(event) => handleClick(event, onStartScanning)}>
                  Start Scanning
                </a>
                <a href="#" className="btn btn-landing btn-lg" onClick={(event) => handleClick(event, () => scrollToId('landing-how'))}>
                  Learn More
                </a>
              </div>
            </div>

            <div className="col-lg-6 col-md-5 text-center">
              <img src={FarmerImg} alt="Farmer" className="img-fluid farmer-img" />
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section ">
        <div className="container">
          <div className="row text-center " style={{ marginTop: '-90px' }}>
            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-card">
                <h2 className="stat-number">50+</h2>
                <p className="stat-text">Diseases Identified</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-card">
                <h2 className="stat-number">500+</h2>
                <p className="stat-text">Active Users</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-card">
                <h2 className="stat-number">95%</h2>
                <p className="stat-text">Accuracy Rate</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-card">
                <h2 className="stat-number">24/7</h2>
                <p className="stat-text">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="landing-how" className="how-section">
        <div className="container text-center">
          <h1 className="how-title">Heal your crop</h1>
          <p className="how-subtitle">Three simple steps to diagnose and treat plant diseases</p>

          <div className="steps-card">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-3 col-md-3">
                <div className="step-item">
                  <div className="step-icon-box">
                    <img src={camera} className="img-fluid p-3" alt="Take a picture" />
                  </div>
                  <h5 className="step-title">Take a picture</h5>
                  <p className="step-desc">Capture or upload leaf image</p>
                </div>
              </div>

              <div className="col-auto arrow-col">
                <img src={arrow} className="img-fluid arrow-icon" alt="Next" />
              </div>

              <div className="col-lg-3 col-md-3">
                <div className="step-item">
                  <div className="step-icon-box">
                    <img src={search} className="img-fluid p-3" alt="See diagnosis" />
                  </div>
                  <h5 className="step-title">See diagnosis</h5>
                  <p className="step-desc">AI analyzes the disease</p>
                </div>
              </div>

              <div className="col-auto arrow-col">
                <img src={arrow} className="img-fluid arrow-icon" alt="Next" />
              </div>

              <div className="col-lg-3 col-md-3">
                <div className="step-item">
                  <div className="step-icon-box">
                    <img src={medicine} className="img-fluid" alt="Get medicine" />
                  </div>
                  <h5 className="step-title">Get medicine</h5>
                  <p className="step-desc">Receive treatment advice</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <a href="#" className="btn btn-how btn-lg" onClick={(event) => handleClick(event, onTakePictureUpload)}>
                Take Picture or Upload
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="landing-choose" className="choose-section">
        <div className="container text-center">
          <h1 className="choose-title">Why Choose AgriVision?</h1>
          <div className="card-container row d-flex justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="choose-item">
                <div className="choose-icon me-3">
                  <img src={instant} className="img-fluid" alt="Instant detection" />
                </div>
                <div className="choose-content">
                  <h5 className="choose-card-title">Instant Detection</h5>
                  <p className="choose-card-text">Get disease diagnosis in seconds with our advanced AI model</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src={accurate} className="img-fluid" alt="Accurate results" />
                </div>
                <h5 className="choose-card-title">Accurate Results</h5>
                <p className="choose-card-text">Our model achieves over 95% accuracy in identifying crop diseases</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="choose-item">
                <div className="choose-icon">
                  <img src={people} className="img-fluid" alt="User friendly" />
                </div>
                <h5 className="choose-card-title">User-Friendly</h5>
                <p className="choose-card-text">Simple interface designed for farmers of all tech levels</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sub-choose-section text-white">
        <div className="container text-center">
          <h1 className="sub-choose-title">Ready to protect your crops?</h1>
          <p className="sub-choose-text">
            Thousands of farmers are already using AgriVision to protect their crops. Join us today and
            experience the benefits of AI-powered crop disease detection.
          </p>
          <a href="#" className="btn btn-sub-choose btn-lg" onClick={(event) => handleClick(event, onGetStarted)}>
            Get Started Free
          </a>
        </div>
      </div>

      <div className="footer-section">
        <div className="container footer-container text-center">
          <a className="navbar-brand" href="#" onClick={(event) => event.preventDefault()}>
            <img src={agrivision} width="40" alt="AgriVision" />
            AgriVision
          </a>
          <p className="footer-text mb-0">© 2026 AgriVision. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}
