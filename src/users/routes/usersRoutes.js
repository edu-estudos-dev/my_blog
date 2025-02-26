import express from 'express';
import UserControllers from '../controllers/usersController.js';

const userRouter = express.Router();

// rota para renderizar o formulario de login
userRouter.get('/login', UserControllers.showFormLogin);

// rota para renderizar o formulario de 1º registro
userRouter.get('/register', UserControllers.showFormRegister);

// rota de registro de usuario
userRouter.post('/register', UserControllers.createUser);

// Rota para autenticar credenciais de login
userRouter.post('/', UserControllers.login)
export default userRouter;
