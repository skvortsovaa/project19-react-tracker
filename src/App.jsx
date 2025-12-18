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
import ApiUsersPage from './pages/ApiUsersPage';
import ApiTechnologySearchPage from './pages/ApiTechnologySearchPage';
import RoadmapImportPage from './pages/RoadmapImportPage';
import { useState } from 'react';
import AppSnackbar from './components/AppSnackbar';
import Box from '@mui/material/Box';




export default function App() {
  const {
    technologies,
    updateStatus,
    setStatus,
    updateNotes,
    addTechnology,
    removeTechnology,
    resetAll,
    updateResources,
    importTechnologies,
    bulkSetStatus,
  } = useTechnologies();
    const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <div className="app">
        <Navigation />

        <main
          className="main-content"
          style={{ maxWidth: 980, margin: '0 auto', padding: '18px 16px' }}
        >
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
                  updateResources={updateResources}
                />
              }
            />

            <Route path="/add-technology" element={<AddTechnology addTechnology={addTechnology} />} />

            <Route path="/statistics" element={<StatisticsPage technologies={technologies} />} />

            <Route
              path="/settings"
              element={
                <SettingsPage
                  resetAll={resetAll}
                  technologies={technologies}
                  importTechnologies={importTechnologies}
                  bulkSetStatus={bulkSetStatus}
                  showSnackbar={showSnackbar}
                />
              }
            />

            <Route path="/api-users" element={<ApiUsersPage />} />
            <Route path="/api-tech-search" element={<ApiTechnologySearchPage />} />
            <Route
              path="/import-roadmaps"
              element={<RoadmapImportPage technologies={technologies} addTechnology={addTechnology} />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      </div>
    </Box>
  );

}
