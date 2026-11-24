import { api } from './api';

export async function cadastrar({ nome, email, senha }) {
  const { data } = await api.post('/auth/cadastro', { nome, email, senha });
  return data;
}

export async function login(email, senha) {
  const { data } = await api.post('/auth/login', { email, senha });
  return data;
}

export async function perfil() {
  const { data } = await api.get('/auth/me');
  return data;
}
