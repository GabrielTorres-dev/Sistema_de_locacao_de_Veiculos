import VeiculoCard from './VeiculoCard';

export default function VeiculoLista({ veiculos, carregando, onLocar }) {
  if (carregando) {
    return <p className="vazio">Carregando veículos...</p>;
  }

  if (veiculos.length === 0) {
    return <p className="vazio">Nenhum veículo encontrado.</p>;
  }

  return (
    <div className="lista">
      {veiculos.map((veiculo) => (
        <VeiculoCard key={veiculo.id} veiculo={veiculo} onLocar={onLocar} />
      ))}
    </div>
  );
}
