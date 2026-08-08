import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../services/auth/AuthContext';

function getErrorMessage(error: unknown) {
  const message = typeof error === 'object' && error && 'message' in error ? (error as { message: string }).message : String(error);
  if (message.includes('user-not-found')) return 'Usuário não encontrado.';
  if (message.includes('wrong-password')) return 'Senha incorreta.';
  if (message.includes('invalid-email')) return 'E-mail inválido.';
  if (message.includes('too-many-requests')) return 'Muitas tentativas. Tente novamente mais tarde.';
  if (message.includes('user-disabled')) return 'Usuário desativado.';
  return 'Não foi possível fazer login. Verifique suas credenciais e tente novamente.';
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setIsLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setInfo(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      const message = typeof err === 'object' && err && 'message' in err ? (err as { message: string }).message : String(err);
      if (message.includes('popup-closed-by-user')) {
        setError('Login com Google cancelado pelo usuário.');
      } else {
        setError('Não foi possível entrar com Google. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError(null);
    setInfo(null);
    if (!email.trim()) {
      setError('Informe o e-mail para recuperação de senha.');
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(email.trim());
      setInfo('E-mail de recuperação enviado. Verifique sua caixa de entrada.');
    } catch (err) {
      const message = typeof err === 'object' && err && 'message' in err ? (err as { message: string }).message : String(err);
      if (message.includes('user-not-found')) {
        setError('Usuário não encontrado.');
      } else if (message.includes('invalid-email')) {
        setError('E-mail inválido.');
      } else {
        setError('Não foi possível enviar o e-mail de recuperação. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page-auth">
      <div className="card card-auth">
        <h1>Entrar</h1>
        <p>Use suas credenciais para acessar o sistema PEMT.</p>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@empresa.com" autoComplete="username" />
          </label>
          <label>
            Senha
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" autoComplete="current-password" />
          </label>
          {error && <div className="form-error">{error}</div>}
          {info && <div className="form-info">{info}</div>}
          <button type="submit" className="primary-button" disabled={isLoading}>Entrar</button>
          <button type="button" className="secondary-button" onClick={handleGoogleLogin} disabled={isLoading}>Entrar com Google</button>
          <button type="button" className="secondary-button" onClick={handleResetPassword} disabled={isLoading}>Recuperar senha</button>
        </form>
        <div className="auth-footer">
          <span>Não tem conta?</span> <Link to="/register">Cadastrar</Link>
        </div>
      </div>
    </div>
  );
}
