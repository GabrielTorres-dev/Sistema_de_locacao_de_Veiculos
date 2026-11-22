import { Router } from 'express';
import * as veiculoController from '../controllers/veiculo.controller.js';
import { autenticar } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { criarVeiculoSchema, listarVeiculosSchema } from '../validators/veiculo.validator.js';

const router = Router();

router.use(autenticar);

router.post('/', validate(criarVeiculoSchema), veiculoController.criar);
router.get('/', validate(listarVeiculosSchema, 'query'), veiculoController.listar);

export default router;