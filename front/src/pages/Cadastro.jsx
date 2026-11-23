
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMensagem } from '../hooks/useMensagem';
import * as authService from '../services/authService';
import { extrairErro } from '../services/api';
import Mensagem from '../components/Mensagem';

export default function Cadastro() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const { mensagem, mostrarErro, limpar } = useMensagem();
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [enviando, setEnviando] = useState(false);

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
      await authService.cadastrar(form);
      navigate('/login', {
        state: { sucesso: 'Cadastro realizado com sucesso. Faça login para continuar.' }
      });
    } catch (erro) {
      mostrarErro(extrairErro(erro));
      setEnviando(false);
    }
  }

  return (
    <div className="card auth-card">
      <h2>Criar conta</h2>
      <Mensagem mensagem={mensagem} onFechar={limpar} />
      <form onSubmit={enviar}>
        <label className="campo">
          Nome
          <input type="text" name="nome" value={form.nome} onChange={alterar} required />
        </label>
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
            minLength={6}
            autoComplete="new-password"
          />
        </label>
        <button type="submit" disabled={enviando}>
          {enviando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p>
        Já possui conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
