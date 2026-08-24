import React, { useState } from 'react';
import { Cpu, Layers, Sparkles, CheckCircle2, Code2, Copy, Check, Terminal, Zap } from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';

export const ArchitecturePage: React.FC = () => {
  const [componentName, setComponentName] = useState('MyCustom3DWidget');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const generatedTemplateCode = `import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export interface ${componentName}Props {
  color?: string;
  speed?: number;
  scale?: number;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  color = '#6366f1',
  speed = 1.0,
  scale = 1.0,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // 60/120 FPS Render Loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed * 1.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <mesh ref={meshRef} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
};`;

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(generatedTemplateCode);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', padding: '16px 8px 64px 8px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(52, 211, 153, 0.15)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          width: 'fit-content',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#34d399',
        }}>
          <Cpu size={14} />
          <span>R3F ARCHITECTURE & RENDERING PIPELINE</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          How Canvas Code Renders Live on a Webpage
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '850px', lineHeight: 1.6 }}>
          Understanding the end-to-end bridge between JSX, the React reconciler, Three.js scenegraph objects, and GPU rasterization.
        </p>
      </div>

      {/* Step by Step Pipeline Visualization */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
          1. The 4-Layer Rendering Pipeline
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            {
              step: '01',
              title: 'React JSX Layer',
              color: '#38bdf8',
              desc: 'You declare declarative tags like <mesh>, <sphereGeometry>, and <meshPhysicalMaterial /> inside normal React components.'
            },
            {
              step: '02',
              title: 'R3F Custom Reconciler',
              color: '#818cf8',
              desc: 'R3F intercepts JSX nodes and instantiates native Three.js classes (new THREE.Mesh()) without creating heavy wrapper layers.'
            },
            {
              step: '03',
              title: 'Three.js Scenegraph',
              color: '#c084fc',
              desc: 'Maintains 3D coordinate trees, matrix transforms, lights, shadows, cameras, and material shader compilations.'
            },
            {
              step: '04',
              title: 'GPU WebGL Rasterizer',
              color: '#34d399',
              desc: 'WebGL2 executes vertex and fragment GLSL shaders to draw triangles directly onto the HTML5 <canvas> at 60-120 FPS.'
            }
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: `1px solid ${card.color}40`,
                padding: '20px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: card.color, fontFamily: "'Fira Code', monospace" }}>
                STAGE {card.step}
              </span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Anatomy of Writing a Canvas Component */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
          2. Complete Anatomy of an R3F Page & Component
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Here is how your web page code is organized so that your 3D component renders with lighting, controls, and responsive sizing:
        </p>

        <CodeBlock
          code={`// 1. The 3D Component File (e.g. FloatingCrystal.tsx)
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingCrystal({ color = '#8b5cf6' }) {
  const ref = useRef<THREE.Mesh>(null!);

  // The 60 FPS Render loop (delta = elapsed seconds between frames)
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 1.2;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.15} metalness={0.85} />
    </mesh>
  );
}

// 2. The Web Page File (e.g. App.tsx)
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { FloatingCrystal } from './FloatingCrystal';

export default function WebPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#090d16' }}>
      <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
        {/* Lights & HDRI */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
        <Environment preset="city" />

        {/* Your Custom 3D Component */}
        <FloatingCrystal color="#06b6d4" />

        {/* Shadows & Camera Controls */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.6} blur={2} />
        <OrbitControls enableDamping autoRotate />
      </Canvas>
    </div>
  );
}`}
          language="tsx"
          title="Standard Production R3F Setup"
        />
      </div>

      {/* Component Template Generator */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={22} color="#f43f5e" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
            3. Add Your Own Component to the Library
          </h2>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
          Type your desired component name below to generate a boilerplate template ready to drop into <code>src/library/</code>:
        </p>

        {/* Input Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '400px' }}>
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>Component Name:</span>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
            style={{
              flex: 1,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              color: '#f8fafc',
              padding: '8px 12px',
              borderRadius: '8px',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Code Generator */}
        <CodeBlock
          code={generatedTemplateCode}
          language="tsx"
          title={`src/library/${componentName}/index.tsx`}
        />
      </div>
    </div>
  );
};
