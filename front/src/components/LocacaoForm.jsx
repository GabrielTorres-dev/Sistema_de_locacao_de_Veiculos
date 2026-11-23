import { useState } from 'react';
import { formatarMoeda, paraInputDataHora } from '../utils/formatadores';

function criarEstadoInicial(veiculoIdInicial) {
  return {
    veiculoId: String(veiculoIdInicial ?? ''),
    dataInicio: paraInputDataHora(new Date()),
    dataPrevistaDevolucao: ''
  };
}

export default function LocacaoForm({ veiculos, veiculoIdInicial, onSubmit }) {
  const [form, setForm] = useState(() => criarEstadoInicial(veiculoIdInicial));
  const [enviando, setEnviando] = useState(false);

  function alterar(evento) {
    const { name, value } = evento.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setEnviando(true);

    const sucesso = await onSubmit({
      veiculoId: Number(form.veiculoId),
      dataInicio: new Date(form.dataInicio).toISOString(),
      dataPrevistaDevolucao: new Date(form.dataPrevistaDevolucao).toISOString()
    });

    setEnviando(false);

    if (sucesso) {
      setForm(criarEstadoInicial(''));
    }
  }

  return (
    <form className="card form-grid" onSubmit={enviar}>
      <h2>Registrar locação</h2>
      <label className="campo">
        Veículo disponível
        <select name="veiculoId" value={form.veiculoId} onChange={alterar} required>
          <option value="">Selecione um veículo</option>
          {veiculos.map((veiculo) => (
            <option key={veiculo.id} value={veiculo.id}>
              {veiculo.marca} {veiculo.modelo} - {veiculo.placa} ({formatarMoeda(veiculo.valorDiaria)}/dia)
            </option>
          ))}
        </select>
      </label>
      <label className="campo">
        Data de início
        <input
          type="datetime-local"
          name="dataInicio"
          value={form.dataInicio}
          onChange={alterar}
          required
        />
      </label>
      <label className="campo">
        Data prevista de devolução
        <input
          type="datetime-local"
          name="dataPrevistaDevolucao"
          value={form.dataPrevistaDevolucao}
          onChange={alterar}
          required
        />
      </label>
      <div className="acoes">
        <button type="submit" disabled={enviando || veiculos.length === 0}>
          {enviando ? 'Registrando...' : 'Registrar locação'}
        </button>
      </div>
    </form>
  );
}
