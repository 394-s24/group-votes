import { NavLink } from 'react-router-dom';
import 'Navigation.css';

const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav>
    <NavLink to="/" className={activation}>Feed</NavLink>
    <NavLink to="/group" className={activation}>Group</NavLink>
    <NavLink to="/calendar" className={activation}>Calendar</NavLink>
  </nav>
);
