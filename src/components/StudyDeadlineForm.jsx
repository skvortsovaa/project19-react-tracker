import { useEffect, useId, useMemo, useState } from 'react';

export default function StudyDeadlineForm({ initialValue, onSave }) {
  const startId = useId();
  const endId = useId();
  const errId = useId();

  const [startDate, setStartDate] = useState(initialValue?.startDate || '');
  const [endDate, setEndDate] = useState(initialValue?.endDate || '');
  const [touched, setTouched] = useState({ start: false, end: false });

  const errors = useMemo(() => {
    const e = {};
    if (!startDate) e.startDate = 'Укажите дату начала.';
    if (!endDate) e.endDate = 'Укажите дату окончания.';

    if (startDate && endDate) {
      const s = new Date(startDate);
      const en = new Date(endDate);
      if (Number.isNaN(s.getTime())) e.startDate = 'Некорректная дата начала.';
      if (Number.isNaN(en.getTime())) e.endDate = 'Некорректная дата окончания.';
      if (!e.startDate && !e.endDate && en < s) {
        e.endDate = 'Дата окончания не может быть раньше даты начала.';
      }
    }
    return e;
  }, [startDate, endDate]);

  const hasErrors = Object.keys(errors).length > 0;

  const submit = (e) => {
    e.preventDefault();
    setTouched({ start: true, end: true });
    if (hasErrors) return;
    onSave({ startDate, endDate });
  };

  // удобство: Enter в любом поле отправляет, ошибки сразу читаются скринридером
  useEffect(() => {}, []);

  return (
    <form onSubmit={submit} aria-describedby={errId}>
      <h3>Сроки изучения</h3>

      <div style={{ display: 'grid', gap: 10, maxWidth: 420 }}>
        <div>
          <label htmlFor={startId}>Дата начала</label>
          <input
            id={startId}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, start: true }))}
            aria-invalid={touched.start && !!errors.startDate}
            aria-describedby={touched.start && errors.startDate ? errId : undefined}
          />
        </div>

        <div>
          <label htmlFor={endId}>Дата окончания</label>
          <input
            id={endId}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, end: true }))}
            aria-invalid={touched.end && !!errors.endDate}
            aria-describedby={touched.end && errors.endDate ? errId : undefined}
          />
        </div>

        <div
          id={errId}
          role="status"
          aria-live="polite"
          style={{ minHeight: 22 }}
        >
          {(touched.start || touched.end) && hasErrors && (
            <span style={{ color: 'crimson' }}>
              {errors.startDate || errors.endDate}
            </span>
          )}
        </div>

        <button className="btn-primary" type="submit" disabled={hasErrors}>
          Сохранить сроки
        </button>
      </div>
    </form>
  );
}
