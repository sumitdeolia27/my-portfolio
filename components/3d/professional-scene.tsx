"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Sphere, Box, Torus, Octahedron } from "@react-three/drei"
import type * as THREE from "three"

export default function ProfessionalScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <>
      {/* Darker ambient lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} color="#00ff00" />
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#0066ff" />
      <pointLight position={[5, -5, 8]} intensity={0.15} color="#ff0066" />

      <group ref={groupRef}>
        {/* Programming-themed floating elements */}
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Octahedron args={[0.4]} position={[-4, 2, -8]}>
            <meshStandardMaterial color="#00ff00" transparent opacity={0.4} roughness={0.1} metalness={0.9} />
          </Octahedron>
        </Float>

        <Float speed={0.7} rotationIntensity={0.3} floatIntensity={0.8}>
          <Box args={[0.6, 0.6, 0.6]} position={[3, -1, -6]}>
            <meshStandardMaterial color="#0066ff" transparent opacity={0.5} roughness={0.2} metalness={0.8} />
          </Box>
        </Float>

        <Float speed={0.3} rotationIntensity={0.1} floatIntensity={1.2}>
          <Torus args={[0.7, 0.2, 16, 32]} position={[0, 3, -10]}>
            <meshStandardMaterial color="#ff0066" transparent opacity={0.3} roughness={0.3} metalness={0.7} />
          </Torus>
        </Float>

        {/* Data nodes network */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          const radius = 6 + Math.sin(i) * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const y = Math.sin(i * 0.5) * 3

          return (
            <Float key={i} speed={0.2 + i * 0.03} rotationIntensity={0.1} floatIntensity={0.3}>
              <Sphere args={[0.08]} position={[x, y, z - 15]}>
                <meshStandardMaterial
                  color={`hsl(${120 + i * 15}, 70%, 50%)`}
                  transparent
                  opacity={0.6}
                  emissive={`hsl(${120 + i * 15}, 70%, 20%)`}
                />
              </Sphere>
            </Float>
          )
        })}

        {/* Central processing unit representation */}
        <Float speed={0.1} rotationIntensity={0.05} floatIntensity={0.2}>
          <group position={[0, 0, -12]}>
            <Box args={[1.5, 0.2, 1.5]}>
              <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
            </Box>
            {/* CPU pins */}
            {Array.from({ length: 8 }).map((_, i) => (
              <Box key={i} args={[0.05, 0.3, 0.05]} position={[-0.6 + i * 0.2, -0.25, 0.8]}>
                <meshStandardMaterial color="#gold" metalness={1} roughness={0} />
              </Box>
            ))}
          </group>
        </Float>
      </group>

      {/* Darker fog for more depth */}
      <fog attach="fog" args={["#000000", 8, 40]} />
    </>
  )
}
