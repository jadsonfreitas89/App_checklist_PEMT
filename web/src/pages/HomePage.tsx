import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="page page-dashboard">
      <section className="hero-card">
        <div>
          <p className="eyebrow">PEMT</p>
          <h1>Monitoramento de inspeções</h1>
          <p>Plataforma web inicial para registrar e consultar inspeções de PEMT com foco em campo e desktop.</p>
        </div>
      </section>

      <section className="quick-actions">
        <Link className="action-card" to="/checklist">
          <h2>Novo checklist</h2>
          <p>Iniciar serviço de inspeção.</p>
        </Link>
        <Link className="action-card" to="/history">
          <h2>Histórico</h2>
          <p>Consultar inspeções anteriores.</p>
        </Link>
        <Link className="action-card" to="/settings">
          <h2>Configurações</h2>
          <p>Acessar preferências e conta.</p>
        </Link>
      </section>
    </div>
  );
}
