import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as veiculoService from '../services/veiculoService';
import { extrairErro } from '../services/api';
import { useMensagem } from '../hooks/useMensagem';
import Mensagem from '../components/Mensagem';
import VeiculoForm from '../components/VeiculoForm';
import VeiculoLista from '../components/VeiculoLista';
import FiltroDisponibilidade from '../components/FiltroDisponibilidade';

export default function Veiculos() {
  const navigate = useNavigate();
  const { mensagem, mostrarSucesso, mostrarErro, limpar } = useMensagem();
  const [veiculos, setVeiculos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);

    try {
      const dados = await veiculoService.listar(filtro === 'disponiveis');
      setVeiculos(dados.veiculos);
    } catch (erro) {
      mostrarErro(extrairErro(erro));
    } finally {
      setCarregando(false);
    }
  }, [filtro, mostrarErro]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function criarVeiculo(dados) {
    limpar();

    try {
      const resposta = await veiculoService.criar(dados);
      mostrarSucesso(`Veículo ${resposta.veiculo.placa} cadastrado com sucesso.`);
      await carregar();
      return true;
    } catch (erro) {
      mostrarErro(extrairErro(erro));
      return false;
    }
  }

  function locar(veiculoId) {
    navigate('/locacoes', { state: { veiculoId } });
  }

  return (
    <section>
      <Mensagem mensagem={mensagem} onFechar={limpar} />
      <VeiculoForm onSubmit={criarVeiculo} />
      <div className="barra-titulo">
        <h2>Frota</h2>
        <FiltroDisponibilidade valor={filtro} onChange={setFiltro} />
      </div>
      <VeiculoLista veiculos={veiculos} carregando={carregando} onLocar={locar} />
    </section>
  );
}
