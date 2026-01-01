"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error("Error caught by boundary:", error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Portfolio Error Details:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="text-center space-y-4 max-w-md">
              <h1 className="text-2xl font-bold text-red-400">Component Error</h1>
              <p className="text-gray-400">{this.state.error?.message || "An unexpected error occurred"}</p>
              <details className="text-left text-sm text-gray-500 bg-gray-800 p-4 rounded">
                <summary className="cursor-pointer mb-2">Error Details</summary>
                <pre className="whitespace-pre-wrap break-words">
                  {this.state.error?.stack || "No stack trace available"}
                </pre>
              </details>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined })
                  if (typeof window !== "undefined") {
                    window.location.reload()
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
