import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
  title,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: '#090d16',
      fontSize: '0.85rem',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Code Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        background: 'rgba(15, 23, 42, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
          <Terminal size={14} color="#818cf8" />
          <span style={{ fontWeight: 600, fontSize: '0.78rem', color: '#cbd5e1', letterSpacing: '0.05em' }}>
            {title || language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
            border: copied ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
            color: copied ? '#34d399' : '#94a3b8',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Body */}
      <div style={{
        padding: '12px 14px',
        overflowX: 'auto',
        fontFamily: "'Fira Code', monospace",
        lineHeight: 1.5,
      }}>
        <pre style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          {lines.map((line, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '14px' }}>
              {showLineNumbers && (
                <span style={{
                  color: '#475569',
                  userSelect: 'none',
                  minWidth: '24px',
                  textAlign: 'right',
                  fontSize: '0.75rem',
                }}>
                  {idx + 1}
                </span>
              )}
              <span style={{ color: '#e2e8f0', whiteSpace: 'pre' }}>
                {highlightCode(line)}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

// Lightweight client-side syntax highlighter helper
function highlightCode(line: string): React.ReactNode {
  // Comments
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span style={{ color: '#64748b', fontStyle: 'italic' }}>{line}</span>;
  }

  // Tags & JSX highlighting
  const parts = line.split(/([<>/={}"'\s,:;()[\].])/g);

  return parts.map((part, i) => {
    if (['import', 'export', 'default', 'function', 'const', 'let', 'var', 'return', 'type', 'interface'].includes(part)) {
      return <span key={i} style={{ color: '#c084fc', fontWeight: 600 }}>{part}</span>;
    }
    if (['from', 'as', 'new', 'typeof', 'true', 'false', 'null', 'undefined'].includes(part)) {
      return <span key={i} style={{ color: '#f472b6' }}>{part}</span>;
    }
    if (part.startsWith('<') && part.length > 1) {
      return <span key={i} style={{ color: '#38bdf8', fontWeight: 600 }}>{part}</span>;
    }
    if (part.startsWith('use') || ['Canvas', 'OrbitControls', 'Float', 'Environment', 'Text'].includes(part)) {
      return <span key={i} style={{ color: '#fbbf24' }}>{part}</span>;
    }
    if (!isNaN(Number(part)) && part.trim() !== '') {
      return <span key={i} style={{ color: '#34d399' }}>{part}</span>;
    }
    if (part.startsWith('"') || part.startsWith("'") || part.startsWith('`')) {
      return <span key={i} style={{ color: '#a7f3d0' }}>{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}
