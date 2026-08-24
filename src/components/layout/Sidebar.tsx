import React from 'react';
import { 
  Home, 
  HelpCircle, 
  Layers, 
  Sun, 
  Camera, 
  Sliders, 
  Sparkles, 
  Cpu, 
  BookOpen, 
  Code2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { NavigationSection } from '../../types';

interface SidebarProps {
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const navGroups = [
    {
      title: 'CORE & FOUNDATIONS',
      items: [
        { id: 'home' as NavigationSection, label: 'Overview & Showcase', icon: Home, color: '#818cf8' },
        { id: 'qna' as NavigationSection, label: 'Knowledge Base (Q&A)', icon: HelpCircle, color: '#38bdf8', badge: 'FAQ' },
        { id: 'architecture' as NavigationSection, label: 'Architecture & Pipeline', icon: Cpu, color: '#34d399' },
      ]
    },
    {
      title: '3D DICTIONARIES (LIVE GUI)',
      items: [
        { id: 'materials' as NavigationSection, label: 'Materials Dictionary', icon: Layers, color: '#ec4899' },
        { id: 'lights' as NavigationSection, label: 'Lights & Shadows', icon: Sun, color: '#f59e0b' },
        { id: 'cameras' as NavigationSection, label: 'Cameras & Frustums', icon: Camera, color: '#06b6d4' },
        { id: 'controllers' as NavigationSection, label: 'Controllers & Gizmos', icon: Sliders, color: '#a855f7' },
      ]
    },
    {
      title: 'COMPONENT STUDIO & LAB',
      items: [
        { id: 'library' as NavigationSection, label: 'My 3D Components', icon: Sparkles, color: '#f43f5e', badge: '6 Models' },
        { id: 'sandbox' as NavigationSection, label: 'Live Code Sandbox', icon: Code2, color: '#10b981' },
      ]
    }
  ];

  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      height: 'calc(100vh - 68px)',
      position: 'sticky',
      top: '68px',
      background: 'rgba(11, 15, 25, 0.95)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '20px 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#475569',
              letterSpacing: '0.08em',
              paddingLeft: '10px',
              marginBottom: '4px',
            }}>
              {group.title}
            </div>

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                    background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 500,
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={16} color={isActive ? item.color : '#64748b'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span style={{
                      fontSize: '0.65rem',
                      background: 'rgba(99, 102, 241, 0.25)',
                      color: '#a5b4fc',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}>
                      {item.badge}
                    </span>
                  ) : isActive ? (
                    <ChevronRight size={14} color="#818cf8" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Ecosystem Badge */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.75rem',
      }}>
        <div style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: '2px' }}>
          R3F v8 + Three.js r160+
        </div>
        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
          React 18/19 Reconciler • PBR Engine
        </div>
      </div>
    </aside>
  );
};
