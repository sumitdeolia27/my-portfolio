"use client"

import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export default function InteractiveOrbs() {
  const { mouse, viewport } = useThree()
  const orbsRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const orbs = [
    { position: [3, 2, -3], color: "#3b82f6", size: 0.8 },
    { position: [-4, -1, -5], color: "#10b981", size: 1.0 },
    { position: [2, -3, -4], color: "#f59e0b", size: 0.6 },
    { position: [-2, 3, -6], color: "#ef4444", size: 0.9 },
    { position: [5, 0, -7], color: "#8b5cf6", size: 0.7 },
  ]

  useFrame((state) => {
    if (orbsRef.current) {
      // Mouse interaction
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2

      orbsRef.current.children.forEach((orb, index) => {
        const mesh = orb as THREE.Mesh
        const distance = Math.sqrt(Math.pow(mesh.position.x - x * 0.1, 2) + Math.pow(mesh.position.y - y * 0.1, 2))

        // Attraction to mouse
        mesh.position.x += (x * 0.1 - mesh.position.x) * 0.02
        mesh.position.y += (y * 0.1 - mesh.position.y) * 0.02

        // Floating animation
        mesh.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.005

        // Scale based on hover
        const targetScale = hovered === index ? 1.5 : 1
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      })
    }
  })

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, index) => (
        <mesh
          key={index}
          position={orb.position as [number, number, number]}
          onPointerEnter={() => setHovered(index)}
          onPointerLeave={() => setHovered(null)}
        >
          <sphereGeometry args={[orb.size, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={hovered === index ? 0.5 : 0.2}
            transparent
            opacity={0.8}
          />
          {/* Glow effect */}
          <mesh scale={1.2}>
            <sphereGeometry args={[orb.size, 32, 32]} />
            <meshBasicMaterial color={orb.color} transparent opacity={0.1} />
          </mesh>
        </mesh>
      ))}
    </group>
  )
}
