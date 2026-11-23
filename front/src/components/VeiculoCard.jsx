import { formatarMoeda } from '../utils/formatadores';

export default function VeiculoCard({ veiculo, onLocar }) {
  return (
    <article className="card">
      <div className="card-titulo">
        <h3>
          {veiculo.marca} {veiculo.modelo}
        </h3>
        <span className={`badge ${veiculo.disponivel ? 'badge-ok' : 'badge-alerta'}`}>
          {veiculo.disponivel ? 'Disponível' : 'Indisponível'}
        </span>
      </div>
      <p className="detalhe">
        <strong>Placa:</strong> {veiculo.placa}
      </p>
      <p className="detalhe">
        <strong>Ano:</strong> {veiculo.ano}
      </p>
      <p className="valor">{formatarMoeda(veiculo.valorDiaria)} / dia</p>
      {veiculo.disponivel && (
        <button type="button" className="botao-secundario" onClick={() => onLocar(veiculo.id)}>
          Locar este veículo
        </button>
      )}
    </article>
  );
}
