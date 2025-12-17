// src/components/ProgressBar.jsx
import './ProgressBar.css';

export default function ProgressBar({
  progress,
  label = '',
  height = 10,
  showPercentage = true,
  animated = true,
}) {
  const normalized = Math.min(100, Math.max(0, progress));

  return (
    <div className="progressbar">
      {(label || showPercentage) && (
        <div className="progressbar__head">
          {label && <span className="progressbar__label">{label}</span>}
          {showPercentage && <span className="progressbar__pct">{normalized}%</span>}
        </div>
      )}

      <div className="progressbar__outer" style={{ height }}>
        <div
          className={`progressbar__inner ${animated ? 'progressbar__inner--animated' : ''}`}
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  );
}
