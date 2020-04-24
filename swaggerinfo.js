const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "fleet hawks API's",
      description: "This is a sample server for a pet store.",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.example.com/support",
        email: "support@example.com",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [{
      BearerAuth: [],
    }],
    servers: [
      {
        url: "https://development.gigantic-server.com/v1",
        description: "Development server",
      },
      {
        url: "https://staging.gigantic-server.com/v1",
        description: "Staging server",
      },
      {
        url: "https://api.gigantic-server.com/v1",
        description: "Production server",
      },
    ],
  },
  apis: ["dist/services/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
console.log(JSON.stringify(swaggerSpec, null, 4));
const fs = require("fs");
const YAML = require("json-to-pretty-yaml");
fs.writeFileSync(
  "src/config/swagger.yaml",
  YAML.stringify(swaggerSpec, null, 4),
  "utf-8"
);
fs.writeFileSync(
  "src/config/swagger.json",
  JSON.stringify(swaggerSpec, null, 4),
  "utf-8"
);
