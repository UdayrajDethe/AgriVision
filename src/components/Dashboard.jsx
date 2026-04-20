import React, { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'

const DEFAULT_SUMMARY = {
  totalAnalyses: 128,
  diseased: 34,
  healthy: 94,
  healthScore: 85,
}

const DEFAULT_ANALYSES = [
  { crop: 'Tomato Field A', status: 'Diseased', createdAt: '2026-04-18T08:20:00.000Z' },
  { crop: 'Corn Plot B', status: 'Healthy', createdAt: '2026-04-18T07:30:00.000Z' },
  { crop: 'Wheat Section C', status: 'Diseased', createdAt: '2026-04-18T03:15:00.000Z' },
]

const normalizeApiBase = (value) => {
  if (!value) {
    return ''
  }

  return value.endsWith('/') ? value.slice(0, -1) : value
}

const getStatusClass = (status) =>
  status === 'Healthy' ? 'analysis-status-healthy' : status === 'Diseased' ? 'analysis-status-diseased' : 'analysis-status-default'

const getHealthTag = (score) => {
  if (score >= 75) {
    return { label: 'Good', className: 'dashboard-tag-good' }
  }

  if (score >= 50) {
    return { label: 'Moderate', className: 'dashboard-tag-moderate' }
  }

  return { label: 'Attention', className: 'dashboard-tag-alert' }
}

const formatRelativeTime = (value) => {
  if (!value) {
    return 'Unknown time'
  }

  const when = new Date(value)

  if (Number.isNaN(when.getTime())) {
    return String(value)
  }

  const deltaMinutes = Math.round((Date.now() - when.getTime()) / 60000)

  if (deltaMinutes < 1) {
    return 'Just now'
  }

  if (deltaMinutes < 60) {
    return `${deltaMinutes} min ago`
  }

  const deltaHours = Math.round(deltaMinutes / 60)
  if (deltaHours < 24) {
    return `${deltaHours} hour${deltaHours > 1 ? 's' : ''} ago`
  }

  return when.toLocaleString()
}

export default function Dashboard({ onOpenUpload }) {
  const [summary, setSummary] = useState(DEFAULT_SUMMARY)
  const [analyses, setAnalyses] = useState(DEFAULT_ANALYSES)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const apiBase = normalizeApiBase(import.meta.env.VITE_API_BASE_URL)

    const loadDashboard = async () => {
      try {
        const response = await fetch(`${apiBase}/api/dashboard?limit=5`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (payload?.summary) {
          setSummary({
            totalAnalyses: Number(payload.summary.totalAnalyses) || 0,
            diseased: Number(payload.summary.diseased) || 0,
            healthy: Number(payload.summary.healthy) || 0,
            healthScore: Number(payload.summary.healthScore) || 0,
          })
        }

        if (Array.isArray(payload?.recentAnalyses)) {
          setAnalyses(payload.recentAnalyses)
        }

        setError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Showing fallback data because the Oracle API is unavailable.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()

    return () => {
      controller.abort()
    }
  }, [])

  const healthScore = Math.max(0, Math.min(summary.healthScore, 100))
  const scoreDegrees = Math.round((healthScore / 100) * 360)
  const healthTag = getHealthTag(healthScore)

  const summaryCards = useMemo(
    () => [
      { label: 'Total Analyses', value: summary.totalAnalyses, detail: 'From Oracle', icon: 'bi-bar-chart-line-fill' },
      { label: 'Diseased', value: summary.diseased, detail: 'Needs review', icon: 'bi-exclamation-triangle-fill' },
      { label: 'Healthy', value: summary.healthy, detail: 'Strong growth', icon: 'bi-check-circle-fill' },
    ],
    [summary],
  )

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
            {isLoading && <p className="dashboard-api-note">Loading data from Oracle...</p>}
            {error && <p className="dashboard-api-error">{error}</p>}
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
                  <span className={`dashboard-tag ${healthTag.className}`}>{healthTag.label}</span>
                </div>
                <div
                  className="score-ring"
                  style={{ background: `conic-gradient(#355e3b 0 ${scoreDegrees}deg, #d7e4d2 ${scoreDegrees}deg 360deg)` }}
                  aria-label={`Crop health score is ${healthScore} percent`}
                >
                  <div className="score-ring-inner">
                    <strong>{healthScore}%</strong>
                    <span>Overall health</span>
                  </div>
                </div>
                <p className="score-copy">Live score based on average crop health values stored in Oracle.</p>
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
                  {analyses.length ? (
                    analyses.map((item, index) => (
                      <div className="analysis-row" key={`${item.crop}-${item.createdAt ?? index}`}>
                        <div>
                          <h3>{item.crop ?? 'Unknown Crop'}</h3>
                          <p>{formatRelativeTime(item.createdAt)}</p>
                        </div>
                        <span className={`analysis-status ${getStatusClass(item.status)}`}>{item.status ?? 'Unknown'}</span>
                      </div>
                    ))
                  ) : (
                    <p className="analysis-empty">No analyses found in Oracle yet.</p>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
