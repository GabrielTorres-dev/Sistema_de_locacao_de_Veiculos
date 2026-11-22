import * as locacaoService from '../services/locacao.service.js';

export async function criar(req, res, next) {
  try {
    const locacao = await locacaoService.criar(req.usuario.id, req.body);
    res.status(201).json({ locacao });
  } catch (erro) {
    next(erro);
  }
}

export async function listar(req, res, next) {
  try {
    const locacoes = await locacaoService.listarDoUsuario(req.usuario.id);
    res.status(200).json({ locacoes });
  } catch (erro) {
    next(erro);
  }
}

export async function obter(req, res, next) {
  try {
    const locacao = await locacaoService.obterDoUsuario(req.usuario.id, req.params.id);
    res.status(200).json({ locacao });
  } catch (erro) {
    next(erro);
  }
}

export async function finalizar(req, res, next) {
  try {
    const locacao = await locacaoService.finalizar(req.usuario.id, req.params.id);
    res.status(200).json({ locacao });
  } catch (erro) {
    next(erro);
  }
}