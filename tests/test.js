const request = require('supertest');
const { app } = require('../src/index'); // Ajuste para usar a exportação correta
const { sequelize } = require('../src/config/db');
const Post = require('../src/models/Post');
const Category = require('../src/models/Category');

beforeAll(async () => {
  await sequelize.sync({ force: false });
});

afterAll(async () => {
  await sequelize.close();
})

describe('CRUD para /api/categories', () => {
  let categoryId;

  afterAll(async () => {
    // Remove apenas a categoria criada neste teste
    if (categoryId) {
      await Category.destroy({ where: { id: categoryId } });
    }
  });


  it('deve criar uma nova categoria', async () => {
    const response = await request(app)
      .post('/api/categories')
      .send({ name: 'Portugues' });

    categoryId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Portugues');
  });

  it('deve retornar todos as categorias', async () => {
    const response = await request(app)
      .get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deve atualizar uma categoria', async () => {
    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({ name: 'Literatura' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Literatura');
  });

  it('deve retornar 404 ao tentar atualizar uma categoria inexistente', async () => {
    const response = await request(app)
      .put('/api/categories/9999')
      .send({ name: 'Inexistente' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Categoria não encontrada'); // Ajustado aqui
  });

  it('deve deletar a categoria', async () => {
    const response = await request(app)
      .delete(`/api/categories/${categoryId}`);

    expect(response.status).toBe(204);
  });

  it('deve retornar 404 ao tentar recuperar uma categoria que foi deletada', async () => {
    const response = await request(app)
      .get(`/api/categories/${categoryId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Categoria não encontrada'); // Ajustado aqui
  });

  
});

describe('CRUD para /api/posts', () => {
  let postId;
  let categoryId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/categories')
      .send({ name: 'Portugues' });

    categoryId = response.body.id;
  });
  
  afterAll(async () => {
    if (postId) {
      await Post.destroy({ where: { id: postId } });
    }
    if (categoryId) {
      await Category.destroy({ where: { id: categoryId } });
    }
  });

  it('deve criar um novo post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Meu Primeiro Post',
        content: 'Conteúdo do meu primeiro post.',
        author: 'John Doe',
        categoryId: categoryId, // Usando a categoria criada anteriormente
      });

    postId = response.body.id; // Guarda o ID do post criado para os outros testes

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Meu Primeiro Post');
  });

  it('deve retornar 400 se tentar atualizar um post com categoria inválida', async () => {
    const response = await request(app)
      .put(`/api/posts/${postId}`)
      .send({
        title: 'Outro Post',
        content: 'Conteúdo do outro post.',
        author: 'John Doe',
        categoryId: 9999, // ID inválido
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Categoria não encontrada');
  });

  it('deve deletar o post', async () => {
    const response = await request(app)
      .delete(`/api/posts/${postId}`);

    expect(response.status).toBe(204);
  });

  it('deve retornar 404 ao tentar recuperar um post que foi deletado', async () => {
    const response = await request(app)
      .get(`/api/posts/${postId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Post não encontrado'); // Alterado para 'message'
  });

  it('deve retornar 400 se os campos obrigatórios não forem fornecidos', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({}); // Campos obrigatórios ausentes

    expect(response.status).toBe(400);
  });

  it('deve retornar 400 se a categoria não existir', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Post Inexistente',
        content: 'Conteúdo do post inexistente.',
        author: 'John Doe',
        categoryId: 9999, // ID inválido
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Categoria não encontrada');
  });


});
