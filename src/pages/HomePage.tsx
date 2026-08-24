import React from 'react';
import { 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Sun, 
  Camera, 
  Sliders, 
  Code2, 
  ArrowRight, 
  CheckCircle2,
  Box,
  Cpu,
  Zap
} from 'lucide-react';
import { SharedCanvas } from '../components/canvas/SharedCanvas';
import { HolographicCard } from '../library/HolographicCard';
import { NavigationSection } from '../types';

interface HomePageProps {
  onNavigate: (section: NavigationSection) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const dictionaryCards = [
    {
      id: 'materials' as NavigationSection,
      title: 'Materials Dictionary',
      tagline: 'Standard, Physical (Glass), Toon, Normal & Shaders with live slider GUI.',
      icon: Layers,
      color: '#ec4899',
      count: '6 Materials'
    },
    {
      id: 'lights' as NavigationSection,
      title: 'Lights & Shadows',
      tagline: 'Directional, Ambient, Point, Spot & Hemisphere with visual 3D helpers.',
      icon: Sun,
      color: '#f59e0b',
      count: '5 Light Types'
    },
    {
      id: 'cameras' as NavigationSection,
      title: 'Cameras & Frustums',
      tagline: 'Perspective FOV vs Isometric Orthographic and 6-sided CubeCameras.',
      icon: Camera,
      color: '#06b6d4',
      count: '3 Camera Models'
    },
    {
      id: 'controllers' as NavigationSection,
      title: 'Controllers & Gizmos',
      tagline: 'OrbitControls inertia, TransformControls 3D gizmo, and ScrollControls.',
      icon: Sliders,
      color: '#a855f7',
      count: '4 Controllers'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '16px 8px 64px 8px' }}>
      {/* Hero Section with Live 3D Centerpiece */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '32px',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(17, 24, 39, 0.4) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        borderRadius: '24px',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient background glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Hero Left Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '6px 14px',
            borderRadius: '20px',
            width: 'fit-content',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#a5b4fc',
          }}>
            <Sparkles size={14} color="#818cf8" />
            <span>Interactive 3D Web Documentation & Component Lab</span>
          </div>

          <h1 style={{
            fontSize: '2.8rem',
            lineHeight: 1.15,
            fontWeight: 900,
            letterSpacing: '-0.03em',
          }}>
            Master <span className="gradient-text">React Three Fiber</span> with Live 3D Code & Dictionaries
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            lineHeight: 1.6,
          }}>
            An interactive knowledge hub explaining WebGL, Three.js, and R3F architecture, with live real-time property dictionaries for Materials, Lights, Cameras, and a production-grade 3D Component Studio.
          </p>

          {/* Call to Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('library')}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '1rem' }}
            >
              <Sparkles size={18} />
              <span>Explore 3D Components</span>
            </button>

            <button
              onClick={() => onNavigate('materials')}
              className="btn-secondary"
              style={{ padding: '12px 20px', fontSize: '1rem' }}
            >
              <Layers size={18} color="#ec4899" />
              <span>Open Dictionaries</span>
            </button>

            <button
              onClick={() => onNavigate('qna')}
              className="btn-secondary"
              style={{ padding: '12px 20px', fontSize: '1rem' }}
            >
              <HelpCircle size={18} color="#38bdf8" />
              <span>Q&A Wiki</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginTop: '16px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>18+</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Dictionary Definitions</div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>60+ FPS</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>WebGL 2.0 PBR Engine</div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ec4899' }}>100%</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Live Interactive Previews</div>
            </div>
          </div>
        </div>

        {/* Hero Right 3D Interactive Canvas */}
        <div style={{ height: '420px', position: 'relative' }}>
          <SharedCanvas height="420px" cameraPosition={[0, 0, 5.2]} fov={45}>
            <HolographicCard
              title="R3F STUDIO"
              subtitle="LIVE CANVAS & SHADERS"
              glowColor="#818cf8"
              color="#0f172a"
            />
          </SharedCanvas>
        </div>
      </section>

      {/* 3D Dictionaries Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ec4899', letterSpacing: '0.05em' }}>
              VISUAL REFERENCE DICTIONARIES
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc' }}>
              Explore R3F Primitives with Live Property Sliders
            </h2>
          </div>
          <button
            onClick={() => onNavigate('materials')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <span>View All Dictionaries</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {dictionaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="glass-panel glass-card-glow"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: `rgba(${card.color === '#ec4899' ? '236, 72, 153' : card.color === '#f59e0b' ? '245, 158, 11' : card.color === '#06b6d4' ? '6, 182, 212' : '168, 85, 247'}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={22} color={card.color} />
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    color: '#cbd5e1',
                    fontFamily: "'Fira Code', monospace",
                  }}>
                    {card.count}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    {card.tagline}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: card.color,
                  marginTop: 'auto',
                }}>
                  <span>Launch Live Testbench</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Knowledge Hub Highlights */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
      }}>
        {/* Knowledge Box */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={24} color="#38bdf8" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc' }}>
              Q&A Knowledge Base
            </h3>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Understand the complete mental model of 3D graphics on the web:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'What is WebGL vs Three.js vs React Three Fiber?',
              'How does the 60 FPS Render Loop (useFrame) work?',
              'Why you should never use useState for animations',
              'Vertex & Fragment Shaders, Uniforms & Varyings (GLSL)',
              'InstancedMesh & reducing Draw Calls for 100,000 objects'
            ].map((topic, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <CheckCircle2 size={16} color="#34d399" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('qna')}
            className="btn-primary"
            style={{ marginTop: '8px', alignSelf: 'flex-start' }}
          >
            <span>Read All Q&A Topics</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Architecture & Pipeline Box */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={24} color="#a855f7" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc' }}>
              How Canvas Code Renders Live
            </h3>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Learn how to structure your own R3F components with live editable props and full GPU lifecycle management:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Component Registry Pattern with dynamic prop bindings',
              'Zero WebGL context crashes using shared viewports',
              'Safe automatic memory disposal of Geometries & Materials',
              'Adding your own unique custom components to this library'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <Zap size={16} color="#a855f7" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('architecture')}
            className="btn-secondary"
            style={{ marginTop: '8px', alignSelf: 'flex-start' }}
          >
            <span>Architecture & Creator Guide</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};
