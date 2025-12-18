import { useRef, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import StudyDeadlineForm from '../components/StudyDeadlineForm';
import BulkStatusEditor from '../components/BulkStatusEditor';


export default function SettingsPage({ resetAll, technologies, importTechnologies, bulkSetStatus, showSnackbar}) {
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef(null);
  const [studyPlan, setStudyPlan] = useLocalStorage('studyPlan', { startDate: '', endDate: '' });


  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showSnackbar('Экспорт выполнен успешно', 'success');
    } catch {
      showSnackbar('Ошибка экспорта данных', 'error');
    }
  };


  const readJsonFile = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        importTechnologies(imported);

        showSnackbar(
          `Импортировано ${Array.isArray(imported) ? imported.length : 0} технологий`,
          'success'
        );
      } catch {
        showSnackbar('Ошибка импорта: неверный формат файла', 'error');
      }
    };


    reader.readAsText(file);
  };

  const importFromJSON = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    readJsonFile(file);

    // чтобы можно было импортировать тот же файл повторно
    event.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      showSnackbar('Можно импортировать только JSON-файлы', 'warning');
      return;
    }


    readJsonFile(file);
  };

  const handleReset = () => {
    if (confirm('Сбросить все данные к исходным?')) {
      resetAll();
      showSnackbar('Все данные сброшены', 'info');
    }
  };


  return (
    <div className="page">
      <h1>Настройки</h1>

      <StudyDeadlineForm
        initialValue={studyPlan}
        onSave={(v) => {
          setStudyPlan(v);
          setStatus('Сроки сохранены');
          setTimeout(() => setStatus(''), 3000);
        }}
      />

              <BulkStatusEditor
          technologies={technologies}
          bulkSetStatus={bulkSetStatus}
        />


      {status && (
        <div style={{ marginTop: 12 }} role="alert">
          {status}
        </div>
      )}

      <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={exportToJSON}>
          Экспорт в JSON
        </button>

        <button className="btn-primary" onClick={() => fileRef.current?.click()}>
          Импорт из JSON
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={importFromJSON}
          style={{ display: 'none' }}
        />

        <button className="btn-danger" onClick={handleReset}>
          Сбросить все
        </button>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 12,
          border: '2px dashed #999',
          opacity: isDragging ? 1 : 0.85,
        }}
      >
        Перетащи сюда JSON-файл для импорта
      </div>
    </div>
  );
}
