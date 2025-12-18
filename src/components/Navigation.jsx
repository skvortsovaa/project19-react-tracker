import { NavLink } from 'react-router-dom';
import './Navigation.css';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '../theme/ThemeContext';

export default function Navigation() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <NavLink to="/" className="nav-brand__link">
          🚀 Трекер технологий
        </NavLink>
      </div>

      <ul className="nav-menu">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Главная</NavLink></li>
        <li><NavLink to="/technologies" className={({ isActive }) => isActive ? 'active' : ''}>Все технологии</NavLink></li>
        <li><NavLink to="/add-technology" className={({ isActive }) => isActive ? 'active' : ''}>Добавить</NavLink></li>
        <li><NavLink to="/statistics" className={({ isActive }) => isActive ? 'active' : ''}>Статистика</NavLink></li>
        <li><NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Настройки</NavLink></li>
        <li><NavLink to="/api-users" className={({ isActive }) => isActive ? 'active' : ''}>API</NavLink></li>
        <li><NavLink to="/api-tech-search" className={({ isActive }) => isActive ? 'active' : ''}>Поиск (API)</NavLink></li>
        <li><NavLink to="/import-roadmaps" className={({ isActive }) => isActive ? 'active' : ''}>Импорт Roadmaps</NavLink></li>
      </ul>

      <div className="nav-actions">
        <IconButton
          onClick={toggleTheme}
          aria-label="Переключить тему"
          title="Переключить тему"
          size="small"
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </div>
    </nav>
  );
}

