import React from 'react'
import './Dashboard.css'

export default function Dashboard   (){
    return (
        <>
        <div className="container">
            <h1>Welcome Back UserName</h1>
            <p>Monitor your crops and get disease insights.</p>
            <div className="row">
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <img src="/path/to/analysis-icon.png" alt="Total Analyses" />
                            <h5 className="card-title">Total Analyses</h5>
                            <p className="card-text">Count</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <img src="/path/to/disease-icon.png" alt="Diseased" />
                            <h5 className="card-title">Diseased</h5>
                            <p className="card-text">Count</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card">
                        <div className="card-body">
                            <img src="/path/to/healthy-icon.png" alt="Healthy" />
                            <h5 className="card-title">Healthy</h5>
                            <p className="card-text">Count</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><img src='' alt="WeatherIcon" /> Weather Today</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Quick Analysis</h5>
                            <div className="file-container text-center">
                                <h3>📁 Upload Image</h3>
                                <p>Drag & drop images or click to browse</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Crops Health Score</h5>
                            <div className="persentage-container text-center    ">
                                <h3>85%</h3>
                                <p>Overall Health Status</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-11">
                    <div className="card" id ="recent-analyses">
                        <div className="card-body">
                            <h5 className="card-title">Recent Analyses</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Crop 1 - Diseased</li>
                                <li className="list-group-item">Crop 2 - Healthy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}