// src/components/TechnologyNotes.jsx
export default function TechnologyNotes({ techId, notes, onNotesChange }) {
  return (
    <div className="notes">
      <h4 className="notes__title">Мои заметки:</h4>

      <textarea
        className="notes__textarea"
        rows={3}
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
      />

      <div className="notes__hint">
        {notes?.length ? `Сохранено (${notes.length} символов)` : 'Добавьте заметку'}
      </div>
    </div>
  );
}
