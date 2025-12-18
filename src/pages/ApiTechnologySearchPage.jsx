import { useEffect, useRef, useState } from 'react';

export default function ApiTechnologySearchPage() {
  const [items, setItems] = useState([]);          // результаты
  const [searchTerm, setSearchTerm] = useState(''); // текст в инпуте
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // таймер debounce и контроллер отмены
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const searchTechnologies = async (query) => {
    // отменяем предыдущий запрос
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // пустой запрос — очистка результатов
      if (!query.trim()) {
        setItems([]);
        setLoading(false);
        return;
      }

      // Используем dummyjson как “каталог технологий” (по сути — поиск по API)
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setItems(data.products || []);
    } catch (err) {
      // AbortError НЕ показываем как ошибку (это нормальная отмена)
      if (err.name !== 'AbortError') {
        setError(err.message || 'Ошибка запроса');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // debounce: сбрасываем предыдущий таймер
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // ставим новый таймер на 500мс
    searchTimeoutRef.current = setTimeout(() => {
      searchTechnologies(value);
    }, 500);
  };

  // очистка при размонтировании (важно!)
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return (
    <div>
      <h1>Поиск технологий (API)</h1>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Введите технологию (например: react, node, css)..."
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ccc' }}
        />
        {loading && <span title="Загрузка">⌛</span>}
      </div>

      {error && (
        <div style={{ padding: 12, borderRadius: 8, border: '1px solid #f5b5b5', marginBottom: 14 }}>
          Ошибка: {error}
        </div>
      )}

      {!loading && !error && searchTerm.trim() && items.length === 0 && (
        <p>Ничего не найдено.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {items.map((it) => (
          <div key={it.id} style={{ border: '1px solid #e6e6e6', borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{it.title}</div>
            <div style={{ opacity: 0.85, fontSize: 14, marginBottom: 8 }}>{it.description}</div>
            <div style={{ fontSize: 13, opacity: 0.75 }}>
              Категория: <b>{it.category}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
