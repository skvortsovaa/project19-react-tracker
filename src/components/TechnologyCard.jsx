import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
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
      onClick={() => onStatusChange(id)}   // ← ДОБАВЛЕН ОБРАБОТЧИК
    >
      <header className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>

        <div className="technology-card__status">
          <span className="technology-card__status-icon">{statusIcon}</span>
          <span className="technology-card__status-text">{statusLabel}</span>
        </div>
      </header>

      <p className="technology-card__description">{description}</p>
    </article>
  );
}

export default TechnologyCard;
