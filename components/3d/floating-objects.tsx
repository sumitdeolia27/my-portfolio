"use client"

import type React from "react"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface FloatingObjectsProps {
  children: React.ReactNode
}

const FloatingObjects: React.FC<FloatingObjectsProps> = ({ children }) => {
  const groupRef = useRef<THREE.Group>(null)

  // Add pulsing animation to tech symbols
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1

      // Animate individual elements
      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group || child instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime
          child.position.y += Math.sin(time * (1 + index * 0.1)) * 0.002
          child.rotation.x += 0.005 * (index % 2 === 0 ? 1 : -1)
          child.rotation.z += 0.003 * (index % 3 === 0 ? 1 : -1)
        }
      })
    }
  })

  return <group ref={groupRef}>{children}</group>
}

export default FloatingObjects
