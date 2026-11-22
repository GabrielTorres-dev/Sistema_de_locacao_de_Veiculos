import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';

export async function criar({ marca, modelo, placa, ano, valorDiaria }) {
  const existente = await prisma.veiculo.findUnique({ where: { placa } });

  if (existente) {
    throw new AppError('Placa já cadastrada', 409);
  }

  try {
    return await prisma.veiculo.create({
      data: { marca, modelo, placa, ano, valorDiaria, disponivel: true }
    });
  } catch (erro) {
    if (erro.code === 'P2002') {
      throw new AppError('Placa já cadastrada', 409);
    }
    throw erro;
  }
}

export async function listar({ disponivel } = {}) {
  const where = disponivel === undefined ? {} : { disponivel: disponivel === 'true' };

  return prisma.veiculo.findMany({
    where,
    orderBy: { id: 'desc' }
  });
}