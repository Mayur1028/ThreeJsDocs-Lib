import React, { useState } from 'react';
import { Sparkles, ArrowRight, Tag, Layers, Search, Filter, Code2 } from 'lucide-react';
import { customComponentsRegistry } from '../data/componentsRegistry';
import { NavigationSection } from '../types';

interface LibraryGalleryPageProps {
  onSelectComponent: (componentId: string) => void;
  onNavigate: (section: NavigationSection) => void;
}

export const LibraryGalleryPage: React.FC<LibraryGalleryPageProps> = ({
  onSelectComponent,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'UI & 3D Cards',
    'Particles',
    'Shaders & Effects',
    'Procedural & Math'
  ];

  const filteredComponents = customComponentsRegistry.filter((comp) => {
    const matchesCategory = activeCategory === 'All' || comp.category === activeCategory;
    const matchesSearch = 
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '16px 8px 64px 8px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '4px 12px',
            borderRadius: '20px',
            width: 'fit-content',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#f43f5e',
          }}>
            <Sparkles size={14} />
            <span>CUSTOM 3D COMPONENT REGISTRY</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
            Unique 3D Component Library
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '750px' }}>
            A curated personal collection of production-ready 3D components, custom shaders, GPU particle systems, and interactive tactile cards. Click any card to launch the Studio live testbench and copy code.
          </p>
        </div>

        <button
          onClick={() => onNavigate('architecture')}
          className="btn-primary"
          style={{ padding: '10px 18px' }}
        >
          <Code2 size={16} />
          <span>Add Custom Component</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '14px 18px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isActive ? '#f43f5e' : 'rgba(30, 41, 59, 0.6)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  border: isActive ? '1px solid #fb7185' : '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(30, 41, 59, 0.6)',
          padding: '6px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          minWidth: '220px',
        }}>
          <Search size={14} color="#f43f5e" />
          <input
            type="text"
            placeholder="Filter components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Component Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredComponents.map((comp) => (
          <div
            key={comp.id}
            onClick={() => onSelectComponent(comp.id)}
            className="glass-panel glass-card-glow"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              cursor: 'pointer',
            }}
          >
            {/* Top Tag & Difficulty */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#f43f5e',
                background: 'rgba(244, 63, 94, 0.12)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}>
                {comp.category}
              </span>
              <span style={{
                fontSize: '0.7rem',
                color: '#cbd5e1',
                background: 'rgba(255, 255, 255, 0.06)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600,
              }}>
                {comp.difficulty}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                {comp.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {comp.tagline}
              </p>
            </div>

            {/* Features preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {comp.features.slice(0, 2).map((feat, i) => (
                <div key={i} style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>
                  ✓ {feat}
                </div>
              ))}
            </div>

            {/* Tags footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '10px' }}>
              {comp.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.68rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: '#64748b',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Launch Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#f43f5e',
            }}>
              <span>Launch Studio & Code</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
