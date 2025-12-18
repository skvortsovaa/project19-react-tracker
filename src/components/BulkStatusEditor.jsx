import { useId, useMemo, useState } from 'react';
import { STATUS } from '../hooks/useTechnologies';

export default function BulkStatusEditor({ technologies, bulkSetStatus }) {
  const liveId = useId();
  const [selected, setSelected] = useState({});
  const [status, setStatus] = useState(STATUS.NOT_STARTED);
  const [msg, setMsg] = useState('');

  const selectedIds = useMemo(
    () => Object.keys(selected).filter(k => selected[k]).map(Number),
    [selected]
  );

  const toggle = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectAll = () => {
    const next = {};
    technologies.forEach(t => { next[t.id] = true; });
    setSelected(next);
  };

  const clearAll = () => setSelected({});

  const apply = () => {
    if (selectedIds.length === 0) return;
    bulkSetStatus(selectedIds, status);
    setMsg(`Статус обновлён для ${selectedIds.length} технологий.`);
    setTimeout(() => setMsg(''), 2500);
  };

  return (
    <section style={{ marginTop: 18 }}>
      <h3>Массовое редактирование статуса</h3>

      <div id={liveId} aria-live="polite" role="status" style={{ minHeight: 20 }}>
        {msg}
      </div>

      <fieldset style={{ border: '1px solid #ddd', borderRadius: 12, padding: 12 }}>
        <legend>Выберите технологии</legend>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          <button type="button" className="btn-primary" onClick={selectAll}>
            Выбрать все
          </button>
          <button type="button" className="btn-primary" onClick={clearAll}>
            Снять выбор
          </button>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          {technologies.map(t => (
            <label key={t.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={!!selected[t.id]}
                onChange={() => toggle(t.id)}
              />
              <span>{t.title}</span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            Новый статус:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={STATUS.NOT_STARTED}>Не начато</option>
              <option value={STATUS.IN_PROGRESS}>В процессе</option>
              <option value={STATUS.COMPLETED}>Завершено</option>
            </select>
          </label>

          <button
            type="button"
            className="btn-primary"
            onClick={apply}
            disabled={selectedIds.length === 0}
          >
            Применить к выбранным
          </button>
        </div>
      </fieldset>
    </section>
  );
}
