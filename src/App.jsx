// src/App.jsx
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';

const STORAGE_KEY = 'techTrackerData_v1';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
      notes: '',
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'not-started',
      notes: '',
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'not-started',
      notes: '',
    },
  ]);

  // Самостоятельная работа: поиск
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect: загрузка из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTechnologies(JSON.parse(saved));
      } catch (_) {
        // если вдруг данные битые — просто игнорим
      }
    }
  }, []);

  // useEffect: сохранение в localStorage при изменениях
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(technologies));
  }, [technologies]);

  // Циклическое обновление статуса
  function updateStatus(id) {
    setTechnologies((prev) =>
      prev.map((tech) => {
        if (tech.id !== id) return tech;

        const nextStatus = {
          'not-started': 'in-progress',
          'in-progress': 'completed',
          'completed': 'not-started',
        };

        return { ...tech, status: nextStatus[tech.status] };
      })
    );
  }

  // Обновление заметок (контролируемое поле)
  function updateNotes(id, newNotes) {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === id ? { ...tech, notes: newNotes } : tech))
    );
  }

  // Фильтрация по поиску (title + description)
  const filteredTechnologies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return technologies;

    return technologies.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [technologies, searchQuery]);

  return (
    <div className="app">
      <ProgressHeader technologies={technologies} />
      <Statistics technologies={technologies} />

      {/* Поиск + количество найденных */}
      <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search__count">Найдено: {filteredTechnologies.length}</div>
      </div>

      <section className="app__list">
        {filteredTechnologies.map((tech) => (
          <TechnologyCard
            key={tech.id}
            {...tech}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
