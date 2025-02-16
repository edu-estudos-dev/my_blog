import ArticlesModel from '../models/articlesModel.js';

// Controlador para listar todos os artigos
export const getAllArticles = async (req, res) => {
    try {
        const articles = await ArticlesModel.findAll();
        res.render('articles/index', { articles });
    } catch (error) {
        res.status(500).send('Erro ao buscar artigos');
    }
};

// Controlador para criar um novo artigo
export const createArticle = async (req, res) => {
    try {
        const { title, slug, body, categoryId } = req.body;
        const article = await ArticlesModel.create({ title, slug, body, categoryId });
        res.redirect('/articles');
    } catch (error) {
        res.status(500).send('Erro ao criar artigo');
    }
};
