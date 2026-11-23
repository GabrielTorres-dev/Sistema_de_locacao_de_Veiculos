import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMensagem } from '../hooks/useMensagem';
import { extrairErro } from '../services/api';
import Mensagem from '../components/Mensagem';

export default function Login() {
  const { usuario, login } = useAuth();
  const location = useLocation();
  const { mensagem, mostrarErro, limpar } = useMensagem();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [enviando, setEnviando] = useState(false);

  const mensagemInicial = location.state?.sucesso
    ? { tipo: 'sucesso', texto: location.state.sucesso }
    : null;

  if (usuario) {
    return <Navigate to="/veiculos" replace />;
  }

  function alterar(evento) {
    const { name, value } = evento.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    limpar();
    setEnviando(true);

    try {
      await login(form.email, form.senha);
    } catch (erro) {
      mostrarErro(extrairErro(erro));
      setEnviando(false);
    }
  }

  return (
    <div className="card auth-card">
      <h2>Entrar</h2>
      <Mensagem mensagem={mensagem || mensagemInicial} onFechar={limpar} />
      <form onSubmit={enviar}>
        <label className="campo">
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={alterar}
            required
            autoComplete="email"
          />
        </label>
        <label className="campo">
          Senha
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={alterar}
            required
            autoComplete="current-password"
          />
        </label>
        <button type="submit" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p>
        Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}
