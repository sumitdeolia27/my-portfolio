"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface SectionBackgroundProps {
  section: string
  visible: boolean
}

export default function SectionBackground({ section, visible }: SectionBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.visible = visible
      if (visible) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      }
    }
  })

  const getSectionElements = () => {
    switch (section) {
      case "about":
        return (
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[0, 0, -20]}>
              <torusKnotGeometry args={[2, 0.5, 100, 16]} />
              <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
            </mesh>
          </Float>
        )
      case "skills":
        return (
          <group>
            {Array.from({ length: 8 }).map((_, i) => (
              <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[Math.cos(i * 0.785) * 8, Math.sin(i * 0.785) * 4, -25]}>
                  <octahedronGeometry args={[0.5]} />
                  <meshStandardMaterial color={`hsl(${i * 45}, 70%, 60%)`} />
                </mesh>
              </Float>
            ))}
          </group>
        )
      case "projects":
        return (
          <Float speed={2} rotationIntensity={2} floatIntensity={1}>
            <group position={[0, 0, -30]}>
              <mesh>
                <dodecahedronGeometry args={[3]} />
                <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.2} />
              </mesh>
            </group>
          </Float>
        )
      default:
        return null
    }
  }

  return <group ref={groupRef}>{getSectionElements()}</group>
}
