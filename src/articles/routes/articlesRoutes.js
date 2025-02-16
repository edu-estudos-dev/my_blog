import express from 'express';
import { getAllArticles, createArticle } from '../controllers/articlesController.js';

const router = express.Router();

// Rota para listar todos os artigos
router.get('/', getAllArticles);

// Rota para criar um novo artigo
router.post('/', createArticle);

export default router;
