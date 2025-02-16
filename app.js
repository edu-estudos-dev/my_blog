import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import articlesRoutes from './src/articles/routes/articlesRoutes.js';
import categoriesRoutes from './src/categories/routes/categoriesRoutes.js';
import connection from './src/database/connection.js';

const app = express();

// Definir o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurando o View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configurando arquivos estáticos
app.use(express.static('public'));

// Configuração para ler dados JSON
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/articles', articlesRoutes);
app.use('/categories', categoriesRoutes);

export default app;
