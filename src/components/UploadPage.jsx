import React, { useRef, useState } from 'react'
import './UploadPage.css'
import agrivision from '../assets/agrivision.png'

const tips = [
  'Take clear, well-lit photos of affected leaves',
  'Capture both sides of the leaf if possible',
  'Focus on the symptomatic area',
  'Avoid blurry or overexposed images',
]

export default function UploadPage({ onBack, onOpenHistory }) {
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000').replace(/\/$/, '')

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setIsCameraOpen(false)
  }

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      stopCamera()
    }
  }, [previewUrl])

  React.useEffect(() => {
    if (!isCameraOpen || !videoRef.current || !streamRef.current) {
      return
    }

    videoRef.current.srcObject = streamRef.current
    videoRef.current.play().catch(() => {
      setError('Unable to start camera preview. Please try again.')
    })
  }, [isCameraOpen])

  const handleFileSelect = (file) => {
    if (!file) {
      return
    }

    setSelectedFile({
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type || 'Unknown format',
    })
    setSelectedImage(file)
    setAnalysis(null)
    setError('')
    setPreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl)
      }

      return URL.createObjectURL(file)
    })
    stopCamera()
  }

  const analyzeImage = async (imageFile = selectedImage) => {
    if (!imageFile) {
      setError('Please upload or capture an image first.')
      return
    }

    const formData = new FormData()
    formData.append('image', imageFile)
    setIsAnalyzing(true)
    setError('')

    try {
      const response = await fetch(`${apiBase}/api/analyze`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        },
        body: formData,
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.details || payload.message || 'Image analysis failed')
      }

      setAnalysis(payload)
    } catch (requestError) {
      setError(requestError.message || 'Image analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const openCamera = async () => {
    setError('')
    setAnalysis(null)

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera is not supported in this browser. Please use Browse to upload a photo.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      })

      streamRef.current = stream
      setIsCameraOpen(true)
    } catch {
      setError('Unable to open camera. Please allow camera permission or use Browse.')
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      setError('Camera is not ready yet. Please try again.')
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      if (!blob) {
        setError('Could not capture photo. Please try again.')
        return
      }

      const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
      handleFileSelect(file)
    }, 'image/jpeg', 0.92)
  }

  const handleInputChange = (event) => {
    handleFileSelect(event.target.files?.[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    handleFileSelect(event.dataTransfer.files?.[0])
  }

  const confidence = Number(analysis?.prediction?.confidence) || 0
  const minimumConfidence = Number(analysis?.minimumConfidence) || 0.9
  const hasConfidentPrediction = analysis && analysis.accepted !== false && confidence >= minimumConfidence

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

          <button type="button" className="upload-history-button" onClick={onOpenHistory}>
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
              <button type="button" className="upload-camera-button" onClick={openCamera}>
                <i className="bi bi-camera-fill" aria-hidden="true" />
                Camera
              </button>
            </div>

            {isCameraOpen && (
              <div className="upload-camera-panel">
                <video ref={videoRef} className="upload-camera-preview" autoPlay muted playsInline />
                <canvas ref={canvasRef} className="upload-camera-canvas" aria-hidden="true" />
                <div className="upload-camera-actions">
                  <button type="button" className="upload-camera-capture-button" onClick={capturePhoto}>
                    <i className="bi bi-camera-fill" aria-hidden="true" />
                    Capture Photo
                  </button>
                  <button type="button" className="upload-camera-cancel-button" onClick={stopCamera}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </article>

          <article className="upload-card upload-results-card">
            <div className="upload-card-title">
              <span>Analysis Results</span>
            </div>

            {selectedFile ? (
              <div className="upload-results-filled">
                {previewUrl && (
                  <div className="upload-preview">
                    <img src={previewUrl} alt="Selected plant leaf" />
                  </div>
                )}
                {isAnalyzing && (
                  <div className="upload-analysis-pending">
                    <i className="bi bi-hourglass-split" aria-hidden="true" />
                    <span>Getting prediction from Roboflow...</span>
                  </div>
                )}
                {error && <p className="upload-error">{error}</p>}
                {analysis && !hasConfidentPrediction && (
                  <div className="upload-analysis-warning">
                    <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
                    <div>
                      <h3>Image is not clear enough</h3>
                      <p>{analysis.warning || 'Please upload a clear crop or plant leaf photo.'}</p>
                      <p className="upload-confidence">Confidence: {Math.round(confidence * 100)}%</p>
                      <p>Required confidence: {Math.round(minimumConfidence * 100)}%</p>
                    </div>
                  </div>
                )}
                {hasConfidentPrediction && (
                  <div className="upload-analysis-result">
                    <span className="upload-result-kicker">Predicted Result</span>
                    <h3>{analysis.prediction?.label || 'Unknown disease'}</h3>
                    <p className="upload-confidence">
                      Confidence: {Math.round((Number(analysis.prediction?.confidence) || 0) * 100)}%
                    </p>
                    {analysis.disease ? (
                      <>
                        <p><strong>Symptoms:</strong> {analysis.disease.SYMPTOMS || 'Not added yet'}</p>
                        <p><strong>Treatment:</strong> {analysis.disease.TREATMENT || 'Not added yet'}</p>
                      </>
                    ) : (
                      <p>Disease details are not added yet, but the Roboflow prediction is ready.</p>
                    )}
                  </div>
                )}
                <button type="button" className="upload-analyze-button" onClick={() => analyzeImage()} disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing...' : analysis ? 'Analyze Again' : 'Analyze Image'}
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
