import { Link, useNavigate, useParams } from 'react-router-dom';
import TechnologyNotes from '../components/TechnologyNotes';

export default function TechnologyDetail({ technologies, setStatus, updateNotes, removeTechnology }) {
  const { techId } = useParams();
  const navigate = useNavigate();

  const id = Number(techId);
  const tech = technologies.find(t => t.id === id);

  if (!tech) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn-primary">← Назад к списку</Link>
      </div>
    );
  }

  const del = () => {
    if (confirm('Удалить технологию?')) {
      removeTechnology(id);
      navigate('/technologies');
    }
  };

  return (
    <div className="page">
      <Link to="/technologies" className="btn-link">← Назад к списку</Link>
      <h1 style={{marginTop:10}}>{tech.title}</h1>

      <div style={{marginTop:12}}>
        <h3>Описание</h3>
        <p style={{opacity:.85}}>{tech.description}</p>
      </div>

      <div style={{marginTop:12}}>
        <h3>Статус изучения</h3>
        <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
          <button className={tech.status==='not-started' ? 'status-btn active' : 'status-btn'} onClick={() => setStatus(id, 'not-started')}>Не начато</button>
          <button className={tech.status==='in-progress' ? 'status-btn active' : 'status-btn'} onClick={() => setStatus(id, 'in-progress')}>В процессе</button>
          <button className={tech.status==='completed' ? 'status-btn active' : 'status-btn'} onClick={() => setStatus(id, 'completed')}>Завершено</button>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <TechnologyNotes techId={id} notes={tech.notes || ''} onNotesChange={updateNotes} />
      </div>

      <div style={{marginTop:14}}>
        <button className="btn-danger" onClick={del}>Удалить</button>
      </div>
    </div>
  );
}
