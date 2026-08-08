import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './AppLayout.css';

const navItems = [
  { path: '/', label: 'Início' },
  { path: '/checklist', label: 'Checklist' },
  { path: '/history', label: 'Histórico' },
  { path: '/settings', label: 'Configurações' }
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-shell">
      <aside className={`app-sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span>PEMT</span>
          <button type="button" onClick={() => setOpen(false)} className="sidebar-close">
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              end
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="app-main">
        <header className="app-header">
          <button className="hamburger" type="button" onClick={() => setOpen(!open)}>
            ☰
          </button>
          <div className="page-title">Sistema PEMT</div>
        </header>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
