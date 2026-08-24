import React, { useState } from 'react';
import { Code2, Play, RefreshCw, Sliders, Sparkles, Layers } from 'lucide-react';
import { SharedCanvas } from '../components/canvas/SharedCanvas';
import { CodeBlock } from '../components/ui/CodeBlock';
import { HolographicCard } from '../library/HolographicCard';
import { ParticleVortex } from '../library/ParticleVortex';
import { GlassmorphicSphere } from '../library/GlassmorphicSphere';
import { ProceduralTerrain } from '../library/ProceduralTerrain';
import { FloatingBadge3D } from '../library/FloatingBadge3D';
import { CyberpunkPortal } from '../library/CyberpunkPortal';

export const LiveSandboxPage: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('particles');
  const [color1, setColor1] = useState('#06b6d4');
  const [color2, setColor2] = useState('#ec4899');
  const [speed, setSpeed] = useState(1.2);
  const [wireframe, setWireframe] = useState(false);

  const presets = [
    { id: 'particles', label: 'GPU Particle Vortex', icon: Sparkles },
    { id: 'hologram', label: 'Holographic Card', icon: Layers },
    { id: 'glass', label: 'Glass Refraction Sphere', icon: Layers },
    { id: 'terrain', label: 'Wave Wireframe Grid', icon: Layers },
    { id: 'portal', label: 'Cyberpunk Portal', icon: Sparkles },
    { id: 'badge', label: '3D Metallic Emblem', icon: Layers },
  ];

  const renderSandboxScene = () => {
    switch (selectedPreset) {
      case 'particles':
        return (
          <ParticleVortex
            speed={speed}
            coreColor={color1}
            outerColor={color2}
            count={4000}
          />
        );
      case 'hologram':
        return (
          <HolographicCard
            title="LIVE SANDBOX"
            subtitle="INTERACTIVE R3F"
            color={color1}
            glowColor={color2}
            floating
          />
        );
      case 'glass':
        return (
          <GlassmorphicSphere
            coreColor={color1}
            transmission={0.98}
            ior={1.6}
          />
        );
      case 'terrain':
        return (
          <ProceduralTerrain
            color={color1}
            wireframeColor={color2}
            waveSpeed={speed}
          />
        );
      case 'portal':
        return (
          <CyberpunkPortal
            ringColor={color1}
            glowColor={color2}
            speed={speed}
          />
        );
      case 'badge':
        return (
          <FloatingBadge3D
            badgeColor={color1}
            accentColor={color2}
            label="SANDBOX 3D"
          />
        );
      default:
        return <HolographicCard />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px 8px 64px 8px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          width: 'fit-content',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#34d399',
        }}>
          <Code2 size={14} />
          <span>INTERACTIVE 3D PLAYGROUND</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          Live Canvas Execution Sandbox
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Select 3D presets, adjust interactive uniforms and material properties, and view the live rendered output.
        </p>
      </div>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto' }}>
        {presets.map((p) => {
          const isActive = selectedPreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(30, 41, 59, 0.6)',
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
              <p.icon size={15} color={isActive ? '#ffffff' : '#34d399'} />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Viewport and Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px' }}>
        {/* Left Viewport */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SharedCanvas
            height="460px"
            cameraPosition={selectedPreset === 'terrain' ? [0, 4, 6] : [0, 0, 5.2]}
          >
            {renderSandboxScene()}
          </SharedCanvas>
        </div>

        {/* Right Sandbox Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#34d399" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                Sandbox Live Controls
              </h3>
            </div>

            {/* Primary Color Picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1' }}>
                Primary Tone: {color1}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  style={{ width: '36px', height: '28px', border: 'none', cursor: 'pointer', background: 'transparent' }}
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontFamily: "'Fira Code', monospace",
                  }}
                />
              </div>
            </div>

            {/* Secondary Color Picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1' }}>
                Secondary Accent: {color2}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  style={{ width: '36px', height: '28px', border: 'none', cursor: 'pointer', background: 'transparent' }}
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontFamily: "'Fira Code', monospace",
                  }}
                />
              </div>
            </div>

            {/* Speed Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>
                <span>Animation Speed Multiplier</span>
                <span style={{ color: '#34d399', fontFamily: "'Fira Code', monospace" }}>{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={3.0}
                step={0.1}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                style={{ accentColor: '#10b981', cursor: 'pointer' }}
              />
            </div>
          </div>

          <CodeBlock
            code={`<Canvas camera={{ position: [0, 0, 5] }}>
  <ambientLight intensity={0.6} />
  <directionalLight position={[5, 8, 5]} intensity={1.5} />
  <Environment preset="city" />
  {/* Active Sandbox Preset */}
  <${selectedPreset === 'particles' ? 'ParticleVortex' : selectedPreset === 'hologram' ? 'HolographicCard' : 'GlassmorphicSphere'}
    color1="${color1}"
    color2="${color2}"
    speed={${speed}}
  />
  <OrbitControls enableDamping />
</Canvas>`}
            language="tsx"
            title="Live Configuration Snippet"
          />
        </div>
      </div>
    </div>
  );
};
