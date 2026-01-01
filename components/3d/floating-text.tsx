"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float } from "@react-three/drei"
import type * as THREE from "three"

export default function FloatingText() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} position={[-8, 5, -12]} rotation={[0, 0.3, 0]}>
          AI
          <meshStandardMaterial color="#3b82f6" />
        </Text3D>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.4} height={0.08} position={[6, -4, -10]} rotation={[0, -0.5, 0]}>
          ML
          <meshStandardMaterial color="#10b981" />
        </Text3D>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.3} height={0.06} position={[-5, -5, -8]} rotation={[0, 0.8, 0]}>
          Python
          <meshStandardMaterial color="#f59e0b" />
        </Text3D>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.5}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.35} height={0.07} position={[4, 6, -15]} rotation={[0, -0.2, 0]}>
          Data
          <meshStandardMaterial color="#8b5cf6" />
        </Text3D>
      </Float>
    </group>
  )
}
