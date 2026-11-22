import * as veiculoService from '../services/veiculo.service.js';

export async function criar(req, res, next) {
  try {
    const veiculo = await veiculoService.criar(req.body);
    res.status(201).json({ veiculo });
  } catch (erro) {
    next(erro);
  }
}

export async function listar(req, res, next) {
  try {
    const veiculos = await veiculoService.listar(req.query);
    res.status(200).json({ veiculos });
  } catch (erro) {
    next(erro);
  }
}