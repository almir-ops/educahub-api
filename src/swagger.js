const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Educahub API',
    version: '1.0.0',
    description: 'API para a plataforma EducaHub',
  },
  tags: [
    {
      name: 'Posts', 
      description: 'Endpoints para manipular os posts',
    },
  ],
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
    {
      url: 'https://educahub-api.onrender.com/',
      description: 'Production server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
