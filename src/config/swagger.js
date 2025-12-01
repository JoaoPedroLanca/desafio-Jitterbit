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
            },
            schemas: {
                Order: {
                    type: 'object',
                    properties: {
                        orderId: {
                            type: 'string',
                            example: 'v10089016vdb'
                        },
                        value: {
                            type: 'number',
                            example: 10000
                        },
                        creationDate: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-07-19T12:24:11.529Z'
                        },
                        items: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Item'
                            }
                        }
                    }
                },
                Item: {
                    type: 'object',
                    properties: {
                        itemId: {
                            type: 'integer',
                            example: 1
                        },
                        orderId: {
                            type: 'string',
                            example: 'v10089016vdb'
                        },
                        productId: {
                            type: 'string',
                            example: '2434'
                        },
                        quantity: {
                            type: 'integer',
                            example: 1
                        },
                        price: {
                            type: 'number',
                            example: 1000
                        }
                    }
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