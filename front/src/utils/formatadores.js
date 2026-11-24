function completar(numero) {
  return String(numero).padStart(2, '0');
}

export function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarDataHora(valor) {
  return new Date(valor).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

export function paraInputDataHora(data) {
  const ano = data.getFullYear();
  const mes = completar(data.getMonth() + 1);
  const dia = completar(data.getDate());
  const hora = completar(data.getHours());
  const minuto = completar(data.getMinutes());
  return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
}
