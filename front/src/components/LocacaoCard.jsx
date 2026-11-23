
import { formatarDataHora, formatarMoeda } from '../utils/formatadores';

export default function LocacaoCard({ locacao, processando, onFinalizar }) {
  const ativa = locacao.status === 'ATIVA';

  return (
    <article className="card">
      <div className="card-titulo">
        <h3>
          {locacao.veiculo.marca} {locacao.veiculo.modelo}
        </h3>
        <span className={`badge ${ativa ? 'badge-ok' : 'badge-neutro'}`}>
          {ativa ? 'Ativa' : 'Finalizada'}
        </span>
      </div>
      <p className="detalhe">
        <strong>Placa:</strong> {locacao.veiculo.placa}
      </p>
      <p className="detalhe">
        <strong>Início:</strong> {formatarDataHora(locacao.dataInicio)}
      </p>
      <p className="detalhe">
        <strong>Devolução prevista:</strong> {formatarDataHora(locacao.dataPrevistaDevolucao)}
      </p>
      {locacao.dataDevolucao && (
        <p className="detalhe">
          <strong>Devolvido em:</strong> {formatarDataHora(locacao.dataDevolucao)}
        </p>
      )}
      <p className="valor">{formatarMoeda(locacao.valorTotal)}</p>
      {ativa && (
        <button type="button" disabled={processando} onClick={() => onFinalizar(locacao.id)}>
          {processando ? 'Finalizando...' : 'Finalizar locação'}
        </button>
      )}
    </article>
  );
}
