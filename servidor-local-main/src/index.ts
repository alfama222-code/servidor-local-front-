import express, { type Request, type Response } from "express"
import {router as servicoRouter} from "./routes/servico.route.js"
import {router as orcamentoRouter} from "./routes/orcamento.route.js"
import {router as prestadorRouter} from "./routes/prestador.route.js"
import {router as userRouter} from "./routes/users.route.js"
import {router as propostaRouter} from "./routes/proposta.router.js"
import {router as pretacaoservicorouter} from "./routes/prestacaoservico.router.js"
import { swaggerSpec } from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server"
import {resolvers} from "./graphql/index.js"
import {typeDefs} from "./graphql/index.js"
import { expressMiddleware } from "@as-integrations/express5"
import cors from "cors"




const app = express()
app.use(express.json())
dotenv.config()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use("/servico",servicoRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/prestador",prestadorRouter) 
app.use("/users", userRouter)
app.use("/proposta",propostaRouter )
app.use("/prestacaoservico",pretacaoservicorouter)


const graphqlserver = new ApolloServer({
  typeDefs,
  resolvers,
})

await graphqlserver.start()

app.use("/graphql", expressMiddleware(graphqlserver,{
  context: async({req}) =>({
    token: req?.headers?.authorization,
  }),
})
)




app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})


app.listen(8080, () => {
  console.log("Server running on port 8080")
})


