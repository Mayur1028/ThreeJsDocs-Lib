import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ParticleVortexProps {
  count?: number;
  radius?: number;
  height?: number;
  speed?: number;
  coreColor?: string;
  outerColor?: string;
  pointSize?: number;
}

export const ParticleVortex: React.FC<ParticleVortexProps> = ({
  count = 3500,
  radius = 3.5,
  height = 5,
  speed = 1.2,
  coreColor = '#06b6d4',
  outerColor = '#ec4899',
  pointSize = 0.035,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color(coreColor);
    const c2 = new THREE.Color(outerColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Exponential distribution along radius (denser near center)
      const r = Math.pow(Math.random(), 1.8) * radius;
      const angle = Math.random() * Math.PI * 2;
      const spiral = r * 1.5;

      pos[i3] = Math.cos(angle + spiral) * r;
      pos[i3 + 1] = (Math.random() - 0.5) * height * (1 - r / (radius * 1.5));
      pos[i3 + 2] = Math.sin(angle + spiral) * r;

      // Interpolate color from core to outer
      const mixedColor = c1.clone().lerp(c2, r / radius);
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count, radius, height, coreColor, outerColor]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += speed * delta * 0.4;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={pointSize}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
