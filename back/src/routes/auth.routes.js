import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { autenticar } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { cadastroSchema, loginSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/cadastro', validate(cadastroSchema), authController.cadastrar);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', autenticar, authController.perfil);

export default router;