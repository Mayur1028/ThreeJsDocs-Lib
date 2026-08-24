import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ProceduralTerrainProps {
  color?: string;
  wireframeColor?: string;
  waveSpeed?: number;
  waveHeight?: number;
  gridSize?: number;
}

export const ProceduralTerrain: React.FC<ProceduralTerrainProps> = ({
  color = '#090d16',
  wireframeColor = '#06b6d4',
  waveSpeed = 1.0,
  waveHeight = 0.6,
  gridSize = 32,
}) => {
  const planeRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  // Generate base grid geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(10, 10, gridSize, gridSize);
  }, [gridSize]);

  // Keep copy of initial position vertices
  const initialPositions = useMemo(() => {
    return geometry.attributes.position.array.slice() as Float32Array;
  }, [geometry]);

  useFrame((state) => {
    if (!planeRef.current || !geometry) return;

    const time = state.clock.getElapsedTime() * waveSpeed;
    const positions = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = initialPositions[i];
      const y = initialPositions[i + 1];

      // Multi-frequency wave formula
      const wave1 = Math.sin(x * 1.5 + time) * Math.cos(y * 1.5 + time);
      const wave2 = Math.sin(x * 3.0 - time * 0.8) * 0.3;
      const z = (wave1 + wave2) * waveHeight;

      positions[i + 2] = z;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -0.5, 0]}>
      {/* Solid Dark Base */}
      <mesh ref={planeRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Glowing Neon Cyber Grid Wireframe */}
      <mesh ref={wireframeRef} geometry={geometry} position={[0, 0, 0.01]}>
        <meshBasicMaterial
          color={wireframeColor}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};
