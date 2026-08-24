import React, { useState } from 'react';
import { Sliders, Sparkles, Code2, MousePointer, Move3d } from 'lucide-react';
import { controllersData } from '../data/controllersData';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  TransformControls, 
  PresentationControls, 
  Environment, 
  RoundedBox,
  Float
} from '@react-three/drei';
import { ControlSlider } from '../components/ui/ControlSlider';
import { CodeBlock } from '../components/ui/CodeBlock';

export const ControllersDictPage: React.FC = () => {
  const [selectedCtrlId, setSelectedCtrlId] = useState<string>(controllersData[0].id);

  const currentCtrl = controllersData.find((c) => c.id === selectedCtrlId) || controllersData[0];

  const [propsState, setPropsState] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    currentCtrl.controls.forEach((c) => {
      init[c.name] = c.defaultValue;
    });
    return init;
  });

  const handleSelectController = (ctrlId: string) => {
    setSelectedCtrlId(ctrlId);
    const newCtrl = controllersData.find((c) => c.id === ctrlId);
    if (newCtrl) {
      const init: Record<string, any> = {};
      newCtrl.controls.forEach((c) => {
        init[c.name] = c.defaultValue;
      });
      setPropsState(init);
    }
  };

  const handlePropChange = (name: string, val: any) => {
    setPropsState((prev) => ({ ...prev, [name]: val }));
  };

  const generatedCode = currentCtrl.codeExample(propsState);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px 8px 64px 8px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(168, 85, 247, 0.15)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          width: 'fit-content',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#a855f7',
        }}>
          <Sliders size={14} />
          <span>CONTROLLERS & GIZMOS DICTIONARY</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          Interactive 3D Camera & Object Controllers
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Test OrbitControls damping physics, TransformControls 3D axis manipulation gizmos, and PresentationControls spring snaps live in the viewport.
        </p>
      </div>

      {/* Controller Selector Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto' }}>
        {controllersData.map((ctrl) => {
          const isActive = selectedCtrlId === ctrl.id;
          return (
            <button
              key={ctrl.id}
              onClick={() => handleSelectController(ctrl.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' : 'rgba(30, 41, 59, 0.6)',
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
              <Move3d size={15} color={isActive ? '#ffffff' : '#a855f7'} />
              <span>{ctrl.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Viewport & Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left: Interactive 3D Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            height: '420px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #0f172a 0%, #030712 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
          }}>
            <Canvas camera={{ position: [0, 1.5, 4.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 8, 5]} intensity={1.8} />
              <Environment preset="city" />

              {/* OrbitControls Mode */}
              {currentCtrl.id === 'orbit-controls' && (
                <>
                  <mesh position={[0, 0, 0]}>
                    <torusKnotGeometry args={[1, 0.35, 128, 32]} />
                    <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
                  </mesh>
                  <OrbitControls
                    makeDefault
                    enableDamping={propsState.enableDamping ?? true}
                    dampingFactor={propsState.dampingFactor ?? 0.05}
                    autoRotate={propsState.autoRotate ?? true}
                    autoRotateSpeed={propsState.autoRotateSpeed ?? 2.0}
                    enableZoom={propsState.enableZoom ?? true}
                    maxPolarAngle={propsState.maxPolarAngle ?? 1.57}
                  />
                </>
              )}

              {/* TransformControls Mode */}
              {currentCtrl.id === 'transform-controls' && (
                <>
                  <TransformControls
                    mode={propsState.mode || 'translate'}
                    size={propsState.size ?? 1.0}
                    showX={propsState.showX ?? true}
                    showY={propsState.showY ?? true}
                    showZ={propsState.showZ ?? true}
                  >
                    <mesh>
                      <boxGeometry args={[1.5, 1.5, 1.5]} />
                      <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
                    </mesh>
                  </TransformControls>
                  <OrbitControls makeDefault={false} />
                </>
              )}

              {/* PresentationControls Mode */}
              {currentCtrl.id === 'presentation-controls' && (
                <PresentationControls
                  global
                  snap={propsState.snap ?? true}
                  speed={propsState.speed ?? 1.5}
                  zoom={propsState.zoom ?? 1.0}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 3, Math.PI / 3]}
                >
                  <RoundedBox args={[2.4, 1.6, 0.2]} radius={0.1} smoothness={4}>
                    <meshPhysicalMaterial
                      color="#06b6d4"
                      roughness={0.1}
                      metalness={0.85}
                      clearcoat={1.0}
                    />
                  </RoundedBox>
                </PresentationControls>
              )}

              {/* ScrollControls Mode */}
              {currentCtrl.id === 'scroll-controls' && (
                <>
                  <Float speed={2}>
                    <mesh>
                      <octahedronGeometry args={[1.2, 0]} />
                      <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.9} />
                    </mesh>
                  </Float>
                  <OrbitControls makeDefault />
                </>
              )}
            </Canvas>
          </div>

          {/* Controller Specs */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              {currentCtrl.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {currentCtrl.description}
            </p>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', marginBottom: '6px' }}>
                KEY FEATURES & HOOK INTEGRATION
              </div>
              {currentCtrl.features.map((feat, i) => (
                <div key={i} style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px' }}>
                  • {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Controls & Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#a855f7" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                Controller Properties
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentCtrl.controls.map((ctrl) => (
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
                GENERATED CONTROLLER JSX
              </span>
            </div>
            <CodeBlock
              code={generatedCode}
              language="tsx"
              title={`${currentCtrl.name} Rig`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
