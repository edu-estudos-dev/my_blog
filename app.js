import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import articlesRouter from './src/articles/routes/articlesRoutes.js';
import categoriesRouter from './src/categories/routes/categoriesRoutes.js';
import { models } from './src/models/index.js';
import usersRouter from './src/users/routes/usersRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(
	session({
		secret: 'seuSegredoAqui',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false } // Altere para true em produção com HTTPS
	})
);

app.use(categoriesRouter);
app.use(articlesRouter);
app.use('/users', usersRouter);

// Rota raiz
app.get('/', async (req, res) => {
	if (!req.session.user) {
		return res.redirect('/users/login');
	}
	const page = parseInt(req.query.page) || 1;
	const limit = 10;
	const offset = (page - 1) * limit;
	try {
		const { count, rows: articles } = await models.Article.findAndCountAll({
			limit: limit,
			offset: offset,
			order: [['id', 'desc']]
		});
		const totalPages = Math.ceil(count / limit);
		const hasNext = page < totalPages;
		const hasPrev = page > 1;
		res.render('home', {
			articles,
			page,
			hasNext,
			hasPrev,
			totalPages,
			user: req.session.user // Passe o usuário para a view
		});
	} catch (error) {
		console.error('Erro ao carregar artigos:', error);
		res.status(500).render('500');
	}
});
app.use((_req, res) => {
	res.status(404).render('404');
});

app.use((err, _req, res, _next) => {
	console.error('Erro interno:', err);
	res.status(500).render('500');
});

export default app;
