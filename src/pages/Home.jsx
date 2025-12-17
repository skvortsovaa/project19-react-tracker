import ProgressHeader from '../components/ProgressHeader';
import Statistics from '../components/Statistics';

export default function Home({ technologies }) {
  return (
    <div className="page">
      <ProgressHeader technologies={technologies}  />
      <Statistics technologies={technologies} />
      <p style={{ opacity: 0.85 }}>
        Это SPA-приложение: навигация работает без перезагрузки.
      </p>
    </div>
  );
}
