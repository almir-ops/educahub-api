const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a categoria', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'O nome da categoria é obrigatório' });
    }

    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a categoria', error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    if (!name) {
      return res.status(400).json({ message: 'O nome da categoria é obrigatório' });
    }

    category.name = name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a categoria', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
  
      if (!category) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }
  
      await category.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar a categoria', error: error.message });
    }
  };
  

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
