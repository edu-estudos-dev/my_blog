import bcrypt from 'bcrypt';
import { models } from '../../models/index.js';

class UserController {
	// Método para renderizar formulário de login
	async showFormLogin(req, res, success) {
		res.render('users/formLogin', { erro: null, success: success || null });
	}

	// Método para renderizar formulário de 1º registro
	async showFormRegister(req, res) {
		res.render('users/register', {
			erro: null,
			success: null
		});
	}

	// Método para criar usuário
	async createUser(req, res) {
		try {
			const { userName, password } = req.body;
			const lowerCaseUser = userName.toLowerCase().trim();

			if (!userName || !password) {
				return res.render('users/register', {
					erro: 'Preencha todos os campos!',
					success: null
				});
			}

			const userExists = await models.Users.findOne({
				where: { userName: lowerCaseUser }
			});

			if (userExists) {
				return res.render('users/register', {
					erro: 'Usuário já cadastrado!',
					success: null
				});
			}

			// --- BLOCO DE CRIPTOGRAFIA ---
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			// ----------------------------

			await models.Users.create({
				userName: lowerCaseUser,
				password: hashedPassword
			});

			return res.render('users/formLogin', {
				success: 'Registro concluído! Redirecionando...',
				erro: null
			});
		} catch (error) {
			console.error('Erro no registro:', error);
			return res.render('users/register', {
				erro: 'Erro interno no servidor',
				success: null
			});
		}
	}

	// Autentica credenciais e inicia sessão do usuário
	async login(req, res) {
		const { userName, password } = req.body;

		// Validação básica
		if (!userName || !password) {
			return res.render('users/formLogin', {
				erro: 'Preencha todos os campos!'
			});
		}

		try {
			const lowerCaseUser = userName.toLowerCase().trim();
			const foundUser = await models.Users.findOne({
				where: { userName: lowerCaseUser }
			});

			if (!foundUser) {
				return res.render('users/formLogin', {
					erro: 'Usuário não encontrado'
				});
			}

			// Verificação segura da senha
			const validPassword = await bcrypt.compare(password, foundUser.password);

			if (validPassword) {
				req.session.user = {
					id: foundUser.id,
					userName: foundUser.userName
				};
				return res.redirect('/');
			} else {
				return res.render('users/formLogin', {
					erro: 'Senha incorreta'
				});
			}
		} catch (error) {
			console.error('Erro de autenticação:', error);
			return res.render('users/formLogin', {
				erro: 'Erro interno no servidor'
			});
		}
	}
}

export default new UserController();
