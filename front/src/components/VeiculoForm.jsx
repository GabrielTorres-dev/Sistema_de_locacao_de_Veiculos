import { useState } from 'react';

const estadoInicial = { marca: '', modelo: '', placa: '', ano: '', valorDiaria: '' };

export default function VeiculoForm({ onSubmit }) {
  const [form, setForm] = useState(estadoInicial);
  const [enviando, setEnviando] = useState(false);

  function alterar(evento) {
    const { name, value } = evento.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setEnviando(true);
    const sucesso = await onSubmit(form);
    setEnviando(false);

    if (sucesso) {
      setForm(estadoInicial);
    }
  }

  return (
    <form className="card form-grid" onSubmit={enviar}>
      <h2>Cadastrar veículo</h2>
      <label className="campo">
        Marca
        <input type="text" name="marca" value={form.marca} onChange={alterar} required />
      </label>
      <label className="campo">
        Modelo
        <input type="text" name="modelo" value={form.modelo} onChange={alterar} required />
      </label>
      <label className="campo">
        Placa
        <input
          type="text"
          name="placa"
          value={form.placa}
          onChange={alterar}
          maxLength={8}
          placeholder="ABC1D23"
          required
        />
      </label>
      <label className="campo">
        Ano
        <input type="number" name="ano" value={form.ano} onChange={alterar} required />
      </label>
      <label className="campo">
        Valor da diária (R$)
        <input
          type="number"
          name="valorDiaria"
          value={form.valorDiaria}
          onChange={alterar}
          min="0.01"
          step="0.01"
          required
        />
      </label>
      <div className="acoes">
        <button type="submit" disabled={enviando}>
          {enviando ? 'Salvando...' : 'Cadastrar veículo'}
        </button>
      </div>
    </form>
  );
}
