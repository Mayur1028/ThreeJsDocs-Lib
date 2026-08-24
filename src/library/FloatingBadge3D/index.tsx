import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

export interface FloatingBadge3DProps {
  label?: string;
  badgeColor?: string;
  accentColor?: string;
  roughness?: number;
  metalness?: number;
}

export const FloatingBadge3D: React.FC<FloatingBadge3DProps> = ({
  label = 'R3F MASTER',
  badgeColor = '#3b82f6',
  accentColor = '#f59e0b',
  roughness = 0.2,
  metalness = 0.85,
}) => {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate badge
      meshRef.current.rotation.y += delta * (hovered ? 2.5 : 0.8);
      // Scale spring
      const targetScale = hovered ? 1.15 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={0.8}>
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Outer Hexagon/Cylinder Shield */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.25, 6]} />
          <meshStandardMaterial
            color={badgeColor}
            roughness={roughness}
            metalness={metalness}
          />
        </mesh>

        {/* Golden Chamfer Rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.05]}>
          <torusGeometry args={[1.35, 0.06, 16, 6]} />
          <meshStandardMaterial
            color={accentColor}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>

        {/* Center Star / Emblem */}
        <mesh position={[0, 0.2, 0.16]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color={accentColor}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Embossed Text */}
        <Text
          position={[0, -0.45, 0.18]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};
