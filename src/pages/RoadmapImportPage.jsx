import { useMemo, useState } from 'react';

export default function RoadmapImportPage({ technologies, addTechnology }) {
  const [track, setTrack] = useState('frontend');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [importResult, setImportResult] = useState(null);

  // чтобы не импортировать дубликаты по названию
  const existingTitles = useMemo(() => {
    return new Set((technologies || []).map(t => (t.title || '').trim().toLowerCase()));
  }, [technologies]);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      setError(null);
      setImportResult(null);

      // GitHub API: ищем репозитории "roadmap" по выбранному треку
      const q = encodeURIComponent(`${track} roadmap`);
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=10`
      );

      if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);

      const data = await res.json();

      const items = (data.items || []).map(repo => ({
        id: repo.id,
        title: repo.name,
        description: repo.description || `Roadmap: ${track}`,
        url: repo.html_url,
        stars: repo.stargazers_count,
      }));

      setRoadmaps(items);
    } catch (e) {
      setError(e.message || 'Ошибка загрузки roadmap-ов');
    } finally {
      setLoading(false);
    }
  };

  const safeAddTechnology = (title, description) => {
    // ВАЖНО: у тебя addTechnology может быть:
    // 1) addTechnology(title, description)
    // 2) addTechnology({ title, description })
    // Этот “safe” вариант покрывает оба случая.
    try {
      addTechnology(title, description);
    } catch {
      addTechnology({ title, description });
    }
  };

  const importAll = () => {
    if (!roadmaps.length) return;

    let added = 0;
    let skipped = 0;

    roadmaps.forEach(r => {
      const key = (r.title || '').trim().toLowerCase();
      if (!key || existingTitles.has(key)) {
        skipped += 1;
        return;
      }

      // Добавляем как "новую технологию"
      // Можно сделать описание с ссылкой на репо:
      const desc = `${r.description}\nИсточник: ${r.url}\n⭐ ${r.stars}`;

      safeAddTechnology(r.title, desc);
      added += 1;
    });

    setImportResult({ added, skipped });
  };

  return (
    <div className="page">
      <h1>Импорт дорожных карт (API)</h1>
      <p style={{ opacity: 0.85 }}>
        Эта страница загружает популярные roadmap-репозитории из GitHub API и добавляет их как новые технологии.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          Трек:
          <select value={track} onChange={(e) => setTrack(e.target.value)}>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
            <option value="devops">devops</option>
            <option value="mobile">mobile</option>
            <option value="data">data</option>
            <option value="qa">qa</option>
          </select>
        </label>

        <button className="btn-primary" onClick={fetchRoadmaps} disabled={loading}>
          {loading ? 'Загрузка...' : 'Загрузить roadmaps'}
        </button>

        <button className="btn-primary" onClick={importAll} disabled={loading || roadmaps.length === 0}>
          Импортировать в технологии
        </button>
      </div>

      {error && (
        <div style={{ marginTop: 12, color: 'crimson' }}>
          Ошибка: {error}
        </div>
      )}

      {importResult && (
        <div style={{ marginTop: 12 }}>
          ✅ Добавлено: <b>{importResult.added}</b> • Пропущено (дубликаты): <b>{importResult.skipped}</b>
        </div>
      )}

      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {roadmaps.map(r => (
          <div key={r.id} style={{ border: '1px solid #e6e6e6', borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{r.title}</div>
            <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 8 }}>{r.description}</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 10 }}>⭐ {r.stars}</div>
            <a href={r.url} target="_blank" rel="noreferrer">Открыть на GitHub</a>
          </div>
        ))}
      </div>
    </div>
  );
}
