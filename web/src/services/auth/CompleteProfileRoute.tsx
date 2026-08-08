import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface CompleteProfileRouteProps {
  children: JSX.Element;
}

export default function CompleteProfileRoute({ children }: CompleteProfileRouteProps) {
  const { user, loading, profileComplete } = useAuth();

  if (loading) {
    return <div className="page-placeholder">Carregando autenticação...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profileComplete) {
    return <Navigate to="/" replace />;
  }

  return children;
}
