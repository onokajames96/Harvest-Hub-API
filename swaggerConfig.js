const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options configuration
const options = {
    definition: {
        openapi: '3.0.0', // OpenAPI specification version
        info: {
            title: 'Harvest-Hub E-commerce API', // Title of the API documentation
            version: '1.0.0', // Version of the API
            description: 'API documentation for the Harvest Hub e-commerce App', // Description of the API
        },
        servers: [
            {
                url: 'http://localhost:5000', // Server URL
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http', // Type of security scheme
                    scheme: 'bearer', // Bearer scheme
                    bearerFormat: 'JWT', // Format of the bearer token
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to your route files for generating documentation
};

// Generate Swagger specification
const specs = swaggerJsdoc(options);

/**
 * Function to setup Swagger middleware in the Express app.
 *
 * @param {Object} app - The Express application object.
 */
module.exports = (app) => {
    // Setup the Swagger UI middleware
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
