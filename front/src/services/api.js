import axios from 'axios';

export const TOKEN_KEY = 'locadora_token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const status = erro.response?.status;
    const rotaLogin = erro.config?.url?.startsWith('/auth/login');

    if (status === 401 && !rotaLogin && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event('auth:expirada'));
    }

    return Promise.reject(erro);
  }
);

export function extrairErro(erro) {
  const dados = erro.response?.data;

  if (dados?.detalhes?.length) {
    return dados.detalhes.map((detalhe) => detalhe.mensagem).join(' | ');
  }

  return dados?.erro || 'Não foi possível comunicar com o servidor';
}
