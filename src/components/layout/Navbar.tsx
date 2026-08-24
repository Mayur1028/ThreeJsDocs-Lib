import React from 'react';
import { Box, Search, Sparkles, BookOpen, Layers, Cpu, Code2 } from 'lucide-react';
import { NavigationSection } from '../../types';

interface NavbarProps {
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
}) => {
  return (
    <header style={{
      height: '68px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 9, 14, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
    }}>
      {/* Brand Logo */}
      <div
        onClick={() => onNavigate('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(99, 102, 241, 0.5)',
        }}>
          <Box size={22} color="#ffffff" />
        </div>
        <div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: '1.15rem',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>R3F</span>
            <span className="gradient-text">STUDIO & DOCS</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.05em' }}>
            DOCS • DICTIONARIES • COMPONENT LAB
          </div>
        </div>
      </div>

      {/* Center Search Pill Bar (Ctrl+K) */}
      <div
        onClick={onOpenSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '8px 18px',
          borderRadius: '24px',
          cursor: 'pointer',
          color: '#94a3b8',
          fontSize: '0.85rem',
          minWidth: '280px',
          transition: 'all 0.2s ease',
        }}
      >
        <Search size={15} color="#818cf8" />
        <span style={{ flex: 1 }}>Search topics, materials, shaders...</span>
        <kbd style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '2px 7px',
          borderRadius: '5px',
          fontSize: '0.72rem',
          color: '#cbd5e1',
          fontFamily: "'Fira Code', monospace",
        }}>
          Ctrl K
        </kbd>
      </div>

      {/* Right Quick Action Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => onNavigate('qna')}
          className="btn-secondary"
          style={{ padding: '7px 14px', fontSize: '0.85rem' }}
        >
          <BookOpen size={15} color="#38bdf8" />
          <span>Q&A Wiki</span>
        </button>

        <button
          onClick={() => onNavigate('materials')}
          className="btn-secondary"
          style={{ padding: '7px 14px', fontSize: '0.85rem' }}
        >
          <Layers size={15} color="#c084fc" />
          <span>Dictionaries</span>
        </button>

        <button
          onClick={() => onNavigate('library')}
          className="btn-primary"
          style={{ padding: '7px 16px', fontSize: '0.85rem' }}
        >
          <Sparkles size={15} />
          <span>3D Component Studio</span>
        </button>
      </div>
    </header>
  );
};
