import { api } from './api';

export async function listar(apenasDisponiveis = false) {
  const params = apenasDisponiveis ? { disponivel: true } : {};
  const { data } = await api.get('/veiculos', { params });
  return data;
}

export async function criar(veiculo) {
  const { data } = await api.post('/veiculos', veiculo);
  return data;
}
