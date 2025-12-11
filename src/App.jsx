// src/App.jsx
import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX',
      status: 'not-started',
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'not-started',
    },
  ]);

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

  return (
    <div className="app">
      <ProgressHeader technologies={technologies} />

      <Statistics technologies={technologies} />

      <section className="app__list">
        {technologies.map((tech) => (
          <TechnologyCard
            key={tech.id}
            {...tech}
            onStatusChange={updateStatus}
          />
        ))}
      </section>
    </div>
  );
}

export default App;


