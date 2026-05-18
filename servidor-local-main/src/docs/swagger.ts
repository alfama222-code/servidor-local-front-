import swaggerjsdoc from "swagger-jsdoc"
import path from "path"
import { cwd } from "process"

const options: swaggerjsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API servidor local",
            description: "plataforma de gestao de prestadores de servico",
            version: "1.0.0 "
        },
        servers: {
            url: "http://localhost:8080",
            description: "dev",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],

    },


    apis: [path.join(process.cwd(), "./src/docs/schemas/*.yaml"),
    path.join(process.cwd(), "./src/docs/path/*.yaml"),
    ]


}
export const swaggerSpec = swaggerjsdoc(options);