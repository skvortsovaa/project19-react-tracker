// src/components/QuickActions.jsx
import { useMemo, useState } from 'react';
import Modal from './Modal';
import './QuickActions.css';

export default function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
  const [isExportOpen, setIsExportOpen] = useState(false);

  const exportJson = useMemo(() => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies,
    };
    return JSON.stringify(data, null, 2);
  }, [technologies]);

  const handleExport = () => {
    console.log('Экспорт данных:', exportJson);
    setIsExportOpen(true);
  };

  const download = () => {
    const blob = new Blob([exportJson], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technologies-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="quick-actions">
      <h3 className="quick-actions__title">Быстрые действия</h3>

      <div className="quick-actions__buttons">
        <button className="qa-btn qa-btn--success" onClick={onMarkAllCompleted}>
          ✅ Отметить все как выполненные
        </button>
        <button className="qa-btn qa-btn--warning" onClick={onResetAll}>
          🔄 Сбросить все статусы
        </button>
        <button className="qa-btn qa-btn--info" onClick={handleExport}>
          📤 Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Экспорт данных"
      >
        <p style={{ marginTop: 0 }}>
          Данные подготовлены. Можно скачать JSON или посмотреть в консоли.
        </p>

        <div className="qa-export">
          <button className="qa-btn qa-btn--info" onClick={download}>
            Скачать technologies-export.json
          </button>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary>Показать JSON</summary>
          <pre className="qa-pre">{exportJson}</pre>
        </details>
      </Modal>
    </section>
  );
}
