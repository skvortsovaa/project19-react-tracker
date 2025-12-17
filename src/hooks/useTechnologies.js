// src/hooks/useTechnologies.js
import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '', category: 'frontend' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '', category: 'frontend' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '', category: 'frontend' },
];

const STATUS = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
};

function nextStatus(current) {
  if (current === STATUS.NOT_STARTED) return STATUS.IN_PROGRESS;
  if (current === STATUS.IN_PROGRESS) return STATUS.COMPLETED;
  return STATUS.NOT_STARTED;
}

export default function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, status: nextStatus(tech.status) } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === techId ? { ...tech, notes: newNotes } : tech))
    );
  };

  const markAllCompleted = () => {
    setTechnologies((prev) => prev.map((t) => ({ ...t, status: STATUS.COMPLETED })));
  };

  const resetAllStatuses = () => {
    setTechnologies((prev) => prev.map((t) => ({ ...t, status: STATUS.NOT_STARTED })));
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter((t) => t.status === STATUS.COMPLETED).length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    progress: calculateProgress(),
  };
}
