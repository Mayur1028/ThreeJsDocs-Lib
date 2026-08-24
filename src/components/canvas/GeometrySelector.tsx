import React from 'react';

export type TestGeometryType = 'sphere' | 'torusKnot' | 'dodecahedron' | 'box' | 'cylinder' | 'torus';

interface GeometrySelectorProps {
  currentGeometry: TestGeometryType;
  onSelect: (geom: TestGeometryType) => void;
}

export const GeometrySelector: React.FC<GeometrySelectorProps> = ({
  currentGeometry,
  onSelect,
}) => {
  const geometries: { id: TestGeometryType; label: string }[] = [
    { id: 'sphere', label: 'Sphere' },
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'dodecahedron', label: 'D20 Crystal' },
    { id: 'box', label: 'Cube' },
    { id: 'cylinder', label: 'Cylinder' },
    { id: 'torus', label: 'Donut (Torus)' },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'rgba(15, 23, 42, 0.75)',
      padding: '4px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: '0.75rem', color: '#94a3b8', padding: '0 6px', fontWeight: 600 }}>
        Shape:
      </span>
      {geometries.map((g) => {
        const isActive = currentGeometry === g.id;
        return (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            style={{
              background: isActive ? '#6366f1' : 'transparent',
              color: isActive ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s ease',
            }}
          >
            {g.label}
          </button>
        );
      })}
    </div>
  );
};

export const RenderTestGeometry: React.FC<{
  type: TestGeometryType;
  children: React.ReactNode;
}> = ({ type, children }) => {
  switch (type) {
    case 'sphere':
      return (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.3, 64, 64]} />
          {children}
        </mesh>
      );
    case 'torusKnot':
      return (
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[0.9, 0.32, 128, 32]} />
          {children}
        </mesh>
      );
    case 'dodecahedron':
      return (
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[1.3, 0]} />
          {children}
        </mesh>
      );
    case 'box':
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.8, 1.8]} />
          {children}
        </mesh>
      );
    case 'cylinder':
      return (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 2.2, 32]} />
          {children}
        </mesh>
      );
    case 'torus':
      return (
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.2, 0.45, 30, 100]} />
          {children}
        </mesh>
      );
    default:
      return (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.3, 64, 64]} />
          {children}
        </mesh>
      );
  }
};
