// src/components/ProgressHeader.jsx
import './ProgressHeader.css';

export default function ProgressHeader({ technologies }) {
  const total = technologies?.length ?? 0;
  const completed = (technologies || []).filter(t => t.status === 'completed').length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <header className="progress-header">
      <h1 className="progress-header__title">Трекер изучения технологий</h1>

      <p className="progress-header__subtitle">
        Всего технологий: {total} · Изучено: {completed}
      </p>

      <div className="progress-header__bar-wrapper">
        <div className="progress-header__bar">
          <div
            className="progress-header__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="progress-header__bar-text">
          Прогресс: {progress}%
        </div>
      </div>
    </header>
  );
}
