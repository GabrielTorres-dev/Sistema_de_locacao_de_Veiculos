import { z } from 'zod';

export const criarVeiculoSchema = z.object({
  marca: z
    .string({ required_error: 'Marca é obrigatória' })
    .trim()
    .min(1, 'Marca é obrigatória')
    .max(60, 'Marca deve ter no máximo 60 caracteres'),
  modelo: z
    .string({ required_error: 'Modelo é obrigatório' })
    .trim()
    .min(1, 'Modelo é obrigatório')
    .max(60, 'Modelo deve ter no máximo 60 caracteres'),
  placa: z
    .string({ required_error: 'Placa é obrigatória' })
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida')
    .transform((valor) => valor.replace('-', '')),
  ano: z.coerce
    .number({ invalid_type_error: 'Ano inválido' })
    .int('Ano deve ser um número inteiro')
    .min(1900, 'Ano inválido')
    .max(new Date().getFullYear() + 1, 'Ano inválido'),
  valorDiaria: z.coerce
    .number({ invalid_type_error: 'Valor da diária inválido' })
    .positive('Valor da diária deve ser maior que zero')
    .max(99999999, 'Valor da diária excede o limite permitido')
});

export const listarVeiculosSchema = z.object({
  disponivel: z.enum(['true', 'false'], { message: 'Filtro disponivel deve ser true ou false' }).optional()
});