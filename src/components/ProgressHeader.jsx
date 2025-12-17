// src/components/ProgressHeader.jsx
import './ProgressHeader.css';
import ProgressBar from './ProgressBar';

function ProgressHeader({ technologies, progress }) {
  const total = technologies.length;
  const completed = technologies.filter((t) => t.status === 'completed').length;

  return (
    <header className="progress-header">
      <h1 className="progress-header__title">Трекер изучения технологий</h1>
      <p className="progress-header__subtitle">
        Всего технологий: <b>{total}</b> · Изучено: <b>{completed}</b>
      </p>

      <div className="progress-header__bar-wrapper">
        <ProgressBar progress={progress} label="Прогресс" height={10} />
      </div>
    </header>
  );
}

export default ProgressHeader;

