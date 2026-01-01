"use client"

import dynamic from "next/dynamic"

const PortfolioClient = dynamic(() => import("@/components/portfolio-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <h2 className="text-xl font-semibold">Loading Portfolio</h2>
        <p className="text-gray-400">Preparing your experience...</p>
      </div>
    </div>
  ),
})

export default function PortfolioLoader() {
  return <PortfolioClient />
}
