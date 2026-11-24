import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';
import { TOKEN_KEY } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function verificarSessao() {
      if (!localStorage.getItem(TOKEN_KEY)) {
        setCarregando(false);
        return;
      }

      try {
        const dados = await authService.perfil();
        if (ativo) setUsuario(dados.usuario);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    verificarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    const aoExpirar = () => setUsuario(null);
    window.addEventListener('auth:expirada', aoExpirar);
    return () => window.removeEventListener('auth:expirada', aoExpirar);
  }, []);

  const login = useCallback(async (email, senha) => {
    const dados = await authService.login(email, senha);
    localStorage.setItem(TOKEN_KEY, dados.token);
    setUsuario(dados.usuario);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({ usuario, carregando, login, logout }),
    [usuario, carregando, login, logout]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
