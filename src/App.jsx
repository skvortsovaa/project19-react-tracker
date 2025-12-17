import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';

import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';

import useTechnologies from './hooks/useTechnologies';

export default function App() {
  const {
    technologies,
    updateStatus,
    setStatus,
    updateNotes,
    addTechnology,
    removeTechnology,
    resetAll,
  } = useTechnologies();

  return (
    <div className="app">
      <Navigation />

      <main className="main-content" style={{maxWidth: 980, margin: '0 auto', padding: '18px 16px'}}>
        <Routes>
          <Route path="/" element={<Home technologies={technologies} />} />
          <Route path="/technologies" element={<TechnologyList technologies={technologies} />} />
          <Route
            path="/technology/:techId"
            element={
              <TechnologyDetail
                technologies={technologies}
                setStatus={setStatus}
                updateNotes={updateNotes}
                removeTechnology={removeTechnology}
              />
            }
          />
          <Route path="/add-technology" element={<AddTechnology addTechnology={addTechnology} />} />

          {/* самостоятельная */}
          <Route path="/statistics" element={<StatisticsPage technologies={technologies} />} />
          <Route path="/settings" element={<SettingsPage resetAll={resetAll} />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
