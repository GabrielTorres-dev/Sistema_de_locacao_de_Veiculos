export default function Mensagem({ mensagem, onFechar }) {
  if (!mensagem) return null;

  return (
    <div className={`mensagem mensagem-${mensagem.tipo}`} role="alert">
      <span>{mensagem.texto}</span>
      <button type="button" onClick={onFechar} aria-label="Fechar mensagem">
        ×
      </button>
    </div>
  );
}
