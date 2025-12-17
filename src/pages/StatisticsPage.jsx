export default function StatisticsPage({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  const pct = (n) => total === 0 ? 0 : Math.round((n / total) * 100);

  const bars = [
    { label: 'Не начато', value: notStarted, percent: pct(notStarted) },
    { label: 'В процессе', value: inProgress, percent: pct(inProgress) },
    { label: 'Завершено', value: completed, percent: pct(completed) },
  ];

  return (
    <div className="page">
      <h1>Статистика</h1>

      <div style={{display:'grid', gap:10, maxWidth:560}}>
        {bars.map(b => (
          <div key={b.label} style={{display:'grid', gap:6}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
              <span>{b.label}</span>
              <span style={{opacity:.8}}>{b.value} ({b.percent}%)</span>
            </div>
            <div style={{height:12, background:'#e5e7eb', borderRadius:999, overflow:'hidden'}}>
              <div style={{height:'100%', width:`${b.percent}%`, background:'#22c55e'}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
