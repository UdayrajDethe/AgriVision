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
import agrivision from '../assets/agriVision.png'


export default function Landing() {
  return (
    // hero section 
    <>
    <div className="landing-container">
      <div className="container h-100">
        <div className="row h-100 align-items-center">  {/* ← vertical center */}
          
          <div className="col-lg-6 col-md-7 landing-text">  {/* ← left side */}
            <h1 className="display-4 fw-bold text-white">Welcome to AgriVision</h1>
            <p className="lead text-white mt-3">
              AI-powered crop disease detection to assist farmers. 
              Identify plant diseases instantly and get treatment recommendations.
            </p>
            <div className="btns mt-4">
              <a href="#" className="btn btn-landing btn-lg me-3">Start Scanning</a>
              <a href="#" className="btn btn-landing btn-lg">Learn More</a>
            </div>
          </div>

          <div className="col-lg-6 col-md-5 text-center">  {/* ← right side */}
            <img src={FarmerImg} alt="Farmer" className="img-fluid farmer-img" />
          </div>

        </div>
      </div>
    </div>

  {/* // stats section  */}

    <div className="stats-section ">
      <div className="container">
        <div className="row text-center "  style={{ marginTop: '-90px' }}>

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

    {/* How it Works Section */}
    <div className="how-section">
      <div className="container text-center">
        
        {/* Heading */}
        <h1 className="how-title">Heal your crop</h1>
        <p className="how-subtitle">Three simple steps to diagnose and treat plant diseases</p>

        {/* Steps Card */}
        <div className="steps-card">
          <div className="row align-items-center justify-content-center">
            
            {/* Step 1 */}
            <div className="col-lg-3 col-md-3">
              <div className="step-item">
                
                <div className="step-icon-box">
                  <img src={camera} className="img-fluid p-3" alt="" />
                </div>
                <h5 className="step-title">Take a picture</h5>
                <p className="step-desc">Capture or upload leaf image</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="col-auto arrow-col">
              <img src={arrow} className="img-fluid arrow-icon" alt="" />
            </div>

            {/* Step 2 */}
            <div className="col-lg-3 col-md-3">
              <div className="step-item">
                <div className="step-icon-box">
                  <img src={search} className="img-fluid p-3" alt="" />
                </div>
                <h5 className="step-title">See diagnosis</h5>
                <p className="step-desc">AI analyzes the disease</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="col-auto arrow-col">
              <img src={arrow} className="img-fluid arrow-icon" alt="" />
            </div>

            {/* Step 3 */}
            <div className="col-lg-3 col-md-3">
              <div className="step-item">
                <div className="step-icon-box">
                  <img src={medicine} className="img-fluid " alt="" />
                </div>
                <h5 className="step-title">Get medicine</h5>
                <p className="step-desc">Receive treatment advice</p>
              </div>
            </div>

          </div>

          {/* Button */}
          <div className="text-center mt-4">
            <a href="#" className="btn btn-how btn-lg">Take Picture or Upload</a>
          </div>

        </div>
      </div>
    </div>

    {/* Why choose section*/}

    <div className="choose-section">
      <div className="container text-center">
        
        <h1 className="choose-title">Why Choose AgriVision?</h1>
        <div className="card-container row d-flex justify-content-center">

          {/* Card 1 */}
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="choose-item">
              <div className="choose-icon me-3">
                <img src={instant} className='img-fluid' alt="icon 1" />
              </div>
              <div className="choose-content">
                <h5 className="choose-card-title">Instant Detection</h5>
                <p className="choose-card-text">Get disease diagnosis in seconds with our advanced AI model</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="choose-item"> 
              <div className="choose-icon">
                <img src={accurate} className='img-fluid' alt="icon 2" />
              </div>
              <h5 className="choose-card-title">Accurate Results</h5>
              <p className="choose-card-text">Our model achieves over 95% accuracy in identifying crop diseases</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="choose-item">
              <div className="choose-icon">
                <img src={people} className="img-fluid" alt="icon 3" />
              </div>
              <h5 className="choose-card-title">User-Friendly</h5>
              <p className="choose-card-text">Simple interface designed for farmers of all tech levels</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    {/*  */}

    <div className="sub-choose-section text-white">
      <div className="container text-center">
        <h1 className="sub-choose-title">Ready to protect your crops?</h1>
        <p className="sub-choose-text">Thousands of farmers are already using AgriVision to protect their crops. Join us today and experience the benefits of AI-powered crop disease detection.</p>
        <a href="#" className="btn btn-sub-choose btn-lg">Get Started Free</a>
      </div>
    </div>

     {/*Footer */}
     <div className="footer-section">
      <div className="container footer-container text-center">
        <a className="navbar-brand" href="#">
          <img src={agrivision} width="40px" alt="AgriVision"/>
          AgriVision
        </a>
        <p className="footer-text mb-0">© 2024 AgriVision. All rights reserved.</p>
      </div>
     </div>

    </>
  )
}