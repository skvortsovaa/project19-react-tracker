import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import TechnologyNotes from '../components/TechnologyNotes';

export default function TechnologyDetail({
  technologies,
  setStatus,
  updateNotes,
  removeTechnology,
  updateResources
}) {
  const { techId } = useParams();
  const navigate = useNavigate();

  const id = Number(techId);
  const tech = technologies.find(t => t.id === id);

  // состояния для API-ресурсов
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [resourcesError, setResourcesError] = useState(null);

  if (!tech) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn-primary">← Назад к списку</Link>
      </div>
    );
  }

  const del = () => {
    if (confirm('Удалить технологию?')) {
      removeTechnology(id);
      navigate('/technologies');
    }
  };

  // загрузка дополнительных ресурсов из API (GitHub)
  const loadResourcesFromApi = async () => {
    try {
      setResourcesLoading(true);
      setResourcesError(null);

      const q = encodeURIComponent(tech.title);
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=5`
      );

      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }

      const data = await res.json();

      const links = (data.items || [])
        .map(repo => repo.html_url)
        .filter(Boolean);

      // если вдруг API вернул пусто — тоже ок, просто сохраним пустой массив
      updateResources(id, links);
    } catch (e) {
      setResourcesError(e.message || 'Ошибка загрузки ресурсов');
    } finally {
      setResourcesLoading(false);
    }
  };

  return (
    <div className="page">
      <Link to="/technologies" className="btn-link">← Назад к списку</Link>
      <h1 style={{ marginTop: 10 }}>{tech.title}</h1>

      <div style={{ marginTop: 12 }}>
        <h3>Описание</h3>
        <p style={{ opacity: .85 }}>{tech.description}</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Статус изучения</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            className={tech.status === 'not-started' ? 'status-btn active' : 'status-btn'}
            onClick={() => setStatus(id, 'not-started')}
          >
            Не начато
          </button>

          <button
            className={tech.status === 'in-progress' ? 'status-btn active' : 'status-btn'}
            onClick={() => setStatus(id, 'in-progress')}
          >
            В процессе
          </button>

          <button
            className={tech.status === 'completed' ? 'status-btn active' : 'status-btn'}
            onClick={() => setStatus(id, 'completed')}
          >
            Завершено
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <TechnologyNotes techId={id} notes={tech.notes || ''} onNotesChange={updateNotes} />
      </div>

      {/* ✅ БЛОК “РЕСУРСЫ ИЗ API” */}
      <div style={{ marginTop: 16 }}>
        <h3>Дополнительные ресурсы (API)</h3>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            className="btn-primary"
            onClick={loadResourcesFromApi}
            disabled={resourcesLoading}
          >
            {resourcesLoading ? 'Загрузка...' : 'Загрузить ресурсы'}
          </button>

          {resourcesError && (
            <span style={{ color: 'crimson' }}>
              Ошибка: {resourcesError}
            </span>
          )}
        </div>

        {Array.isArray(tech.resources) && tech.resources.length > 0 ? (
          <ul style={{ marginTop: 10 }}>
            {tech.resources.map((url, idx) => (
              <li key={url + idx}>
                <a href={url} target="_blank" rel="noreferrer">{url}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: 10, opacity: .8 }}>
            Ресурсы пока не загружены.
          </p>
        )}
      </div>

      <div style={{ marginTop: 14 }}>
        <button className="btn-danger" onClick={del}>Удалить</button>
      </div>
    </div>
  );
}
