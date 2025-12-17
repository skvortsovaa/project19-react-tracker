export default function SettingsPage({ resetAll }) {
  const reset = () => {
    if (confirm('Сбросить данные трекера к исходным?')) resetAll();
  };

  return (
    <div className="page">
      <h1>Настройки</h1>
      <p style={{opacity:.85}}>Управление приложением (сброс данных).</p>
      <button className="btn-danger" onClick={reset}>Сбросить данные</button>
    </div>
  );
}
