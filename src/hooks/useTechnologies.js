// src/hooks/useTechnologies.js
import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '', category: 'frontend' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '', category: 'frontend' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '', category: 'frontend' },
];

export const STATUS = {
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

  // циклическая смена статуса (как было)
  const updateStatus = (techId) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, status: nextStatus(tech.status) } : tech
      )
    );
  };

  // явная установка статуса (нужно для страницы /technology/:id)
  const setStatus = (techId, status) => {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === techId ? { ...tech, status } : tech))
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === techId ? { ...tech, notes: newNotes } : tech))
    );
  };

  // добавление технологии (нужно для /add-technology)
  const addTechnology = ({ title, description, category = 'frontend' }) => {
    const newTech = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      status: STATUS.NOT_STARTED,
      notes: '',
      category,
      resources: [], // ✅ добавили
    };
    setTechnologies((prev) => [newTech, ...prev]);
    return newTech.id;
  };


  // удаление (нужно для страницы деталей)
  const removeTechnology = (techId) => {
    setTechnologies((prev) => prev.filter((t) => t.id !== techId));
  };

  // как было
  const markAllCompleted = () => {
    setTechnologies((prev) => prev.map((t) => ({ ...t, status: STATUS.COMPLETED })));
  };

  const resetAllStatuses = () => {
    setTechnologies((prev) => prev.map((t) => ({ ...t, status: STATUS.NOT_STARTED })));
  };

  // полный сброс к исходному набору (удобно для /settings)
  const resetAll = () => {
    setTechnologies(initialTechnologies);
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter((t) => t.status === STATUS.COMPLETED).length;
    return Math.round((completed / technologies.length) * 100);
  };

  const updateResources = (id, resources) => {
    setTechnologies(prev =>
      prev.map(t => (t.id === id ? { ...t, resources } : t))
    );
  };

  const importTechnologies = (imported) => {
  if (!Array.isArray(imported)) {
    throw new Error('Неверный формат данных: ожидался массив');
  }

  // минимальная нормализация, чтобы не падало UI
  const normalized = imported.map((t, idx) => ({
    id: typeof t.id === 'number' ? t.id : Date.now() + idx,
    title: String(t.title ?? '').trim() || `Technology ${idx + 1}`,
    description: String(t.description ?? '').trim(),
    status: t.status ?? STATUS.NOT_STARTED,
    notes: t.notes ?? '',
    category: t.category ?? 'frontend',
    resources: Array.isArray(t.resources) ? t.resources : [],
  }));

  setTechnologies(normalized);
};

  const bulkSetStatus = (ids, status) => {
    const idsSet = new Set(ids);
    setTechnologies((prev) =>
      prev.map((tech) =>
        idsSet.has(tech.id) ? { ...tech, status } : tech
      )
    );
  };



  return {
    technologies,
    updateStatus,
    setStatus,
    updateNotes,
    addTechnology,
    removeTechnology,
    markAllCompleted,
    resetAllStatuses,
    resetAll,
    updateResources,
    importTechnologies,
    bulkSetStatus,
    progress: calculateProgress(),
  };
}
