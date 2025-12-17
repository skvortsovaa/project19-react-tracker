import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

export default function TechnologyList({ technologies }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return technologies;
    return technologies.filter(t =>
      t.title.toLowerCase().includes(s) || t.description.toLowerCase().includes(s)
    );
  }, [technologies, q]);

  return (
    <div className="page">
      <div style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap', justifyContent:'space-between'}}>
        <h1 style={{margin:0}}>Все технологии</h1>
        <Link to="/add-technology" className="btn-primary">+ Добавить технологию</Link>
      </div>

      <div style={{display:'flex', gap:12, alignItems:'center', marginTop:12, flexWrap:'wrap'}}>
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Поиск..."
          style={{padding:'10px 12px', borderRadius:10, minWidth:260}}
        />
        <span style={{opacity:.8}}>Найдено: {filtered.length}</span>
      </div>

      <div className="tech-grid" style={{marginTop:16}}>
        {filtered.map(t => (
          <div key={t.id} className="tech-item">
            <h3 style={{margin:'0 0 6px'}}>{t.title}</h3>
            <p style={{margin:'0 0 10px', opacity:.85}}>{t.description}</p>

            <div style={{display:'flex', justifyContent:'space-between', gap:10, alignItems:'center'}}>
              <span className={`status status-${t.status}`}>{t.status}</span>
              <Link to={`/technology/${t.id}`} className="btn-link">Подробнее →</Link>
            </div>
          </div>
        ))}
      </div>

      {technologies.length === 0 && (
        <div style={{marginTop:18, opacity:.85}}>
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn-primary">Добавить первую</Link>
        </div>
      )}
    </div>
  );
}
