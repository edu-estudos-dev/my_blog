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

app.get('/', async (_req, res) => {
	const articles = await models.Article.findAll();
	res.render('home', { articles });
});

app.use((_req, res) => {
	res.status(404).render('404');
});

app.use((err, _req, res, _next) => {
	console.error('Erro interno:', err);
	res.status(500).render('500');
});

export default app;
