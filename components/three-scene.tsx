"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function ThreeScene() {
  const [isMounted, setIsMounted] = useState(false)
  const [ThreeComponent, setThreeComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    setIsMounted(true)

    // Dynamically import Three.js only on client side
    const loadThreeComponent = async () => {
      try {
        const { Canvas } = await import("@react-three/fiber")
        const { Suspense } = await import("react")
        const { OrbitControls, Environment } = await import("@react-three/drei")
        const ProfessionalScene = (await import("@/components/3d/professional-scene")).default

        const ThreeSceneComponent = () => (
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0)
            }}
          >
            <Suspense fallback={null}>
              <ProfessionalScene />
              <Environment preset="night" intensity={0.2} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.2}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 2.2}
              />
            </Suspense>
          </Canvas>
        )

        setThreeComponent(() => ThreeSceneComponent)
      } catch (error) {
        console.error("Failed to load Three.js components:", error)
      }
    }

    loadThreeComponent()
  }, [])

  if (!isMounted || !ThreeComponent) {
    return null
  }

  return (
    <div className="fixed inset-0 z-0">
      <ThreeComponent />
    </div>
  )
}
