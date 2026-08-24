import React, { useState, useEffect } from 'react';
import { Search, X, Layers, Sun, Camera, Sliders, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { qnaData } from '../../data/qnaData';
import { materialsData } from '../../data/materialsData';
import { lightsData } from '../../data/lightsData';
import { camerasData } from '../../data/camerasData';
import { controllersData } from '../../data/controllersData';
import { customComponentsRegistry } from '../../data/componentsRegistry';
import { NavigationSection } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: NavigationSection, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Handle Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal handled from parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results across all 6 databases
  const matchedQna = qnaData.filter((item) => 
    !q || item.question.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q))
  ).slice(0, 3);

  const matchedMaterials = materialsData.filter((mat) => 
    !q || mat.name.toLowerCase().includes(q) || mat.description.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedLights = lightsData.filter((l) => 
    !q || l.name.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)
  ).slice(0, 2);

  const matchedCameras = camerasData.filter((c) => 
    !q || c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)
  ).slice(0, 2);

  const matchedControllers = controllersData.filter((c) => 
    !q || c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)
  ).slice(0, 2);

  const matchedComponents = customComponentsRegistry.filter((comp) => 
    !q || comp.title.toLowerCase().includes(q) || comp.tags.some(t => t.toLowerCase().includes(q))
  ).slice(0, 3);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '640px',
          maxWidth: '90vw',
          background: '#0b0f19',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(99, 102, 241, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.6)',
        }}>
          <Search size={20} color="#818cf8" />
          <input
            autoFocus
            type="text"
            placeholder="Search questions, materials, lights, shaders, components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Custom Components */}
          {matchedComponents.length > 0 && (
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f43f5e', marginBottom: '8px', letterSpacing: '0.05em' }}>
                3D CUSTOM COMPONENTS
              </div>
              {matchedComponents.map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => {
                    onNavigate('component-detail', comp.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.02)',
                    marginBottom: '4px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={16} color="#f43f5e" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#f8fafc' }}>{comp.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{comp.tagline}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="#64748b" />
                </div>
              ))}
            </div>
          )}

          {/* Materials */}
          {matchedMaterials.length > 0 && (
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ec4899', marginBottom: '8px', letterSpacing: '0.05em' }}>
                MATERIALS DICTIONARY
              </div>
              {matchedMaterials.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => {
                    onNavigate('materials', mat.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.02)',
                    marginBottom: '4px',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Layers size={16} color="#ec4899" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#f8fafc' }}>{mat.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{mat.tagline}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="#64748b" />
                </div>
              ))}
            </div>
          )}

          {/* Q&A Knowledge Base */}
          {matchedQna.length > 0 && (
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.05em' }}>
                KNOWLEDGE BASE (Q&A)
              </div>
              {matchedQna.map((qItem) => (
                <div
                  key={qItem.id}
                  onClick={() => {
                    onNavigate('qna', qItem.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.02)',
                    marginBottom: '4px',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={16} color="#38bdf8" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#f8fafc' }}>{qItem.question}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{qItem.shortAnswer.slice(0, 75)}...</div>
                    </div>
                  </div>
                  <ArrowRight size={14} color="#64748b" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
