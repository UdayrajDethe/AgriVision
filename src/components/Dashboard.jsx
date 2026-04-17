import React from 'react'
import './Dashboard.css'

const summaryCards = [
  { label: 'Total Analyses', value: '128', detail: 'This month', icon: 'bi-bar-chart-line-fill' },
  { label: 'Diseased', value: '34', detail: 'Needs review', icon: 'bi-exclamation-triangle-fill' },
  { label: 'Healthy', value: '94', detail: 'Strong growth', icon: 'bi-check-circle-fill' },
]

const analyses = [
  { crop: 'Tomato Field A', status: 'Diseased', time: '10 min ago' },
  { crop: 'Corn Plot B', status: 'Healthy', time: '1 hour ago' },
  { crop: 'Wheat Section C', status: 'Diseased', time: 'Today, 8:45 AM' },
]

export default function Dashboard({ onOpenUpload }) {
  return (
    <section className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">Crop Monitoring Overview</p>
            <h1>Welcome back, UserName</h1>
            <p className="dashboard-subtitle">
              Monitor crop health, review recent analyses, and start a new scan from one place.
            </p>
          </div>
          <button type="button" className="dashboard-action" onClick={onOpenUpload}>
            <i className="bi bi-camera-fill" aria-hidden="true" />
            Start New Analysis
          </button>
        </header>

        <div className="dashboard-grid">
          <div className="row g-4">
            {summaryCards.map((card) => (
              <div className="col-12 col-sm-6 col-xl-3" key={card.label}>
                <article className="dashboard-card dashboard-summary-card">
                  <div className="summary-icon" aria-hidden="true">
                    <i className={`bi ${card.icon}`} />
                  </div>
                  <div>
                    <p className="summary-label">{card.label}</p>
                    <h2 className="summary-value">{card.value}</h2>
                    <p className="summary-detail">{card.detail}</p>
                  </div>
                </article>
              </div>
            ))}

            <div className="col-12 col-xl-3">
              <article className="dashboard-card dashboard-weather-card">
                <div className="dashboard-card-title">
                  <span>Weather Today</span>
                  <i className="bi bi-cloud-sun-fill" aria-hidden="true" />
                </div>
                <div className="weather-main">
                  <strong>28 C</strong>
                  <span>Partly Cloudy</span>
                </div>
                <div className="weather-meta">
                  <span>Humidity 62%</span>
                  <span>Wind 9 km/h</span>
                </div>
              </article>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <article className="dashboard-card">
                <div className="dashboard-card-title">
                  <span>Quick Analysis</span>
                  <span className="dashboard-tag">Upload</span>
                </div>
                <button type="button" className="upload-panel" onClick={onOpenUpload}>
                  <i className="bi bi-cloud-arrow-up-fill" aria-hidden="true" />
                  <span className="upload-title">Upload Crop Image</span>
                  <span className="upload-copy">Drag and drop an image here or click to browse files.</span>
                </button>
              </article>
            </div>

            <div className="col-12 col-lg-5">
              <article className="dashboard-card dashboard-score-card">
                <div className="dashboard-card-title">
                  <span>Crop Health Score</span>
                  <span className="dashboard-tag dashboard-tag-good">Good</span>
                </div>
                <div className="score-ring" aria-label="Crop health score is 85 percent">
                  <div className="score-ring-inner">
                    <strong>85%</strong>
                    <span>Overall health</span>
                  </div>
                </div>
                <p className="score-copy">Most fields are stable, but a few recent disease detections need attention.</p>
              </article>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12">
              <article className="dashboard-card">
                <div className="dashboard-card-title">
                  <span>Recent Analyses</span>
                  <a href="/" onClick={(event) => event.preventDefault()} className="dashboard-link">
                    View all
                  </a>
                </div>
                <div className="analysis-list">
                  {analyses.map((item) => (
                    <div className="analysis-row" key={`${item.crop}-${item.time}`}>
                      <div>
                        <h3>{item.crop}</h3>
                        <p>{item.time}</p>
                      </div>
                      <span
                        className={`analysis-status ${
                          item.status === 'Healthy' ? 'analysis-status-healthy' : 'analysis-status-diseased'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
