import React, { useRef, useState } from 'react'
import './UploadPage.css'
import agrivision from '../assets/agrivision.png'

const tips = [
  'Take clear, well-lit photos of affected leaves',
  'Capture both sides of the leaf if possible',
  'Focus on the symptomatic area',
  'Avoid blurry or overexposed images',
]

export default function UploadPage({ onBack }) {
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file) => {
    if (!file) {
      return
    }

    setSelectedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type || 'Unknown format',
    })
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (event) => {
    handleFileSelect(event.target.files?.[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    handleFileSelect(event.dataTransfer.files?.[0])
  }

  return (
    <section className="upload-page">
      <header className="upload-topbar">
        <div className="upload-topbar-inner">
          <button type="button" className="upload-back-button" onClick={onBack} aria-label="Go back">
            <i className="bi bi-arrow-left" aria-hidden="true" />
          </button>

          <div className="upload-brand">
            <img src={agrivision} alt="AgriVision" />
            <span>AgriVision</span>
          </div>

          <button type="button" className="upload-history-button">
            History
          </button>
        </div>
      </header>

      <div className="upload-shell">
        <header className="upload-header">
          <h1>Upload Plant Image</h1>
          <p className="upload-subtitle">
            Take a photo or upload an image of your plant leaf for disease analysis
          </p>
        </header>

        <div className="upload-main-grid">
          <article className="upload-card upload-select-card">
            <div className="upload-card-title">
              <span>Select Image</span>
            </div>

            <div
              className={`upload-dropzone ${isDragging ? 'upload-dropzone-active' : ''}`}
              onClick={openFilePicker}
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openFilePicker()
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="upload-input"
                onChange={handleInputChange}
              />
              <div className="upload-dropzone-icon" aria-hidden="true">
                <i className="bi bi-upload" />
              </div>
              <h2>Drag & drop image here</h2>
              <p className="upload-dropzone-link">or click to browse</p>
              <p className="upload-dropzone-support">Supports: JPG, PNG, WebP (Max 10MB)</p>
            </div>

            <div className="upload-actions">
              <button type="button" className="upload-browse-button" onClick={openFilePicker}>
                <i className="bi bi-image" aria-hidden="true" />
                Browse
              </button>
              <button type="button" className="upload-camera-button">
                <i className="bi bi-camera-fill" aria-hidden="true" />
                Camera
              </button>
            </div>
          </article>

          <article className="upload-card upload-results-card">
            <div className="upload-card-title">
              <span>Analysis Results</span>
            </div>

            {selectedFile ? (
              <div className="upload-results-filled">
                <div className="selected-file">
                  <div className="selected-file-icon" aria-hidden="true">
                    <i className="bi bi-file-earmark-image-fill" />
                  </div>
                  <div>
                    <h3>{selectedFile.name}</h3>
                    <p>{selectedFile.type}</p>
                  </div>
                  <strong>{selectedFile.size}</strong>
                </div>
                <button type="button" className="upload-analyze-button">
                  Analyze Image
                </button>
              </div>
            ) : (
              <div className="upload-results-empty">
                <div className="upload-results-empty-icon" aria-hidden="true">
                  <i className="bi bi-exclamation-circle" />
                </div>
                <h3>No analysis yet</h3>
                <p>Upload an image to get started</p>
              </div>
            )}
          </article>
        </div>

        <article className="upload-tips-card">
          <h2>Tips for best results:</h2>
          <ul className="upload-tips-list">
            {tips.map((tip) => (
              <li key={tip}>
                <i className="bi bi-check-circle" aria-hidden="true" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
