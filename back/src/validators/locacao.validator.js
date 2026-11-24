import { z } from 'zod';

const data = (mensagem) =>
  z.coerce.date({ errorMap: () => ({ message: mensagem }) });

export const criarLocacaoSchema = z.object({
  veiculoId: z.coerce
    .number({ invalid_type_error: 'Veículo inválido' })
    .int('Veículo inválido')
    .positive('Veículo inválido'),
  dataInicio: data('Data de início inválida'),
  dataPrevistaDevolucao: data('Data prevista de devolução inválida')
});

export const idParamSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'Identificador inválido' })
    .int('Identificador inválido')
    .positive('Identificador inválido')
});