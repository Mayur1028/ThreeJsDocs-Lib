import React from 'react';
import { MaterialPropertyControl } from '../../types';

interface ControlSliderProps {
  control: MaterialPropertyControl;
  value: any;
  onChange: (val: any) => void;
}

export const ControlSlider: React.FC<ControlSliderProps> = ({
  control,
  value,
  onChange,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      padding: '10px 12px',
      background: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      {/* Label and Current Value Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.82rem',
      }}>
        <label style={{ fontWeight: 600, color: '#e2e8f0' }}>
          {control.label}
        </label>
        <span style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.78rem',
          color: '#818cf8',
          background: 'rgba(99, 102, 241, 0.1)',
          padding: '2px 6px',
          borderRadius: '4px',
        }}>
          {typeof value === 'boolean' ? (value ? 'true' : 'false') : value}
        </span>
      </div>

      {/* Input Elements depending on control type */}
      {control.type === 'number' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="range"
            min={control.min ?? 0}
            max={control.max ?? 1}
            step={control.step ?? 0.05}
            value={value ?? control.defaultValue}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            style={{
              flex: 1,
              accentColor: '#6366f1',
              cursor: 'pointer',
              height: '5px',
            }}
          />
        </div>
      )}

      {control.type === 'color' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="color"
            value={value ?? control.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '36px',
              height: '28px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: 'transparent',
            }}
          />
          <input
            type="text"
            value={value ?? control.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontFamily: "'Fira Code', monospace",
            }}
          />
        </div>
      )}

      {control.type === 'boolean' && (
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              accentColor: '#6366f1',
              cursor: 'pointer',
            }}
          />
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            {value ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      )}

      {control.type === 'select' && control.options && (
        <select
          value={value ?? control.defaultValue}
          onChange={(e) => onChange(e.target.value)}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#f8fafc',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {control.options.map((opt) => (
            <option key={opt} value={opt} style={{ background: '#0f172a' }}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {/* Description caption */}
      {control.description && (
        <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
          {control.description}
        </span>
      )}
    </div>
  );
};
