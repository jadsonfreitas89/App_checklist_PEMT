import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, profileComplete } = useAuth();
  if (loading) {
    return <div className="page-placeholder">Carregando autenticação...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!profileComplete) {
    return <Navigate to="/complete-profile" replace />;
  }
  return children;
}
