import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const DIA = 24 * 60 * 60 * 1000;

const veiculosExemplo = [
  { marca: 'Chevrolet', modelo: 'Onix', placa: 'ABC1D23', ano: 2022, valorDiaria: '150.00' },
  { marca: 'Hyundai', modelo: 'HB20', placa: 'DEF4G56', ano: 2023, valorDiaria: '130.00' },
  { marca: 'Fiat', modelo: 'Mobi', placa: 'GHI7J89', ano: 2021, valorDiaria: '110.00' },
  { marca: 'Volkswagen', modelo: 'T-Cross', placa: 'JKL0M12', ano: 2024, valorDiaria: '220.00' },
  { marca: 'Toyota', modelo: 'Corolla', placa: 'NOP3Q45', ano: 2023, valorDiaria: '260.00' }
];

async function main() {
  const senhaHash = await bcrypt.hash('123456', 10);

  const usuario = await prisma.usuario.upsert({
    where: { email: 'demo@locadora.com' },
    update: {},
    create: { nome: 'Usuário Demonstração', email: 'demo@locadora.com', senhaHash }
  });

  const veiculos = [];
  for (const dados of veiculosExemplo) {
    const veiculo = await prisma.veiculo.upsert({
      where: { placa: dados.placa },
      update: {},
      create: dados
    });
    veiculos.push(veiculo);
  }

  const totalLocacoes = await prisma.locacao.count();

  if (totalLocacoes === 0) {
    const agora = Date.now();

    await prisma.locacao.create({
      data: {
        usuarioId: usuario.id,
        veiculoId: veiculos[0].id,
        dataInicio: new Date(agora - 5 * DIA),
        dataPrevistaDevolucao: new Date(agora - 2 * DIA),
        dataDevolucao: new Date(agora - 2 * DIA),
        valorTotal: new Prisma.Decimal('450.00'),
        status: 'FINALIZADA'
      }
    });

    await prisma.locacao.create({
      data: {
        usuarioId: usuario.id,
        veiculoId: veiculos[1].id,
        dataInicio: new Date(agora - DIA),
        dataPrevistaDevolucao: new Date(agora + 2 * DIA),
        valorTotal: new Prisma.Decimal('390.00'),
        status: 'ATIVA'
      }
    });

    await prisma.veiculo.update({
      where: { id: veiculos[1].id },
      data: { disponivel: false }
    });
  }
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
