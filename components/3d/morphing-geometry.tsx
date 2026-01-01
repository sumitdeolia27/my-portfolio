"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry1 = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])
  const geometry2 = useMemo(() => new THREE.BoxGeometry(2, 2, 2), [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.3

      // Morphing effect
      const morphFactor = (Math.sin(time) + 1) / 2
      meshRef.current.scale.setScalar(0.8 + morphFactor * 0.4)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -15]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ec4899" transparent opacity={0.7} wireframe />
    </mesh>
  )
}
