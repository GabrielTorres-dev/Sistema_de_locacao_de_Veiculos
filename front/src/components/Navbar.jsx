import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { usuario, logout } = useAuth();

  if (!usuario) return null;

  return (
    <header className="navbar">
      <strong>Locadora de Veículos</strong>
      <nav>
        <NavLink to="/veiculos">Veículos</NavLink>
        <NavLink to="/locacoes">Locações</NavLink>
      </nav>
      <div className="navbar-usuario">
        <span>{usuario.nome}</span>
        <button type="button" className="botao-secundario" onClick={logout}>
          Sair
        </button>
      </div>
    </header>
  );
}
