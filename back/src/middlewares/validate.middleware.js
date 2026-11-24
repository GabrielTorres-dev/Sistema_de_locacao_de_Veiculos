import { AppError } from '../utils/AppError.js';

export function validate(schema, origem = 'body') {
  return (req, res, next) => {
    const resultado = schema.safeParse(req[origem]);

    if (!resultado.success) {
      const detalhes = resultado.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message
      }));
      return next(new AppError('Dados inválidos', 400, detalhes));
    }

    req[origem] = resultado.data;
    return next();
  };
}
