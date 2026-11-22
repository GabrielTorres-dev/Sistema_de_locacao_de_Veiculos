import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { sanitizarUsuario } from '../utils/sanitizarUsuario.js';

const SALT_ROUNDS = 10;

export async function cadastrar({ nome, email, senha }) {
  const existente = await prisma.usuario.findUnique({ where: { email } });

  if (existente) {
    throw new AppError('E-mail já cadastrado', 409);
  }

  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

  try {
    const usuario = await prisma.usuario.create({
      data: { nome, email, senhaHash }
    });
    return sanitizarUsuario(usuario);
  } catch (erro) {
    if (erro.code === 'P2002') {
      throw new AppError('E-mail já cadastrado', 409);
    }
    throw erro;
  }
}

export async function login({ email, senha }) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    throw new AppError('Credenciais inválidas', 401);
  }

  const senhaConfere = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaConfere) {
    throw new AppError('Credenciais inválidas', 401);
  }

  const token = jwt.sign({}, env.jwtSecret, {
    subject: String(usuario.id),
    expiresIn: env.jwtExpiresIn
  });

  return { token, usuario: sanitizarUsuario(usuario) };
}

export async function obterPorId(id) {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
    select: { id: true, nome: true, email: true, criadoEm: true }
  });

  if (!usuario) {
    throw new AppError('Usuário do token não encontrado', 401);
  }

  return usuario;
}