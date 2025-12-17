// src/App.jsx
import { useMemo, useState } from 'react';
import './App.css';

import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';
import QuickActions from './components/QuickActions';

import useTechnologies from './hooks/useTechnologies';

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    progress,
  } = useTechnologies();

  // (поиск из 21-й можно оставить — он не мешает и полезен)
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
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
      <ProgressHeader technologies={technologies} progress={progress} />

      <Statistics technologies={technologies} />

      <QuickActions
        technologies={technologies}
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
      />

      <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search__count">Найдено: {filtered.length}</div>
      </div>

      <section className="app__list">
        {filtered.map((tech) => (
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
