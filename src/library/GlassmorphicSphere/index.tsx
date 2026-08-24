import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export interface GlassmorphicSphereProps {
  glassColor?: string;
  coreColor?: string;
  roughness?: number;
  transmission?: number;
  thickness?: number;
  ior?: number;
  chromaticAberration?: number;
  rotationSpeed?: number;
}

export const GlassmorphicSphere: React.FC<GlassmorphicSphereProps> = ({
  glassColor = '#ffffff',
  coreColor = '#f43f5e',
  roughness = 0.05,
  transmission = 0.98,
  thickness = 2.0,
  ior = 1.6,
  rotationSpeed = 1.0,
}) => {
  const outerSphereRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += delta * 1.5 * rotationSpeed;
      innerCoreRef.current.rotation.y += delta * 2.0 * rotationSpeed;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z -= delta * 0.8 * rotationSpeed;
      ringsRef.current.rotation.x += delta * 0.5 * rotationSpeed;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group>
        {/* Outer Optical Glass Bubble */}
        <mesh ref={outerSphereRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshPhysicalMaterial
            color={glassColor}
            roughness={roughness}
            transmission={transmission}
            thickness={thickness}
            ior={ior}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            transparent
          />
        </mesh>

        {/* Inner Glowing Crystal Core */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={coreColor}
            emissive={coreColor}
            emissiveIntensity={2.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Tech Rings */}
        <group ref={ringsRef}>
          <mesh>
            <torusGeometry args={[0.9, 0.02, 16, 64]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.5}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.015, 16, 64]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
};
