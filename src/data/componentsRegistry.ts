import { CustomComponentMeta } from '../types';

export const customComponentsRegistry: CustomComponentMeta[] = [
  {
    id: 'holographic-card',
    title: 'Holographic 3D Tilt Card',
    tagline: 'Interactive mouse-parallax 3D glass card with iridescent crystal core & glowing border.',
    category: 'UI & 3D Cards',
    author: 'R3F Master',
    dateAdded: '2026-08-24',
    difficulty: 'Intermediate',
    tags: ['Interactive', 'Parallax', 'PhysicalMaterial', 'Glassmorphism', 'Drei Text'],
    description: 'An interactive 3D card designed for web portfolios, NFT showcases, and SaaS feature cards. It smoothly tilts toward the user cursor with physics-interpolated damping and features layered 3D typography and a floating glowing crystal.',
    features: [
      'Real-time mouse pointer parallax tilt via `state.pointer` lerping',
      'PBR `MeshPhysicalMaterial` clearcoat lacquer & high reflectivity',
      'Embedded 3D Drei `<Text />` rendered with SDF font quality',
      'Dynamic glow halo and rotating crystal core'
    ],
    propsDoc: [
      { name: 'title', type: 'string', defaultValue: "'REACT THREE FIBER'", description: 'Primary embossed 3D header text.' },
      { name: 'subtitle', type: 'string', defaultValue: "'NEXT-GEN 3D WEB'", description: 'Secondary sub-caption.' },
      { name: 'color', type: 'string (hex)', defaultValue: "'#1e1b4b'", description: 'Base card chassis color.' },
      { name: 'glowColor', type: 'string (hex)', defaultValue: "'#818cf8'", description: 'Neon border & emissive core tint.' },
      { name: 'roughness', type: 'number (0..1)', defaultValue: '0.2', description: 'Surface glossiness.' },
      { name: 'metalness', type: 'number (0..1)', defaultValue: '0.8', description: 'Metallic finish intensity.' },
      { name: 'floating', type: 'boolean', defaultValue: 'true', description: 'Wraps card in smooth Drei Float physics.' }
    ],
    controls: [
      { name: 'title', label: 'Card Title', type: 'select', options: ['REACT THREE FIBER', 'SOLARIS PIXEL', 'CYBER BLADE', 'QUANTUM GPU'], defaultValue: 'REACT THREE FIBER', description: 'Title text' },
      { name: 'color', label: 'Chassis Color', type: 'color', defaultValue: '#1e1b4b', description: 'Body color' },
      { name: 'glowColor', label: 'Glow Hue', type: 'color', defaultValue: '#818cf8', description: 'Neon trim color' },
      { name: 'roughness', label: 'Roughness', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.2, description: 'Micro-surface roughness' },
      { name: 'metalness', label: 'Metalness', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.8, description: 'Metalness reflection' },
      { name: 'floating', label: 'Float Physics', type: 'boolean', defaultValue: true, description: 'Continuous gentle floating' }
    ],
    componentCode: `import React, { useRef } from 'react';
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

      <mesh position={[0, 0, 0.08]}>
        <ringGeometry args={[1.7, 1.76, 4]} />
        <meshBasicMaterial color={glowColor} wireframe />
      </mesh>

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

      <Text
        position={[0, -0.9, 0.12]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        {title}
      </Text>
    </group>
  );

  return floating ? <Float speed={2}>{content}</Float> : content;
};`,
    usageCode: `import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { HolographicCard } from './components/HolographicCard';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#090d16' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <Environment preset="city" />
        <HolographicCard title="REACT THREE FIBER" glowColor="#818cf8" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}`
  },
  {
    id: 'particle-vortex',
    title: 'Cyberpunk Particle Vortex',
    tagline: 'GPU accelerated swirling particle spiral with custom radial density & additive glow.',
    category: 'Particles',
    author: 'R3F Master',
    dateAdded: '2026-08-24',
    difficulty: 'Advanced',
    tags: ['GPU Particles', 'BufferGeometry', 'Additive Blending', 'Math Curves'],
    description: 'A high-performance particle system rendering thousands of points in a single draw call using Float32Array buffer attributes and custom spiral distribution math.',
    features: [
      '3,500+ particles with smooth 60-120 FPS performance',
      'Additive blending (`THREE.AdditiveBlending`) for radiant luminescence',
      'Dual-color gradient interpolation based on radial distance',
      'Zero garbage collection pressure via `useMemo` position buffers'
    ],
    propsDoc: [
      { name: 'count', type: 'number', defaultValue: '3500', description: 'Total number of particle points.' },
      { name: 'radius', type: 'number', defaultValue: '3.5', description: 'Max outer boundary radius.' },
      { name: 'speed', type: 'number', defaultValue: '1.2', description: 'Vortex rotation speed.' },
      { name: 'coreColor', type: 'string (hex)', defaultValue: "'#06b6d4'", description: 'Color of inner dense particles.' },
      { name: 'outerColor', type: 'string (hex)', defaultValue: "'#ec4899'", description: 'Color of outer edge particles.' }
    ],
    controls: [
      { name: 'speed', label: 'Rotation Speed', type: 'number', min: 0.2, max: 4.0, step: 0.2, defaultValue: 1.2, description: 'Swirl rotation velocity' },
      { name: 'radius', label: 'Vortex Radius', type: 'number', min: 2.0, max: 6.0, step: 0.5, defaultValue: 3.5, description: 'Outer spread radius' },
      { name: 'coreColor', label: 'Core Color', type: 'color', defaultValue: '#06b6d4', description: 'Center particle hue' },
      { name: 'outerColor', label: 'Outer Color', type: 'color', defaultValue: '#ec4899', description: 'Edge particle hue' },
      { name: 'pointSize', label: 'Particle Size', type: 'number', min: 0.01, max: 0.08, step: 0.005, defaultValue: 0.035, description: 'Individual point size' }
    ],
    componentCode: `// See src/library/ParticleVortex/index.tsx`,
    usageCode: `<Canvas camera={{ position: [0, 2, 7] }}>
  <ParticleVortex
    count={4000}
    speed={1.5}
    coreColor="#06b6d4"
    outerColor="#ec4899"
  />
  <OrbitControls autoRotate />
</Canvas>`
  },
  {
    id: 'glassmorphic-sphere',
    title: 'Glassmorphic Refraction Orb',
    tagline: 'Physical optical glass bubble with refraction, internal crystal core & rotating tech rings.',
    category: 'Shaders & Effects',
    author: 'R3F Master',
    dateAdded: '2026-08-24',
    difficulty: 'Intermediate',
    tags: ['MeshPhysicalMaterial', 'Transmission', 'Refraction', 'IOR', 'Futuristic'],
    description: 'Simulates pure optical glass with Index of Refraction (IOR 1.6), clearcoat topcoat, and internal glowing core that distorts realistically through the outer bubble.',
    features: [
      'Full physical transmission & refractive thickness',
      'Rotating inner geometric emissive crystal',
      'Dual-axis orbiting gyroscope rings'
    ],
    propsDoc: [
      { name: 'glassColor', type: 'string', defaultValue: "'#ffffff'", description: 'Glass tint color.' },
      { name: 'coreColor', type: 'string', defaultValue: "'#f43f5e'", description: 'Emissive inner crystal color.' },
      { name: 'roughness', type: 'number', defaultValue: '0.05', description: 'Glass surface roughness.' },
      { name: 'transmission', type: 'number', defaultValue: '0.98', description: 'Glass transparency fraction.' },
      { name: 'ior', type: 'number', defaultValue: '1.6', description: 'Refraction index.' }
    ],
    controls: [
      { name: 'coreColor', label: 'Core Emissive Color', type: 'color', defaultValue: '#f43f5e', description: 'Inner crystal hue' },
      { name: 'transmission', label: 'Transmission (Glass)', type: 'number', min: 0.5, max: 1.0, step: 0.02, defaultValue: 0.98, description: 'Optical transparency' },
      { name: 'roughness', label: 'Surface Roughness', type: 'number', min: 0.0, max: 0.5, step: 0.02, defaultValue: 0.05, description: 'Frosted vs clear' },
      { name: 'ior', label: 'Refraction (IOR)', type: 'number', min: 1.0, max: 2.2, step: 0.05, defaultValue: 1.6, description: 'Light bending power' }
    ],
    componentCode: `// See src/library/GlassmorphicSphere/index.tsx`,
    usageCode: `<Canvas camera={{ position: [0, 0, 5] }}>
  <Environment preset="studio" />
  <GlassmorphicSphere coreColor="#f43f5e" ior={1.6} />
  <OrbitControls />
</Canvas>`
  },
  {
    id: 'procedural-terrain',
    title: 'Procedural Wave Grid Terrain',
    tagline: 'Multi-octave sine wave displaced wireframe synthwave neon landscape.',
    category: 'Procedural & Math',
    author: 'R3F Master',
    dateAdded: '2026-08-24',
    difficulty: 'Advanced',
    tags: ['Procedural', 'Math Waves', 'Wireframe', 'Synthwave', 'BufferUpdate'],
    description: 'A dynamic 3D terrain mesh whose vertex heights $(Z)$ are calculated in real time using multi-frequency harmonic wave equations, featuring a dual-layer dark base and cyber neon wireframe.',
    features: [
      'Live CPU/GPU vertex displacement loop inside `useFrame`',
      'Automatic normal re-computation for lighting shading',
      'Synthwave / Cyberpunk aesthetic with customizable wave speeds and heights'
    ],
    propsDoc: [
      { name: 'color', type: 'string', defaultValue: "'#090d16'", description: 'Solid terrain floor color.' },
      { name: 'wireframeColor', type: 'string', defaultValue: "'#06b6d4'", description: 'Neon grid wireframe hue.' },
      { name: 'waveSpeed', type: 'number', defaultValue: '1.0', description: 'Oscillation speed.' },
      { name: 'waveHeight', type: 'number', defaultValue: '0.6', description: 'Peak wave displacement height.' }
    ],
    controls: [
      { name: 'wireframeColor', label: 'Grid Wireframe Color', type: 'color', defaultValue: '#06b6d4', description: 'Neon grid color' },
      { name: 'waveSpeed', label: 'Wave Frequency/Speed', type: 'number', min: 0.2, max: 3.0, step: 0.2, defaultValue: 1.0, description: 'Speed of terrain waves' },
      { name: 'waveHeight', label: 'Wave Peak Height', type: 'number', min: 0.1, max: 1.5, step: 0.1, defaultValue: 0.6, description: 'Height of mountain peaks' }
    ],
    componentCode: `// See src/library/ProceduralTerrain/index.tsx`,
    usageCode: `<Canvas camera={{ position: [0, 4, 6] }}>
  <ProceduralTerrain wireframeColor="#06b6d4" waveSpeed={1.2} />
  <OrbitControls />
</Canvas>`
  },
  {
    id: 'floating-badge-3d',
    title: 'Tactile 3D Metallic Badge',
    tagline: 'Hexagonal emblem badge with interactive spring hover scaling and metallic sheen.',
    category: 'UI & 3D Cards',
    author: 'R3F Master',
    dateAdded: '2026-08-24',
    difficulty: 'Beginner',
    tags: ['UI', 'Tactile', 'Hover Effects', 'Metals', '3D Badge'],
    description: 'A tactile 3D achievement or hero badge with spring hover expansion, chamfered rim, golden star emblem, and embossed 3D text.',
    features: [
      'Interactive `onPointerOver` and `onPointerOut` events with smooth lerping',
      'Dual metallic materials (Navy Chrome and Polished Gold)',
      'Drei `<Float />` organic drift physics'
    ],
    propsDoc: [
      { name: 'label', type: 'string', defaultValue: "'R3F MASTER'", description: 'Embossed bottom badge label.' },
      { name: 'badgeColor', type: 'string', defaultValue: "'#3b82f6'", description: 'Main shield body color.' },
      { name: 'accentColor', type: 'string', defaultValue: "'#f59e0b'", description: 'Rim and emblem color.' }
    ],
    controls: [
      { name: 'label', label: 'Badge Text', type: 'select', options: ['R3F MASTER', 'LEVEL 99', 'SHADERS PRO', 'THREE JS'], defaultValue: 'R3F MASTER', description: 'Embossed text' },
      { name: 'badgeColor', label: 'Shield Color', type: 'color', defaultValue: '#3b82f6', description: 'Body color' },
      { name: 'accentColor', label: 'Rim Accent Color', type: 'color', defaultValue: '#f59e0b', description: 'Gold trim color' }
    ],
    componentCode: `// See src/library/FloatingBadge3D/index.tsx`,
    usageCode: `<Canvas camera={{ position: [0, 0, 4.5] }}>
  <ambientLight intensity={0.5} />
  <directionalLight position={[5, 5, 5]} intensity={2} />
  <FloatingBadge3D label="R3F MASTER" />
  <OrbitControls />
</Canvas>`
  },
  {
    id: 'cyberpunk-portal',
    title: 'Cyberpunk Energy Portal',
    tagline: 'Concentric counter-rotating neon tech rings with dark center void.',
    category: 'Shaders & Effects',
    author: 'R3F Master',
    dateAdded: '2026-08-24',
    difficulty: 'Intermediate',
    tags: ['Sci-Fi', 'Portal', 'Neon', 'Emissive', 'Animation'],
    description: 'A multi-ring rotating warp gate with segmented energy nodes, pulsing core scale, and dual-direction orbital momentum.',
    features: [
      '3 distinct ring tiers rotating at harmonic fractional speeds',
      'Pulsing central gravitational void',
      'Emissive neon energy node battery nodes arrayed around the circumference'
    ],
    propsDoc: [
      { name: 'ringColor', type: 'string', defaultValue: "'#ec4899'", description: 'Primary neon ring tint.' },
      { name: 'glowColor', type: 'string', defaultValue: "'#8b5cf6'", description: 'Secondary wireframe ring tint.' },
      { name: 'speed', type: 'number', defaultValue: '1.0', description: 'Rotation velocity factor.' }
    ],
    controls: [
      { name: 'ringColor', label: 'Primary Neon Color', type: 'color', defaultValue: '#ec4899', description: 'Inner ring color' },
      { name: 'glowColor', label: 'Secondary Ring Color', type: 'color', defaultValue: '#8b5cf6', description: 'Middle ring color' },
      { name: 'speed', label: 'Rotation Speed', type: 'number', min: 0.2, max: 3.0, step: 0.2, defaultValue: 1.0, description: 'Gate rotation speed' }
    ],
    componentCode: `// See src/library/CyberpunkPortal/index.tsx`,
    usageCode: `<Canvas camera={{ position: [0, 0, 5] }}>
  <CyberpunkPortal ringColor="#ec4899" glowColor="#8b5cf6" speed={1.2} />
  <OrbitControls />
</Canvas>`
  }
];
