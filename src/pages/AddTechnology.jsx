import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddTechnology({ addTechnology }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newId = addTechnology({ title, description });
    navigate(`/technology/${newId}`);
  };

  return (
    <div className="page">
      <h1>Добавить технологию</h1>

      <form onSubmit={submit} style={{display:'grid', gap:10, maxWidth:520}}>
        <label>
          Название:
          <input value={title} onChange={(e)=>setTitle(e.target.value)} required
                 style={{display:'block', width:'100%', padding:'10px 12px', borderRadius:10}} />
        </label>

        <label>
          Описание:
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} required rows={4}
                    style={{display:'block', width:'100%', padding:'10px 12px', borderRadius:10}} />
        </label>

        <button className="btn-primary" type="submit">Добавить</button>
      </form>
    </div>
  );
}
