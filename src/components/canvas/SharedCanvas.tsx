import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Html } from '@react-three/drei';
import { RotateCcw, Eye, Sun, Maximize2, Minimize2 } from 'lucide-react';

interface SharedCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  showEnvironment?: boolean;
  environmentPreset?: 'city' | 'studio' | 'sunset' | 'dawn' | 'night';
  showShadows?: boolean;
  showFloor?: boolean;
  autoRotate?: boolean;
  height?: string;
  enableZoom?: boolean;
}

const LoadingSpinner: React.FC = () => {
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '16px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        color: '#f8fafc',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          border: '3px solid rgba(99, 102, 241, 0.3)',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a5b4fc' }}>
          Loading 3D Scene...
        </span>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
};

export const SharedCanvas: React.FC<SharedCanvasProps> = ({
  children,
  cameraPosition = [0, 1.5, 4.5],
  fov = 50,
  showEnvironment = true,
  environmentPreset = 'city',
  showShadows = true,
  showFloor = true,
  autoRotate = false,
  height = '460px',
  enableZoom = true,
}) => {
  const [activeEnv, setActiveEnv] = useState<any>(environmentPreset);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);

  const envOptions = ['city', 'studio', 'sunset', 'dawn', 'night'];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: isFullscreen ? '100vh' : height,
        position: 'relative',
        borderRadius: isFullscreen ? '0px' : '16px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, #111827 0%, #030712 100%)',
        border: isFullscreen ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Top Toolbar Overlay */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        padding: '6px 10px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        {/* Environment Picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sun size={13} color="#f59e0b" />
          <select
            value={activeEnv}
            onChange={(e) => setActiveEnv(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#cbd5e1',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {envOptions.map((env) => (
              <option key={env} value={env} style={{ background: '#0f172a' }}>
                HDRI: {env}
              </option>
            ))}
          </select>
        </div>

        <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle Auto Rotation"
          style={{
            background: isRotating ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
            border: 'none',
            color: isRotating ? '#818cf8' : '#94a3b8',
            padding: '4px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RotateCcw size={13} />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            padding: '4px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>
      </div>

      {/* Subtle Bottom Instruction */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        padding: '4px 10px',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.72rem',
        color: '#94a3b8',
        pointerEvents: 'none',
      }}>
        <Eye size={12} color="#6366f1" />
        <span>Drag to orbit • Scroll to zoom</span>
      </div>

      {/* R3F WebGL Canvas */}
      <Canvas
        camera={{ position: cameraPosition, fov }}
        shadows={showShadows}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Default Lighting Rig */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.8}
            castShadow={showShadows}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-5, 4, -4]} intensity={0.5} color="#818cf8" />

          {/* HDRI Environment */}
          {showEnvironment && <Environment preset={activeEnv} />}

          {/* Children Mesh Scene */}
          {children}

          {/* Ground Soft Contact Shadow */}
          {showFloor && (
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.65}
              scale={12}
              blur={2.5}
              far={4}
              color="#000000"
            />
          )}

          {/* Orbit Controls */}
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            autoRotate={isRotating}
            autoRotateSpeed={1.5}
            enableZoom={enableZoom}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
