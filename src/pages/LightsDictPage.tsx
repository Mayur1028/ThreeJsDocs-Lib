import React, { useState, useRef } from 'react';
import { Sun, Sparkles, Sliders, Code2, Info, Eye } from 'lucide-react';
import { lightsData } from '../data/lightsData';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, useHelper } from '@react-three/drei';
import { ControlSlider } from '../components/ui/ControlSlider';
import { CodeBlock } from '../components/ui/CodeBlock';
import * as THREE from 'three';

// Dynamic Light Runner that mounts the active light type
const DynamicLightRig: React.FC<{
  lightDef: typeof lightsData[0];
  props: Record<string, any>;
  showHelper: boolean;
}> = ({ lightDef, props, showHelper }) => {
  const dirLightRef = useRef<THREE.DirectionalLight>(null!);
  const pointLightRef = useRef<THREE.PointLight>(null!);
  const spotLightRef = useRef<THREE.SpotLight>(null!);

  useHelper(showHelper && lightDef.id === 'directional-light' ? dirLightRef : null, THREE.DirectionalLightHelper, 1, '#f59e0b');
  useHelper(showHelper && lightDef.id === 'point-light' ? pointLightRef : null, THREE.PointLightHelper, 0.5, '#f59e0b');
  useHelper(showHelper && lightDef.id === 'spot-light' ? spotLightRef : null, THREE.SpotLightHelper, '#a855f7');

  switch (lightDef.id) {
    case 'directional-light':
      return (
        <directionalLight
          ref={dirLightRef}
          position={[props.posX ?? 4, props.posY ?? 6, props.posZ ?? 4]}
          intensity={props.intensity ?? 2.5}
          color={props.color ?? '#ffffff'}
          castShadow={!!props.castShadow}
          shadow-mapSize={[1024, 1024]}
        />
      );
    case 'ambient-light':
      return (
        <ambientLight
          color={props.color ?? '#93c5fd'}
          intensity={props.intensity ?? 0.8}
        />
      );
    case 'point-light':
      return (
        <group>
          <pointLight
            ref={pointLightRef}
            position={[props.posX ?? 0, props.posY ?? 2.5, props.posZ ?? 2]}
            color={props.color ?? '#f59e0b'}
            intensity={props.intensity ?? 8.0}
            distance={props.distance ?? 15}
            decay={props.decay ?? 2.0}
            castShadow
          />
          {/* Visual glowing bulb */}
          <mesh position={[props.posX ?? 0, props.posY ?? 2.5, props.posZ ?? 2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={props.color ?? '#f59e0b'} />
          </mesh>
        </group>
      );
    case 'spot-light':
      return (
        <spotLight
          ref={spotLightRef}
          position={[props.posX ?? 3, props.posY ?? 6, props.posZ ?? 4]}
          angle={props.angle ?? 0.6}
          penumbra={props.penumbra ?? 0.8}
          intensity={props.intensity ?? 12}
          color={props.color ?? '#a855f7'}
          castShadow
        />
      );
    case 'hemisphere-light':
      return (
        <hemisphereLight
          color={props.skyColor ?? '#38bdf8'}
          groundColor={props.groundColor ?? '#334155'}
          intensity={props.intensity ?? 1.0}
        />
      );
    default:
      return <ambientLight intensity={1} />;
  }
};

export const LightsDictPage: React.FC = () => {
  const [selectedLightId, setSelectedLightId] = useState<string>(lightsData[0].id);
  const [showHelper, setShowHelper] = useState<boolean>(true);

  const currentLight = lightsData.find((l) => l.id === selectedLightId) || lightsData[0];

  const [propsState, setPropsState] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    currentLight.controls.forEach((c) => {
      init[c.name] = c.defaultValue;
    });
    return init;
  });

  const handleSelectLight = (lightId: string) => {
    setSelectedLightId(lightId);
    const newLight = lightsData.find((l) => l.id === lightId);
    if (newLight) {
      const init: Record<string, any> = {};
      newLight.controls.forEach((c) => {
        init[c.name] = c.defaultValue;
      });
      setPropsState(init);
    }
  };

  const handlePropChange = (name: string, val: any) => {
    setPropsState((prev) => ({ ...prev, [name]: val }));
  };

  const generatedCode = currentLight.codeExample(propsState);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px 8px 64px 8px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          width: 'fit-content',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#f59e0b',
        }}>
          <Sun size={14} />
          <span>LIGHTS & SHADOWS DICTIONARY</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          Interactive Three.js Lights & Shadows Catalog
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Test Directional, Ambient, Point, Spot, and Hemisphere lights with real-time shadow casting, helper gizmos, and positioning sliders.
        </p>
      </div>

      {/* Light Selector Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto' }}>
        {lightsData.map((light) => {
          const isActive = selectedLightId === light.id;
          return (
            <button
              key={light.id}
              onClick={() => handleSelectLight(light.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'rgba(30, 41, 59, 0.6)',
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
              <Sun size={15} color={isActive ? '#ffffff' : '#f59e0b'} />
              <span>{light.name}</span>
            </button>
          );
        })}
      </div>

      {/* Studio Viewport and Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left: 3D Lighting Stage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#cbd5e1' }}>
              <input
                type="checkbox"
                checked={showHelper}
                onChange={(e) => setShowHelper(e.target.checked)}
                style={{ accentColor: '#f59e0b' }}
              />
              <span>Show 3D Light Helper (Wireframe Gizmo)</span>
            </label>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: "'Fira Code', monospace" }}>
              {currentLight.r3fTag}
            </span>
          </div>

          {/* Dedicated Lighting Canvas */}
          <div style={{
            height: '420px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
          }}>
            <Canvas
              shadows
              camera={{ position: [0, 3, 6], fov: 45 }}
              style={{ width: '100%', height: '100%' }}
            >
              {/* Active Light Rig */}
              <DynamicLightRig
                lightDef={currentLight}
                props={propsState}
                showHelper={showHelper}
              />

              {/* Multi-Object 3D Test Stage */}
              <group position={[0, -0.5, 0]}>
                {/* Center Main Sphere */}
                <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                  <sphereGeometry args={[0.8, 64, 64]} />
                  <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.7} />
                </mesh>

                {/* Left Floating Box */}
                <mesh position={[-2, 0.6, 0]} rotation={[0.4, 0.4, 0]} castShadow receiveShadow>
                  <boxGeometry args={[0.9, 0.9, 0.9]} />
                  <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
                </mesh>

                {/* Right Torus Knot */}
                <mesh position={[2, 0.7, 0]} castShadow receiveShadow>
                  <torusKnotGeometry args={[0.5, 0.18, 100, 16]} />
                  <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.9} />
                </mesh>

                {/* Floor Stage Ground */}
                <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[14, 14]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.2} />
                </mesh>
              </group>

              <OrbitControls makeDefault enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2 - 0.05} />
            </Canvas>
          </div>

          {/* Light Specs & Description */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              {currentLight.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {currentLight.description}
            </p>

            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              color: '#cbd5e1',
            }}>
              <strong style={{ color: '#f59e0b' }}>Use Case: </strong>
              {currentLight.useCase}
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>
                PRO-TIPS & SHADOW GUIDELINES
              </div>
              {currentLight.tips.map((tip, i) => (
                <div key={i} style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>
                  • {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Parameter Sliders & Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#f59e0b" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                Position & Intensity Controls
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentLight.controls.map((ctrl) => (
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
                GENERATED LIGHTING JSX
              </span>
            </div>
            <CodeBlock
              code={generatedCode}
              language="tsx"
              title={`${currentLight.name} Setup`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
