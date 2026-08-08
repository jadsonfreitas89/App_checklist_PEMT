import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../services/auth/AuthContext';

function getErrorMessage(error: unknown) {
  const message = typeof error === 'object' && error && 'message' in error ? (error as { message: string }).message : String(error);
  if (message.includes('email-already-in-use')) return 'E-mail já cadastrado.';
  if (message.includes('invalid-email')) return 'E-mail inválido.';
  if (message.includes('weak-password')) return 'Senha fraca. Use pelo menos 6 caracteres.';
  return 'Não foi possível criar a conta. Verifique os dados e tente novamente.';
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setIsLoading(true);

    try {
      await register(email.trim(), password);
      navigate('/complete-profile');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page-auth">
      <div className="card card-auth">
        <h1>Registrar</h1>
        <p>Criar um usuário novo com o mesmo modelo de autenticação do Android.</p>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@empresa.com" autoComplete="email" />
          </label>
          <label>
            Senha
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" autoComplete="new-password" />
          </label>
          <label>
            Confirmar senha
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="********" autoComplete="new-password" />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="primary-button" disabled={isLoading}>Registrar</button>
        </form>
        <div className="auth-footer">
          <span>Já tem conta?</span> <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
}
