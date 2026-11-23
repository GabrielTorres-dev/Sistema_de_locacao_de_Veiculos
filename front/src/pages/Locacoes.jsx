import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as locacaoService from '../services/locacaoService';
import * as veiculoService from '../services/veiculoService';
import { extrairErro } from '../services/api';
import { formatarMoeda } from '../utils/formatadores';
import { useMensagem } from '../hooks/useMensagem';
import Mensagem from '../components/Mensagem';
import LocacaoForm from '../components/LocacaoForm';
import LocacaoLista from '../components/LocacaoLista';

export default function Locacoes() {
  const location = useLocation();
  const veiculoIdInicial = location.state?.veiculoId ?? '';
  const { mensagem, mostrarSucesso, mostrarErro, limpar } = useMensagem();
  const [locacoes, setLocacoes] = useState([]);
  const [veiculosDisponiveis, setVeiculosDisponiveis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [idProcessando, setIdProcessando] = useState(null);

  const carregar = useCallback(async () => {
    try {
      const [dadosLocacoes, dadosVeiculos] = await Promise.all([
        locacaoService.listar(),
        veiculoService.listar(true)
      ]);
      setLocacoes(dadosLocacoes.locacoes);
      setVeiculosDisponiveis(dadosVeiculos.veiculos);
    } catch (erro) {
      mostrarErro(extrairErro(erro));
    } finally {
      setCarregando(false);
    }
  }, [mostrarErro]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function registrarLocacao(dados) {
    limpar();

    try {
      const resposta = await locacaoService.criar(dados);
      mostrarSucesso(
        `Locação registrada com sucesso. Valor total: ${formatarMoeda(resposta.locacao.valorTotal)}.`
      );
      await carregar();
      return true;
    } catch (erro) {
      mostrarErro(extrairErro(erro));
      await carregar();
      return false;
    }
  }

  async function finalizarLocacao(id) {
    limpar();
    setIdProcessando(id);

    try {
      const resposta = await locacaoService.finalizar(id);
      mostrarSucesso(
        `Locação finalizada com sucesso. Valor total: ${formatarMoeda(resposta.locacao.valorTotal)}.`
      );
      await carregar();
    } catch (erro) {
      mostrarErro(extrairErro(erro));
      await carregar();
    } finally {
      setIdProcessando(null);
    }
  }

  return (
    <section>
      <Mensagem mensagem={mensagem} onFechar={limpar} />
      <LocacaoForm
        veiculos={veiculosDisponiveis}
        veiculoIdInicial={veiculoIdInicial}
        onSubmit={registrarLocacao}
      />
      <div className="barra-titulo">
        <h2>Minhas locações</h2>
      </div>
      <LocacaoLista
        locacoes={locacoes}
        carregando={carregando}
        idProcessando={idProcessando}
        onFinalizar={finalizarLocacao}
      />
    </section>
  );
}
