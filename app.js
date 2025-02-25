import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import articlesRouter from './src/articles/routes/articlesRoutes.js';
import categoriesRouter from './src/categories/routes/categoriesRoutes.js';
import { models } from './src/models/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(categoriesRouter);
app.use(articlesRouter);

// Rota raiz
app.get('/', async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
	const limit = 10; // Número de artigos por página
	const offset = (page - 1) * limit; // Calcula quantos artigos pular

	const { count, rows: articles } = await models.Article.findAndCountAll({
		limit: limit,
		offset: offset,
		order: [['id', 'desc']]
	});

	const totalPages = Math.ceil(count / limit); // Total de páginas
	const hasNext = page < totalPages; // Verifica se há próxima página
	const hasPrev = page > 1; // Verifica se há página anterior

	res.render('home', {
		articles,
		page,
		hasNext,
		hasPrev,
		totalPages
	});
});

app.use((_req, res) => {
	res.status(404).render('404');
});

app.use((err, _req, res, _next) => {
	console.error('Erro interno:', err);
	res.status(500).render('500');
});

export default app;
