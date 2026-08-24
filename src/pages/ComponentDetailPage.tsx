import React, { useState } from 'react';
import { Sparkles, Sliders, Code2, ArrowLeft, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { customComponentsRegistry } from '../data/componentsRegistry';
import { SharedCanvas } from '../components/canvas/SharedCanvas';
import { ControlSlider } from '../components/ui/ControlSlider';
import { CodeBlock } from '../components/ui/CodeBlock';
import { NavigationSection } from '../types';

// Import our 6 custom 3D components
import { HolographicCard } from '../library/HolographicCard';
import { ParticleVortex } from '../library/ParticleVortex';
import { GlassmorphicSphere } from '../library/GlassmorphicSphere';
import { ProceduralTerrain } from '../library/ProceduralTerrain';
import { FloatingBadge3D } from '../library/FloatingBadge3D';
import { CyberpunkPortal } from '../library/CyberpunkPortal';

interface ComponentDetailPageProps {
  componentId: string;
  onNavigate: (section: NavigationSection) => void;
}

export const ComponentDetailPage: React.FC<ComponentDetailPageProps> = ({
  componentId,
  onNavigate,
}) => {
  const component = customComponentsRegistry.find((c) => c.id === componentId) || customComponentsRegistry[0];

  const [activeTab, setActiveTab] = useState<'usage' | 'source' | 'props'>('usage');

  // Initialize props state for active component
  const [propsState, setPropsState] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    component.controls.forEach((c) => {
      init[c.name] = c.defaultValue;
    });
    return init;
  });

  const handlePropChange = (name: string, val: any) => {
    setPropsState((prev) => ({ ...prev, [name]: val }));
  };

  // Render the selected 3D component with current slider props
  const renderLiveComponent = () => {
    switch (component.id) {
      case 'holographic-card':
        return (
          <HolographicCard
            title={propsState.title}
            color={propsState.color}
            glowColor={propsState.glowColor}
            roughness={propsState.roughness}
            metalness={propsState.metalness}
            floating={propsState.floating}
          />
        );
      case 'particle-vortex':
        return (
          <ParticleVortex
            speed={propsState.speed}
            radius={propsState.radius}
            coreColor={propsState.coreColor}
            outerColor={propsState.outerColor}
            pointSize={propsState.pointSize}
          />
        );
      case 'glassmorphic-sphere':
        return (
          <GlassmorphicSphere
            coreColor={propsState.coreColor}
            transmission={propsState.transmission}
            roughness={propsState.roughness}
            ior={propsState.ior}
          />
        );
      case 'procedural-terrain':
        return (
          <ProceduralTerrain
            wireframeColor={propsState.wireframeColor}
            waveSpeed={propsState.waveSpeed}
            waveHeight={propsState.waveHeight}
          />
        );
      case 'floating-badge-3d':
        return (
          <FloatingBadge3D
            label={propsState.label}
            badgeColor={propsState.badgeColor}
            accentColor={propsState.accentColor}
          />
        );
      case 'cyberpunk-portal':
        return (
          <CyberpunkPortal
            ringColor={propsState.ringColor}
            glowColor={propsState.glowColor}
            speed={propsState.speed}
          />
        );
      default:
        return <HolographicCard />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px 8px 64px 8px' }}>
      {/* Back Button and Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => onNavigate('library')}
          className="btn-secondary"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Component Library</span>
        </button>

        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
          Author: <strong style={{ color: '#cbd5e1' }}>{component.author}</strong> • {component.dateAdded}
        </span>
      </div>

      {/* Header Banner */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#f43f5e',
            background: 'rgba(244, 63, 94, 0.15)',
            padding: '3px 8px',
            borderRadius: '6px',
          }}>
            {component.category}
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#34d399',
            background: 'rgba(52, 211, 153, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
          }}>
            Difficulty: {component.difficulty}
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          {component.title}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '800px', lineHeight: 1.5 }}>
          {component.description}
        </p>
      </div>

      {/* Studio Viewport & Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px' }}>
        {/* Left: Live 3D Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <SharedCanvas
            height="460px"
            cameraPosition={component.id === 'procedural-terrain' ? [0, 4, 6] : [0, 0, 5.2]}
            fov={45}
          >
            {renderLiveComponent()}
          </SharedCanvas>

          {/* Features Highlight */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f43f5e', letterSpacing: '0.05em' }}>
              KEY ARCHITECTURAL HIGHLIGHTS
            </div>
            {component.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={15} color="#34d399" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Props Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#f43f5e" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                Interactive Props Inspector
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Adjust parameters below to modify the 3D component live in the viewport.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {component.controls.map((ctrl) => (
                <ControlSlider
                  key={ctrl.name}
                  control={ctrl}
                  value={propsState[ctrl.name]}
                  onChange={(val) => handlePropChange(ctrl.name, val)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code & API Documentation Tabs */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('usage')}
            style={{
              background: activeTab === 'usage' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: activeTab === 'usage' ? '#818cf8' : '#94a3b8',
              border: activeTab === 'usage' ? '1px solid #818cf8' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            How to Use in Canvas
          </button>

          <button
            onClick={() => setActiveTab('source')}
            style={{
              background: activeTab === 'source' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: activeTab === 'source' ? '#818cf8' : '#94a3b8',
              border: activeTab === 'source' ? '1px solid #818cf8' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            Component Source Code
          </button>

          <button
            onClick={() => setActiveTab('props')}
            style={{
              background: activeTab === 'props' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: activeTab === 'props' ? '#818cf8' : '#94a3b8',
              border: activeTab === 'props' ? '1px solid #818cf8' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            Props API Documentation
          </button>
        </div>

        {activeTab === 'usage' && (
          <CodeBlock
            code={component.usageCode}
            language="tsx"
            title="App.tsx Usage Example"
          />
        )}

        {activeTab === 'source' && (
          <CodeBlock
            code={component.componentCode}
            language="tsx"
            title={`${component.title} Source Code`}
          />
        )}

        {activeTab === 'props' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
                  <th style={{ padding: '10px 14px' }}>Property</th>
                  <th style={{ padding: '10px 14px' }}>Type</th>
                  <th style={{ padding: '10px 14px' }}>Default</th>
                  <th style={{ padding: '10px 14px' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {component.propsDoc.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#cbd5e1' }}>
                    <td style={{ padding: '10px 14px', fontFamily: "'Fira Code', monospace", color: '#38bdf8', fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: '10px 14px', fontFamily: "'Fira Code', monospace", color: '#c084fc' }}>{p.type}</td>
                    <td style={{ padding: '10px 14px', fontFamily: "'Fira Code', monospace", color: '#f472b6' }}>{p.defaultValue}</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
