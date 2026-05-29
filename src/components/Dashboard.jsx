import React, { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'

const DEFAULT_SUMMARY = {
  totalAnalyses: 0,
  diseased: 0,
  healthy: 0,
  healthScore: 0,
}

const DEFAULT_WEATHER = {
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 62,
  windSpeed: 9,
}

const WEATHER_CODE_LABELS = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Fog',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Heavy Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  80: 'Light Showers',
  81: 'Showers',
  82: 'Heavy Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Thunderstorm',
}

const WEATHER_LATITUDE = Number(import.meta.env.VITE_WEATHER_LATITUDE) || 20.5937
const WEATHER_LONGITUDE = Number(import.meta.env.VITE_WEATHER_LONGITUDE) || 78.9629

const getBrowserPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 10 * 60 * 1000,
      timeout: 8000,
    })
  })

const normalizeApiBase = (value) => {
  if (!value) {
    return ''
  }

  return value.endsWith('/') ? value.slice(0, -1) : value
}

const getStatusClass = (status) =>
  status === 'Healthy' ? 'analysis-status-healthy' : status === 'Diseased' ? 'analysis-status-diseased' : 'analysis-status-default'

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

const getStoredToken = () => localStorage.getItem('token') || ''

const getPredictedStatus = (item) => {
  const status = item.status

  if (status === 'Healthy' || status === 'Diseased') {
    return status
  }

  const label = String(item.predictedLabel || '').toLowerCase()

  if (label.includes('healthy')) {
    return 'Healthy'
  }

  if (label) {
    return 'Diseased'
  }

  return 'Unknown'
}

const getPredictedCrop = (item) => {
  if (item.crop && item.crop !== 'Unknown Crop') {
    return item.crop
  }

  const label = String(item.predictedLabel || '').replaceAll('_', ' ').trim()
  return label.split(/\s+/)[0] || 'Unknown Crop'
}

const normalizeHistoryItem = (item) => ({
  ...item,
  crop: getPredictedCrop(item),
  status: getPredictedStatus(item),
})

const buildSummary = (items) => {
  const totalAnalyses = items.length
  const healthy = items.filter((item) => item.status === 'Healthy').length
  const diseased = items.filter((item) => item.status === 'Diseased').length

  const healthScores = items.map((item) => {
    const confidence = Number(item.confidence) || 0

    if (item.status === 'Healthy') {
      return confidence * 100
    }

    if (item.status === 'Diseased') {
      return (1 - confidence) * 100
    }

    return 0
  })

  const healthScore = healthScores.length
    ? Math.round(healthScores.reduce((total, score) => total + score, 0) / healthScores.length)
    : 0

  return {
    totalAnalyses,
    diseased,
    healthy,
    healthScore,
  }
}

const getAnalysisTitle = (item) => {
  if (item.predictedLabel) {
    return item.predictedLabel
  }

  return item.crop || 'Unknown Crop'
}

const getAnalysisDetail = (item) => {
  const parts = []

  if (item.crop) {
    parts.push(item.crop)
  }

  if (item.imageName) {
    parts.push(item.imageName)
  }

  if (Number.isFinite(Number(item.confidence))) {
    parts.push(`${Math.round(Number(item.confidence) * 100)}% confidence`)
  }

  return parts.join(' - ')
}

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

export default function Dashboard({ activePage = 'Dashboard', onOpenUpload }) {
  const [summary, setSummary] = useState(DEFAULT_SUMMARY)
  const [analyses, setAnalyses] = useState([])
  const [weather, setWeather] = useState(DEFAULT_WEATHER)
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState('')
  const [weatherLocation, setWeatherLocation] = useState('Current location')
  const [isHistoryLoading, setIsHistoryLoading] = useState(true)
  const [historyError, setHistoryError] = useState('')
  const isAnalysisView = activePage === 'Analysis'

  useEffect(() => {
    const controller = new AbortController()
    const apiBase = normalizeApiBase(import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000')
    const token = getStoredToken()

    const loadHistory = async () => {
      if (!token) {
        setAnalyses([])
        setHistoryError('Login required to view analysis history.')
        setIsHistoryLoading(false)
        return
      }

      try {
        const response = await fetch(`${apiBase}/api/analysis/history`, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload.details || payload.message || `Request failed with status ${response.status}`)
        }

        const history = Array.isArray(payload?.history) ? payload.history.map(normalizeHistoryItem) : []

        setAnalyses(history)
        setSummary(buildSummary(history))
        setHistoryError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setAnalyses([])
          setSummary(DEFAULT_SUMMARY)
          setHistoryError(requestError.message || 'Failed to fetch analysis history.')
        }
      } finally {
        setIsHistoryLoading(false)
      }
    }

    loadHistory()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadWeather = async () => {
      try {
        let latitude = WEATHER_LATITUDE
        let longitude = WEATHER_LONGITUDE
        let locationLabel = 'Default location'

        try {
          const position = await getBrowserPosition()
          latitude = position.coords.latitude
          longitude = position.coords.longitude
          locationLabel = 'Current location'
        } catch {
          locationLabel = 'Default location'
        }

        const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast')
        weatherUrl.search = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
          timezone: 'auto',
        }).toString()

        const response = await fetch(weatherUrl, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Weather request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const current = payload?.current

        if (!current) {
          throw new Error('Weather response did not include current conditions')
        }

        setWeather({
          temperature: Math.round(Number(current.temperature_2m) || 0),
          condition: WEATHER_CODE_LABELS[current.weather_code] || 'Current Weather',
          humidity: Math.round(Number(current.relative_humidity_2m) || 0),
          windSpeed: Math.round(Number(current.wind_speed_10m) || 0),
        })
        setWeatherLocation(locationLabel)
        setWeatherError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setWeather(DEFAULT_WEATHER)
          setWeatherLocation('Default location')
          setWeatherError('Live weather unavailable')
        }
      } finally {
        setIsWeatherLoading(false)
      }
    }

    loadWeather()

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

  const loggedInUserName = getStoredUser()?.name || 'Farmer'

  return (
    <section className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">Crop Monitoring Overview</p>
            <h1>{isAnalysisView ? 'Analysis History' : `Welcome back, ${loggedInUserName}`}</h1>
            <p className="dashboard-subtitle">
              {isAnalysisView
                ? 'Review every saved prediction from your uploaded crop images.'
                : 'Monitor crop health, review recent analyses, and start a new scan from one place.'}
            </p>
            {isHistoryLoading && <p className="dashboard-api-note">Loading your analysis history...</p>}
            {historyError && <p className="dashboard-api-error">{historyError}</p>}
          </div>
          <button type="button" className="dashboard-action" onClick={onOpenUpload}>
            <i className="bi bi-camera-fill" aria-hidden="true" />
            Start New Analysis
          </button>
        </header>

        <div className="dashboard-grid">
          {!isAnalysisView && (
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
                  <strong>{isWeatherLoading ? '--' : `${weather.temperature} C`}</strong>
                  <span>{isWeatherLoading ? 'Loading weather...' : weather.condition}</span>
                </div>
                <div className="weather-meta">
                  <span>Humidity {weather.humidity}%</span>
                  <span>Wind {weather.windSpeed} km/h</span>
                </div>
                <p className="weather-location">{weatherLocation}</p>
                {weatherError && <p className="weather-error">{weatherError}</p>}
              </article>
            </div>
          </div>
          )}

          {!isAnalysisView && (
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
          )}

          <div className="row g-4">
            <div className="col-12">
              <article className="dashboard-card">
                <div className="dashboard-card-title">
                  <span>{isAnalysisView ? 'All Saved Predictions' : 'Recent Analyses'}</span>
                  <a href="/" onClick={(event) => event.preventDefault()} className="dashboard-link">
                    {analyses.length} saved
                  </a>
                </div>
                <div className="analysis-list">
                  {analyses.length ? (
                    analyses.map((item, index) => (
                      <div className="analysis-row" key={item.analysisId || `${item.crop}-${item.createdAt ?? index}`}>
                        <div>
                          <h3>{getAnalysisTitle(item)}</h3>
                          <p>
                            {formatRelativeTime(item.createdAt)}
                            {getAnalysisDetail(item) ? ` - ${getAnalysisDetail(item)}` : ''}
                          </p>
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
