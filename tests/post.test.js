const request = require('supertest');
const { app } = require('../src/index'); // Ajuste para usar a exportação correta
const { sequelize } = require('../src/config/db');
const Post = require('../src/models/Post');
const Category = require('../src/models/Category');

beforeAll(async () => {
  // Limpa o banco de dados e cria as tabelas necessárias para os testes
  await sequelize.sync({ force: true });

  // Criação de uma categoria para os testes
  await Category.create({ name: 'Portugues' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('POST /api/posts', () => {
  it('deve criar um novo post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Meu Primeiro Post',
        content: 'Conteúdo do meu primeiro post.',
        author: 'John Doe',
        categoryId: 1, // ID da categoria criada no beforeAll
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Meu Primeiro Post');
  });

  it('deve retornar 400 se os campos obrigatórios não forem fornecidos', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: '',
        content: 'Conteúdo do post.',
        author: 'John Doe',
        categoryId: 1,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Todos os campos são obrigatórios');
  });

  it('deve retornar 400 se a categoria não existir', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Outro Post',
        content: 'Conteúdo do outro post.',
        author: 'John Doe',
        categoryId: 9999, // ID que não existe
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Categoria não encontrada');
  });
});
