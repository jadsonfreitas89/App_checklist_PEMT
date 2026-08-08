import { Link } from 'react-router-dom';

export default function SetupPage() {
  return (
    <div className="page page-placeholder">
      <div className="panel">
        <h1>Configuração da Empresa</h1>
        <p>Aqui serão definidos os dados iniciais da empresa.</p>
        <p>Essa etapa está em construção e fará parte da autenticação e onboarding.</p>
        <Link to="/">Voltar ao início</Link>
      </div>
    </div>
  );
}
