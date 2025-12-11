// src/components/Statistics.jsx
import './Statistics.css';

function Statistics({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter((t) => t.status === 'completed').length;
  const inProgress = technologies.filter(
    (t) => t.status === 'in-progress'
  ).length;
  const notStarted = technologies.filter(
    (t) => t.status === 'not-started'
  ).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Определяем «самую популярную» категорию
  const counts = {
    'Не начато': notStarted,
    'В процессе': inProgress,
    'Изучено': completed,
  };

  const mostPopular =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  return (
    <section className="stats">
      <h2 className="stats__title">Статистика</h2>

      <div className="stats__grid">
        <div className="stats__card">
          <div className="stats__label">Всего технологий</div>
          <div className="stats__value">{total}</div>
        </div>

        <div className="stats__card stats__card--completed">
          <div className="stats__label">Изучено</div>
          <div className="stats__value">{completed}</div>
        </div>

        <div className="stats__card stats__card--progress">
          <div className="stats__label">В процессе</div>
          <div className="stats__value">{inProgress}</div>
        </div>

        <div className="stats__card stats__card--not-started">
          <div className="stats__label">Не начато</div>
          <div className="stats__value">{notStarted}</div>
        </div>

        <div className="stats__card stats__card--wide">
          <div className="stats__label">Процент завершения</div>
          <div className="stats__value">{percent}%</div>
          <div className="stats__bar">
            <div
              className="stats__bar-fill"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="stats__label stats__label--secondary">
            Самая популярная категория: <strong>{mostPopular}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
