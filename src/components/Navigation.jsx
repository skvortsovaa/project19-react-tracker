import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <NavLink to="/" className="nav-brand__link">🚀 Трекер технологий</NavLink>
      </div>

      <ul className="nav-menu">
        <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Главная</NavLink></li>
        <li><NavLink to="/technologies" className={({isActive}) => isActive ? 'active' : ''}>Все технологии</NavLink></li>
        <li><NavLink to="/add-technology" className={({isActive}) => isActive ? 'active' : ''}>Добавить</NavLink></li>
        <li><NavLink to="/statistics" className={({isActive}) => isActive ? 'active' : ''}>Статистика</NavLink></li>
        <li><NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''}>Настройки</NavLink></li>
      </ul>
    </nav>
  );
}
