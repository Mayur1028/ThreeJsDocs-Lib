import React, { useState } from 'react';
import { Layers, Sparkles, Check, Info, Code2, Sliders } from 'lucide-react';
import { materialsData } from '../data/materialsData';
import { SharedCanvas } from '../components/canvas/SharedCanvas';
import { GeometrySelector, RenderTestGeometry, TestGeometryType } from '../components/canvas/GeometrySelector';
import { ControlSlider } from '../components/ui/ControlSlider';
import { CodeBlock } from '../components/ui/CodeBlock';

interface MaterialsDictPageProps {
  initialMaterialId?: string;
}

export const MaterialsDictPage: React.FC<MaterialsDictPageProps> = ({
  initialMaterialId,
}) => {
  const [selectedMatId, setSelectedMatId] = useState<string>(
    initialMaterialId || materialsData[0].id
  );
  const [selectedGeom, setSelectedGeom] = useState<TestGeometryType>('sphere');

  const currentMat = materialsData.find((m) => m.id === selectedMatId) || materialsData[0];

  // Initialize control values state for current material
  const [propsState, setPropsState] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    currentMat.controls.forEach((c) => {
      init[c.name] = c.defaultValue;
    });
    return init;
  });

  const handleSelectMaterial = (matId: string) => {
    setSelectedMatId(matId);
    const newMat = materialsData.find((m) => m.id === matId);
    if (newMat) {
      const init: Record<string, any> = {};
      newMat.controls.forEach((c) => {
        init[c.name] = c.defaultValue;
      });
      setPropsState(init);
    }
  };

  const handlePropChange = (name: string, val: any) => {
    setPropsState((prev) => ({ ...prev, [name]: val }));
  };

  // Render the dynamic 3D material based on the selected class and props
  const renderDynamicMaterial = () => {
    switch (currentMat.id) {
      case 'mesh-standard-material':
        return (
          <meshStandardMaterial
            color={propsState.color || '#6366f1'}
            roughness={propsState.roughness ?? 0.25}
            metalness={propsState.metalness ?? 0.8}
            wireframe={!!propsState.wireframe}
            flatShading={!!propsState.flatShading}
          />
        );
      case 'mesh-physical-material':
        return (
          <meshPhysicalMaterial
            color={propsState.color || '#ffffff'}
            roughness={propsState.roughness ?? 0.1}
            transmission={propsState.transmission ?? 0.95}
            thickness={propsState.thickness ?? 1.5}
            ior={propsState.ior ?? 1.5}
            clearcoat={propsState.clearcoat ?? 1.0}
            clearcoatRoughness={propsState.clearcoatRoughness ?? 0.1}
            iridescence={propsState.iridescence ?? 0.4}
            reflectivity={1.0}
          />
        );
      case 'mesh-toon-material':
        return (
          <meshToonMaterial
            color={propsState.color || '#f43f5e'}
            wireframe={!!propsState.wireframe}
          />
        );
      case 'mesh-normal-material':
        return (
          <meshNormalMaterial
            flatShading={!!propsState.flatShading}
            wireframe={!!propsState.wireframe}
          />
        );
      case 'mesh-phong-material':
        return (
          <meshPhongMaterial
            color={propsState.color || '#3b82f6'}
            specular={propsState.specular || '#ffffff'}
            shininess={propsState.shininess ?? 80}
          />
        );
      case 'mesh-basic-material':
        return (
          <meshBasicMaterial
            color={propsState.color || '#10b981'}
            wireframe={!!propsState.wireframe}
            transparent={!!propsState.transparent}
            opacity={propsState.opacity ?? 1.0}
          />
        );
      default:
        return <meshStandardMaterial color="#6366f1" />;
    }
  };

  const generatedCode = currentMat.codeExample(propsState);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px 8px 64px 8px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(236, 72, 153, 0.15)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          width: 'fit-content',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#ec4899',
        }}>
          <Layers size={14} />
          <span>MATERIALS DICTIONARY & TESTBENCH</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          Interactive R3F Materials Catalog
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Select any Three.js/R3F material, adjust parameters in real time, test across different 3D shapes, and copy the generated JSX code.
        </p>
      </div>

      {/* Material Selector Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '8px',
      }}>
        {materialsData.map((mat) => {
          const isActive = selectedMatId === mat.id;
          return (
            <button
              key={mat.id}
              onClick={() => handleSelectMaterial(mat.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)' : 'rgba(30, 41, 59, 0.6)',
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
                boxShadow: isActive ? '0 4px 16px rgba(236, 72, 153, 0.4)' : 'none',
              }}
            >
              <Layers size={15} color={isActive ? '#ffffff' : '#ec4899'} />
              <span>{mat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Viewport & Property Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left: 3D Viewport + Geometry Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <GeometrySelector
              currentGeometry={selectedGeom}
              onSelect={setSelectedGeom}
            />
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: "'Fira Code', monospace" }}>
              {currentMat.threeClass}
            </span>
          </div>

          <SharedCanvas height="420px" cameraPosition={[0, 0, 4.2]}>
            <RenderTestGeometry type={selectedGeom}>
              {renderDynamicMaterial()}
            </RenderTestGeometry>
          </SharedCanvas>

          {/* Material Specs & Pros/Cons */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                {currentMat.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {currentMat.description}
              </p>
            </div>

            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              color: '#cbd5e1',
            }}>
              <strong style={{ color: '#818cf8' }}>Recommended Use Case: </strong>
              {currentMat.useCase}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', marginBottom: '6px' }}>
                  PROS / ADVANTAGES
                </div>
                {currentMat.pros.map((pro, i) => (
                  <div key={i} style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>
                    • {pro}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f43f5e', marginBottom: '6px' }}>
                  CONS / TRADE-OFFS
                </div>
                {currentMat.cons.map((con, i) => (
                  <div key={i} style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>
                    • {con}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real-time Controls & Generated JSX */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Controls Panel */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#ec4899" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                Real-time Parameter Sliders
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentMat.controls.map((ctrl) => (
                <ControlSlider
                  key={ctrl.name}
                  control={ctrl}
                  value={propsState[ctrl.name]}
                  onChange={(val) => handlePropChange(ctrl.name, val)}
                />
              ))}
            </div>
          </div>

          {/* Live Generated Code Snippet */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={16} color="#38bdf8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
                LIVE GENERATED JSX
              </span>
            </div>
            <CodeBlock
              code={generatedCode}
              language="tsx"
              title={`${currentMat.name} Snippet`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
