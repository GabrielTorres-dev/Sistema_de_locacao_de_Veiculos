import { z } from 'zod';

const email = z
  .string({ required_error: 'E-mail é obrigatório' })
  .trim()
  .toLowerCase()
  .email('E-mail inválido');

export const cadastroSchema = z.object({
  nome: z
    .string({ required_error: 'Nome é obrigatório' })
    .trim()
    .min(2, 'Nome deve ter ao menos 2 caracteres')
    .max(120, 'Nome deve ter no máximo 120 caracteres'),
  email,
  senha: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'Senha deve ter ao menos 6 caracteres')
    .max(72, 'Senha deve ter no máximo 72 caracteres')
});

export const loginSchema = z.object({
  email,
  senha: z.string({ required_error: 'Senha é obrigatória' }).min(1, 'Senha é obrigatória')
});
