import { AppError } from '../utils/AppError.js';

export function notFound(req, res, next) {
  next(new AppError('Rota não encontrada', 404));
}

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      erro: err.message,
      detalhes: err.details
    });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }

  console.error(err);
  return res.status(500).json({ erro: 'Erro interno do servidor' });
}
