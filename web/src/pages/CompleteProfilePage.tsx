import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth/AuthContext';
import { getCompanies, saveUserProfile, type UserProfile } from '../firebase/firebaseProfile';

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const { user, profile, loading, profileComplete, refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    getCompanies().then((items) => {
      setCompanies(items);
    });
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    setName(profile.nome || '');
    if (profile.empresaId && profile.empresaId !== 'EMAIL_PENDING' && profile.empresaId !== 'GOOGLE_PENDING') {
      setCompanyId(profile.empresaId);
    }
  }, [profile]);

  useEffect(() => {
    if (!loading && profileComplete) {
      navigate('/');
    }
  }, [loading, profileComplete, navigate]);

  if (loading) {
    return (
      <div className="page page-placeholder">
        <div className="panel">Carregando dados do perfil...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page page-placeholder">
        <div className="panel">Autenticação necessária para completar o perfil.</div>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);

    if (!name.trim()) {
      setError('Informe o nome completo.');
      return;
    }
    if (!companyId) {
      setError('Selecione a empresa responsável.');
      return;
    }

    const selectedCompany = companies.find((company) => company.id === companyId);
    if (!selectedCompany) {
      setError('Empresa selecionada inválida.');
      return;
    }

    setIsSaving(true);
    try {
      const updatedProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        nome: name.trim(),
        empresaId: selectedCompany.id,
        empresaNome: selectedCompany.name,
        telefone: profile?.telefone,
        cpf: profile?.cpf,
        cargo: profile?.cargo,
        perfil: profile?.perfil,
        fotoPerfil: profile?.fotoPerfil,
        crea: profile?.crea,
        ativo: profile?.ativo,
        emailVerificado: profile?.emailVerificado,
        tipoLogin: profile?.tipoLogin,
        ultimoLogin: profile?.ultimoLogin,
        criadoEm: profile?.criadoEm,
        atualizadoEm: Date.now(),
        deviceId: profile?.deviceId,
        versaoApp: profile?.versaoApp
      };

      await saveUserProfile(updatedProfile);
      setInfo('Perfil atualizado com sucesso. Redirecionando...');
      await refreshProfile();
      navigate('/');
    } catch (err) {
      setError('Falha ao salvar o perfil. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page page-auth">
      <div className="card card-auth">
        <h1>Completar Perfil</h1>
        <p>Termine seu cadastro para acessar o sistema.</p>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            E-mail
            <input type="email" value={user.email} disabled />
          </label>
          <label>
            Nome completo
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome completo" />
          </label>
          <label>
            Empresa
            <select value={companyId} onChange={(event) => setCompanyId(event.target.value)}>
              <option value="">Selecione a empresa</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </label>
          {error && <div className="form-error">{error}</div>}
          {info && <div className="form-info">{info}</div>}
          <button type="submit" className="primary-button" disabled={isSaving}>Salvar perfil</button>
        </form>
        {companies.length === 0 && (
          <div className="form-info">Nenhuma empresa ativa encontrada. Verifique se há empresas cadastradas no Firebase.</div>
        )}
      </div>
    </div>
  );
}
