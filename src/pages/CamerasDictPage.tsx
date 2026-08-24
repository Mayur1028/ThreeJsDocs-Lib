import React, { useState } from 'react';
import { Camera, Eye, Sliders, Code2, Layers, CheckCircle2 } from 'lucide-react';
import { camerasData } from '../data/camerasData';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrthographicCamera, OrbitControls, Environment, Grid } from '@react-three/drei';
import { ControlSlider } from '../components/ui/ControlSlider';
import { CodeBlock } from '../components/ui/CodeBlock';

export const CamerasDictPage: React.FC = () => {
  const [selectedCamId, setSelectedCamId] = useState<string>(camerasData[0].id);

  const currentCam = camerasData.find((c) => c.id === selectedCamId) || camerasData[0];

  const [propsState, setPropsState] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    currentCam.controls.forEach((c) => {
      init[c.name] = c.defaultValue;
    });
    return init;
  });

  const handleSelectCamera = (camId: string) => {
    setSelectedCamId(camId);
    const newCam = camerasData.find((c) => c.id === camId);
    if (newCam) {
      const init: Record<string, any> = {};
      newCam.controls.forEach((c) => {
        init[c.name] = c.defaultValue;
      });
      setPropsState(init);
    }
  };

  const handlePropChange = (name: string, val: any) => {
    setPropsState((prev) => ({ ...prev, [name]: val }));
  };

  const generatedCode = currentCam.codeExample(propsState);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px 8px 64px 8px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(6, 182, 212, 0.15)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          width: 'fit-content',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#06b6d4',
        }}>
          <Camera size={14} />
          <span>CAMERAS & PROJECTION DICTIONARY</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          Interactive 3D Cameras & FOV Visualizer
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Compare Perspective (human eye FOV) vs Orthographic (isometric CAD parallel projection), adjust clipping planes, and observe depth foreshortening live.
        </p>
      </div>

      {/* Camera Type Selector Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto' }}>
        {camerasData.map((cam) => {
          const isActive = selectedCamId === cam.id;
          return (
            <button
              key={cam.id}
              onClick={() => handleSelectCamera(cam.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)' : 'rgba(30, 41, 59, 0.6)',
                color: isActive ? '#ffffff' : '#cbd5e1',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px 18px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <Camera size={15} color={isActive ? '#ffffff' : '#06b6d4'} />
              <span>{cam.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Viewport & Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left: Live 3D Perspective/Isometric Test Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            height: '420px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #0f172a 0%, #030712 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
          }}>
            <Canvas style={{ width: '100%', height: '100%' }}>
              {/* Dynamic Camera Switcher */}
              {currentCam.id === 'perspective-camera' && (
                <PerspectiveCamera
                  makeDefault
                  position={[0, 2, 6]}
                  fov={propsState.fov ?? 50}
                  near={propsState.near ?? 0.1}
                  far={propsState.far ?? 100}
                  zoom={propsState.zoom ?? 1.0}
                />
              )}

              {currentCam.id === 'orthographic-camera' && (
                <OrthographicCamera
                  makeDefault
                  position={[5, 5, 5]}
                  zoom={propsState.zoom ?? 90}
                  near={propsState.near ?? -20}
                  far={propsState.far ?? 100}
                />
              )}

              {currentCam.id === 'cube-camera' && (
                <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
              )}

              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 8, 5]} intensity={1.8} />
              <Environment preset="city" />

              {/* Multi-depth array of objects to clearly demonstrate perspective vs parallel lines */}
              <group position={[0, 0, 0]}>
                {/* 3 Alignment Columns at different depths (z = 0, z = -2, z = -4) */}
                {[-3, -1.5, 0, 1.5, 3].map((x, i) => (
                  <mesh key={i} position={[x, 0.6, -i * 1.2]}>
                    <boxGeometry args={[0.6, 1.2, 0.6]} />
                    <meshStandardMaterial
                      color={i % 2 === 0 ? '#06b6d4' : '#ec4899'}
                      roughness={0.2}
                      metalness={0.8}
                    />
                  </mesh>
                ))}

                {/* Ground Perspective Grid lines */}
                <Grid
                  position={[0, 0, 0]}
                  args={[12, 12]}
                  sectionColor="#38bdf8"
                  cellColor="#1e293b"
                  fadeDistance={25}
                  fadeStrength={1.5}
                />
              </group>

              <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
            </Canvas>
          </div>

          {/* Camera Details */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              {currentCam.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {currentCam.description}
            </p>

            <div style={{
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              color: '#cbd5e1',
            }}>
              <strong style={{ color: '#06b6d4' }}>Best Use Case: </strong>
              {currentCam.useCase}
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>
                KEY OPTICAL CHARACTERISTICS
              </div>
              {currentCam.keyDifferences.map((diff, i) => (
                <div key={i} style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>
                  • {diff}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Controls & Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#06b6d4" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                FOV, Zoom & Clipping Controls
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentCam.controls.map((ctrl) => (
                <ControlSlider
                  key={ctrl.name}
                  control={ctrl}
                  value={propsState[ctrl.name]}
                  onChange={(val) => handlePropChange(ctrl.name, val)}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={16} color="#38bdf8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
                GENERATED CAMERA JSX
              </span>
            </div>
            <CodeBlock
              code={generatedCode}
              language="tsx"
              title={`${currentCam.name} Rig`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
