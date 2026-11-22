import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import * as authService from '../services/auth.service.js';

export async function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization;

  if (!cabecalho || !cabecalho.startsWith('Bearer ')) {
    return next(new AppError('Token de autenticação não informado', 401));
  }

  const token = cabecalho.slice(7);
  let payload;

  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    return next(new AppError('Token inválido ou expirado', 401));
  }

  try {
    req.usuario = await authService.obterPorId(Number(payload.sub));
    return next();
  } catch (erro) {
    return next(erro);
  }
}