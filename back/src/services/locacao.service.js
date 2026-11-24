import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { calcularValor } from '../utils/calcularValor.js';

const incluirVeiculo = {
  veiculo: {
    select: {
      id: true,
      marca: true,
      modelo: true,
      placa: true,
      ano: true,
      valorDiaria: true,
      disponivel: true
    }
  }
};

export async function criar(usuarioId, { veiculoId, dataInicio, dataPrevistaDevolucao }) {
  if (dataPrevistaDevolucao <= dataInicio) {
    throw new AppError('A data prevista de devolução deve ser posterior à data de início', 400);
  }

  return prisma.$transaction(async (tx) => {
    const veiculo = await tx.veiculo.findUnique({ where: { id: veiculoId } });

    if (!veiculo) {
      throw new AppError('Veículo não encontrado', 404);
    }

    const reserva = await tx.veiculo.updateMany({
      where: { id: veiculoId, disponivel: true },
      data: { disponivel: false }
    });

    if (reserva.count === 0) {
      throw new AppError('Veículo indisponível para locação', 409);
    }

    const { valorTotal } = calcularValor(veiculo.valorDiaria, dataInicio, dataPrevistaDevolucao);

    return tx.locacao.create({
      data: {
        usuarioId,
        veiculoId,
        dataInicio,
        dataPrevistaDevolucao,
        valorTotal,
        status: 'ATIVA'
      },
      include: incluirVeiculo
    });
  });
}

export async function listarDoUsuario(usuarioId) {
  return prisma.locacao.findMany({
    where: { usuarioId },
    include: incluirVeiculo,
    orderBy: { id: 'desc' }
  });
}

export async function obterDoUsuario(usuarioId, id) {
  const locacao = await prisma.locacao.findUnique({
    where: { id },
    include: incluirVeiculo
  });

  if (!locacao) {
    throw new AppError('Locação não encontrada', 404);
  }

  if (locacao.usuarioId !== usuarioId) {
    throw new AppError('Você não tem permissão para acessar esta locação', 403);
  }

  return locacao;
}

export async function finalizar(usuarioId, id) {
  return prisma.$transaction(async (tx) => {
    const locacao = await tx.locacao.findUnique({ where: { id } });

    if (!locacao) {
      throw new AppError('Locação não encontrada', 404);
    }

    if (locacao.usuarioId !== usuarioId) {
      throw new AppError('Você não tem permissão para finalizar esta locação', 403);
    }

    const encerramento = await tx.locacao.updateMany({
      where: { id, status: 'ATIVA' },
      data: { status: 'FINALIZADA', dataDevolucao: new Date() }
    });

    if (encerramento.count === 0) {
      throw new AppError('Locação já finalizada', 409);
    }

    await tx.veiculo.update({
      where: { id: locacao.veiculoId },
      data: { disponivel: true }
    });

    return tx.locacao.findUnique({
      where: { id },
      include: incluirVeiculo
    });
  });
}