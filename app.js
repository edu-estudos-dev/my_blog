import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import categoriesRouter from './src/categories/routes/categoriesRoutes.js';
import articlesRouter from './src/articles/routes/articlesRoutes.js';

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

app.get('/', (_req, res) => {
	res.render('home');
});

app.use((_req, res) => {
	res.status(404).render('404');
});

app.use((err, _req, res, _next) => {
	console.error('Erro interno:', err);
	res.status(500).render('500');
});

export default app;
