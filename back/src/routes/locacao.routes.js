import { Router } from 'express';
import * as locacaoController from '../controllers/locacao.controller.js';
import { autenticar } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { criarLocacaoSchema, idParamSchema } from '../validators/locacao.validator.js';

const router = Router();

router.use(autenticar);

router.post('/', validate(criarLocacaoSchema), locacaoController.criar);
router.get('/', locacaoController.listar);
router.get('/:id', validate(idParamSchema, 'params'), locacaoController.obter);
router.patch('/:id/finalizar', validate(idParamSchema, 'params'), locacaoController.finalizar);

export default router;