import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export interface CyberpunkPortalProps {
  ringColor?: string;
  glowColor?: string;
  speed?: number;
  ringsCount?: number;
}

export const CyberpunkPortal: React.FC<CyberpunkPortalProps> = ({
  ringColor = '#ec4899',
  glowColor = '#8b5cf6',
  speed = 1.0,
}) => {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const portalCoreRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.8 * speed;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 1.2 * speed;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 1.6 * speed;
    if (portalCoreRef.current) {
      portalCoreRef.current.rotation.z += delta * 0.3 * speed;
      const s = 1 + Math.sin(t * 3) * 0.05;
      portalCoreRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Deep Void Center Disk */}
        <mesh ref={portalCoreRef}>
          <circleGeometry args={[1.2, 64]} />
          <meshBasicMaterial color="#030712" />
        </mesh>

        {/* Inner Neon Ring */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.25, 0.04, 16, 64]} />
          <meshStandardMaterial
            color={ringColor}
            emissive={ringColor}
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>

        {/* Middle Segmented Tech Ring */}
        <mesh ref={ring2Ref}>
          <ringGeometry args={[1.4, 1.55, 8]} />
          <meshBasicMaterial
            color={glowColor}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Outer Heavy Chassis Ring */}
        <mesh ref={ring3Ref}>
          <torusGeometry args={[1.7, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Energy Pillars */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[Math.cos(rad) * 1.7, Math.sin(rad) * 1.7, 0.05]}
              rotation={[0, 0, rad]}
            >
              <boxGeometry args={[0.2, 0.1, 0.15]} />
              <meshStandardMaterial
                color={ringColor}
                emissive={ringColor}
                emissiveIntensity={3}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};
