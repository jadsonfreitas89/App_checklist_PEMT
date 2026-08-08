import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PublicRouteProps {
  children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page-placeholder">Carregando autenticação...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
