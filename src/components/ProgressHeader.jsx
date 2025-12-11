// src/components/ProgressHeader.jsx
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(
    (tech) => tech.status === 'completed'
  ).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <header className="progress-header">
      <div className="progress-header__info">
        <h1 className="progress-header__title">Трекер изучения технологий</h1>
        <p className="progress-header__subtitle">
          Всего технологий: <strong>{total}</strong> • Изучено:{' '}
          <strong>{completed}</strong>
        </p>
      </div>

      <div className="progress-header__bar-wrapper">
        <div className="progress-header__bar">
          <div
            className="progress-header__bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="progress-header__percent">
          Прогресс: <strong>{percent}%</strong>
        </div>
      </div>
    </header>
  );
}

export default ProgressHeader;
