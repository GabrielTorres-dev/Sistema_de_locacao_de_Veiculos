import { Prisma } from '@prisma/client';

const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

export function calcularDiarias(dataInicio, dataPrevistaDevolucao) {
  const diferenca = dataPrevistaDevolucao.getTime() - dataInicio.getTime();
  return Math.ceil(diferenca / MILISSEGUNDOS_POR_DIA);
}

export function calcularValor(valorDiaria, dataInicio, dataPrevistaDevolucao) {
  const diarias = calcularDiarias(dataInicio, dataPrevistaDevolucao);
  const valorTotal = new Prisma.Decimal(valorDiaria).mul(diarias);
  return { diarias, valorTotal };
}