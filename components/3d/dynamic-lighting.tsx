"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function DynamicLighting() {
  const lightRef = useRef<THREE.PointLight>(null)
  const light2Ref = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime) * 10
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime) * 10
      lightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.7) * 8
      light2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 6
      light2Ref.current.intensity = 0.3 + Math.cos(state.clock.elapsedTime * 1.5) * 0.2
    }
  })

  return (
    <>
      <pointLight ref={lightRef} position={[5, 5, 5]} intensity={0.8} color="#3b82f6" distance={20} />
      <pointLight ref={light2Ref} position={[-5, -5, -5]} intensity={0.5} color="#10b981" distance={15} />
      <rectAreaLight position={[0, 10, -10]} width={20} height={10} intensity={0.3} color="#8b5cf6" />
    </>
  )
}
