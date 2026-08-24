import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { qnaData } from '../data/qnaData';
import { CodeBlock } from '../components/ui/CodeBlock';

export const QnaPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(qnaData[0]?.id || null);

  const categories = [
    'All',
    'Fundamentals',
    'R3F Core',
    'Hooks & Lifecycle',
    'Materials & Shaders',
    'Performance & Best Practices'
  ];

  const filteredQna = qnaData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '16px 8px 64px 8px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '4px 12px',
          borderRadius: '20px',
          width: 'fit-content',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#38bdf8',
        }}>
          <HelpCircle size={14} />
          <span>KNOWLEDGE BASE & FAQ</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc' }}>
          WebGL & React Three Fiber Core Concepts
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
          Comprehensive questions, answers, architecture diagrams, and code snippets detailing how WebGL rasterization works, how Three.js organizes the scenegraph, and how R3F declaratively reconciles 3D graphics inside React.
        </p>
      </div>

      {/* Search and Category Filter Controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '18px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(30, 41, 59, 0.6)',
          padding: '10px 16px',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <Search size={18} color="#818cf8" />
          <input
            type="text"
            placeholder="Search questions by topic (e.g. useFrame, WebGL, shaders, instancing)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: isActive ? '#6366f1' : 'rgba(30, 41, 59, 0.5)',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  border: isActive ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q&A Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredQna.length === 0 ? (
          <div style={{
            padding: '48px',
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.4)',
            borderRadius: '16px',
            color: '#94a3b8',
          }}>
            No questions matched your query "{searchQuery}". Try searching for "WebGL", "useFrame", or "shaders".
          </div>
        ) : (
          filteredQna.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  overflow: 'hidden',
                  borderColor: isExpanded ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Header Collapsible Trigger */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: isExpanded ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, paddingRight: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#38bdf8',
                        background: 'rgba(56, 189, 248, 0.12)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}>
                        {item.category}
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: item.difficulty === 'Beginner' ? '#34d399' : item.difficulty === 'Intermediate' ? '#fbbf24' : '#f43f5e',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}>
                        {item.difficulty}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.4 }}>
                      {item.question}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
                      {item.shortAnswer}
                    </p>
                  </div>

                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818cf8',
                  }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expanded Detailed Section */}
                {isExpanded && (
                  <div style={{
                    padding: '24px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(11, 15, 25, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}>
                    {/* Detailed bullet points */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {item.detailedAnswer.map((para, pIdx) => (
                        <div key={pIdx} style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                          {para}
                        </div>
                      ))}
                    </div>

                    {/* Code Snippet if present */}
                    {item.codeSnippet && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#a5b4fc', letterSpacing: '0.05em' }}>
                          PRACTICAL CODE EXAMPLE
                        </div>
                        <CodeBlock
                          code={item.codeSnippet}
                          language={item.codeLanguage || 'tsx'}
                          title="Implementation Snippet"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      flexWrap: 'wrap',
                    }}>
                      <Tag size={13} color="#64748b" />
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>TAGS:</span>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.72rem',
                            background: 'rgba(255, 255, 255, 0.04)',
                            color: '#94a3b8',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
