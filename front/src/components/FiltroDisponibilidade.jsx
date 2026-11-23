export default function FiltroDisponibilidade({ valor, onChange }) {
  return (
    <label className="campo">
      Filtrar veículos
      <select value={valor} onChange={(evento) => onChange(evento.target.value)}>
        <option value="todos">Todos</option>
        <option value="disponiveis">Somente disponíveis</option>
      </select>
    </label>
  );
}
