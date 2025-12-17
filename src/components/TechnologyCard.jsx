import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  // Человекочитаемые подписи и иконки
  const statusLabel = {
    'completed': 'Изучено',
    'in-progress': 'В процессе',
    'not-started': 'Не начато',
  }[status];

  const statusIcon = {
    'completed': '✅',
    'in-progress': '🕒',
    'not-started': '📌',
  }[status];

  // CSS-класс по статусу
  const statusClass = `technology-card status-${status}`;

  return (
    <article
      className={statusClass}
      onClick={() => onStatusChange(id)}
    >
      <header className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>

        <div className="technology-card__status">
          <span className="technology-card__status-icon">{statusIcon}</span>
          <span className="technology-card__status-text">{statusLabel}</span>
        </div>
      </header>

      <p className="technology-card__description">{description}</p>

      {/* ✅ Заметки (клик по textarea НЕ меняет статус) */}
      <TechnologyNotes
        techId={id}
        notes={notes || ''}
        onNotesChange={onNotesChange}
      />
    </article>
  );
}

export default TechnologyCard;


