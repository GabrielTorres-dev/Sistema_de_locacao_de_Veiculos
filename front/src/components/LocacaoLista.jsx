import LocacaoCard from './LocacaoCard';

export default function LocacaoLista({ locacoes, carregando, idProcessando, onFinalizar }) {
  if (carregando) {
    return <p className="vazio">Carregando locações...</p>;
  }

  if (locacoes.length === 0) {
    return <p className="vazio">Você ainda não possui locações.</p>;
  }

  return (
    <div className="lista">
      {locacoes.map((locacao) => (
        <LocacaoCard
          key={locacao.id}
          locacao={locacao}
          processando={idProcessando === locacao.id}
          onFinalizar={onFinalizar}
        />
      ))}
    </div>
  );
}
