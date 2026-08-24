import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

export interface HolographicCardProps {
  title?: string;
  subtitle?: string;
  color?: string;
  glowColor?: string;
  roughness?: number;
  metalness?: number;
  floating?: boolean;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  title = 'REACT THREE FIBER',
  subtitle = 'NEXT-GEN 3D WEB',
  color = '#1e1b4b',
  glowColor = '#818cf8',
  roughness = 0.2,
  metalness = 0.8,
  floating = true,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const glowRingRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      // Interactive pointer parallax tilt
      const targetRotX = (state.pointer.y * Math.PI) / 10;
      const targetRotY = (state.pointer.x * Math.PI) / 8;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    }
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z += 0.01;
    }
  });

  const content = (
    <group ref={groupRef}>
      {/* Outer Card Body */}
      <RoundedBox args={[3.2, 4.4, 0.15]} radius={0.15} smoothness={8}>
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </RoundedBox>

      {/* Glowing Border Trim */}
      <mesh position={[0, 0, 0.08]}>
        <ringGeometry args={[1.7, 1.76, 4]} />
        <meshBasicMaterial color={glowColor} wireframe />
      </mesh>

      {/* Floating Center Hologram Emblem */}
      <group position={[0, 0.5, 0.2]}>
        <mesh ref={glowRingRef}>
          <torusGeometry args={[0.7, 0.04, 16, 64]} />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshPhysicalMaterial
            color="#ec4899"
            roughness={0.1}
            metalness={0.3}
            transmission={0.9}
            thickness={0.8}
            ior={1.7}
          />
        </mesh>
      </group>

      {/* Typography layer */}
      <Text
        position={[0, -0.9, 0.12]}
        fontSize={0.22}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/outfit/v11/Q_F-1CLssUt2PdOnHzu6GbmP.woff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        {title}
      </Text>
      
      <Text
        position={[0, -1.3, 0.12]}
        fontSize={0.13}
        color={glowColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        {subtitle}
      </Text>
    </group>
  );

  if (floating) {
    return (
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        {content}
      </Float>
    );
  }

  return content;
};
