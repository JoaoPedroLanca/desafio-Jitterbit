const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Pedidos - Jitterbit Challenge',
            version: '1.0.0',
            description: 'API REST para gerenciamento de pedidos com autenticação JWT',
            contact: {
                name: 'Desenvolvedor',
                email: 'dev@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Insira o token JWT no formato: Bearer {token}'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'] // Caminhos para arquivos com anotações
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };