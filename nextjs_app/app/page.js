'use client'
import { useState, useEffect } from 'react'

const BACKEND_URL = 'http://localhost'

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health/`)
        if (res.ok) setConnected(true)
        else setConnected(false)
      } catch {
        setConnected(false)
      } finally {
        setChecking(false)
      }
    }
    checkHealth()
    const interval = setInterval(checkHealth, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setLoggedUser(data.user)
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch {
      setError('Could not reach backend')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0f;
          min-height: 100vh;
          font-family: 'Syne', sans-serif;
          overflow: hidden;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .glow {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,252,138,0.07) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          z-index: 1;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          padding: 40px;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header {
          margin-bottom: 32px;
        }

        .tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #63fc8a;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        h1 {
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .status-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 2px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot.connected {
          background: #63fc8a;
          box-shadow: 0 0 8px #63fc8a;
          animation: blink 2s ease-in-out infinite;
        }

        .dot.disconnected {
          background: #ff4d4d;
          box-shadow: 0 0 8px #ff4d4d;
        }

        .dot.checking {
          background: #ffd166;
          box-shadow: 0 0 8px #ffd166;
          animation: blink 0.8s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .status-text {
          color: rgba(255,255,255,0.5);
        }

        .status-text span {
          color: #fff;
          font-weight: 700;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 28px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          padding: 12px 14px;
          color: #fff;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus {
          border-color: #63fc8a;
        }

        input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .error {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #ff4d4d;
          padding: 10px 12px;
          background: rgba(255,77,77,0.08);
          border: 1px solid rgba(255,77,77,0.2);
          border-radius: 2px;
        }

        button[type="submit"] {
          background: #63fc8a;
          color: #0a0a0f;
          border: none;
          border-radius: 2px;
          padding: 14px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 4px;
          text-transform: uppercase;
        }

        button[type="submit"]:hover:not(:disabled) {
          background: #fff;
          transform: translateY(-1px);
        }

        button[type="submit"]:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Success screen */
        .success-screen {
          text-align: center;
          animation: fadeIn 0.5s ease forwards;
        }

        .check-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(99,252,138,0.1);
          border: 2px solid #63fc8a;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .check-icon {
          font-size: 32px;
        }

        .success-title {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
        }

        .success-tag {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #63fc8a;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }

        .test-box {
          background: rgba(99,252,138,0.05);
          border: 1px solid rgba(99,252,138,0.2);
          border-radius: 2px;
          padding: 16px;
          text-align: left;
          margin-bottom: 20px;
        }

        .test-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          padding: 4px 0;
        }

        .test-row .pass {
          color: #63fc8a;
          font-weight: 700;
        }

        .user-pill {
          display: inline-block;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          padding: 6px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
        }

        .user-pill span { color: #fff; }

        .footer {
          margin-top: 32px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          text-align: center;
          letter-spacing: 0.1em;
        }
      `}</style>

      <div className="grid-bg" />
      <div className="glow" />

      <div className="container">
        <div className="card">
          {!success ? (
            <>
              <div className="header">
                <div className="tag">Workshop DevOps 2026.1</div>
                <h1>Access<br />Terminal</h1>

                <div className="status-bar">
                  <div className={`dot ${checking ? 'checking' : connected ? 'connected' : 'disconnected'}`} />
                  <span className="status-text">
                    Backend:{' '}
                    <span>
                      {checking ? 'checking...' : connected ? 'connected' : 'offline'}
                    </span>
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="error">⚠ {error}</div>}
                <button type="submit" disabled={loading || !connected}>
                  {loading ? 'Authenticating...' : 'Login'}
                </button>
              </form>
            </>
          ) : (
            <div className="success-screen">
              <div className="check-wrapper">
                <span className="check-icon">✓</span>
              </div>
              <div className="success-title">Test Completed</div>
              <div className="success-tag">ALL CHECKS PASSED</div>

              <div className="test-box">
                <div className="test-row"><span className="pass">PASS</span> Django backend reachable</div>
                <div className="test-row"><span className="pass">PASS</span> Next.js frontend running</div>
              </div>

              <div className="user-pill">logged as <span>{loggedUser?.email}</span></div>
            </div>
          )}
        </div>

        <div className="footer">FABRICA DEVOPS 2026.1</div>
      </div>
    </>
  )
}
