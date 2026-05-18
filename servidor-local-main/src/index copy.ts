import express, { type Request, type Response } from "express"
import { adicionarServico, apagarServico, apanharServico, listarServicos, obterServico, updateServico } from "./servico.js"
import { calcularOrcamento, criarPrestadoresDeServico, selecionarServicos, selecionarPrestador, apagarPrestadorDeServico, editarPrestadorDeServico } from "./orcamento.js"
import { getUserById, getUsers } from "./users.js"
import { novoUsuario } from './users.js';
import type { dbservicoType, ServicoType, usuarioType } from "./utils/types.js"
import { inserirServico } from "./servico.js"
import { isDate } from "node:util/types"
import { formatDate } from "./utils/date.js"


const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

// rota para adicionar um serviço nov
app.post("/adicionar-servico", (req: Request, res: Response) => {
  const novoServico = req.body

  const addServicoResponse = adicionarServico(novoServico)

  res.json(addServicoResponse)
})

// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
  const listServicoResponse = listarServicos()

  res.json(listServicoResponse)
})

// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const apagarServicoResponse = apagarServico(nome as string)

    res.json(apagarServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})

// rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const obterServicoResponse = obterServico(nome as string)

    res.json(obterServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})

// rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
  const { nome } = req.body

  const selecinarServicoResponse = selecionarServicos(nome as string)

  res.json(selecinarServicoResponse)
})

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
  const { pedido } = req.body

  const calcularOrcamentoresponse = calcularOrcamento(pedido)

  res.json(calcularOrcamentoresponse)
})



app.post("/selecionar-prestador", (req: Request, res: Response) => {
  const { novoPrestador } = req.body

  const selecionarPrestadorResponse = criarPrestadoresDeServico(novoPrestador)

  res.json(selecionarPrestadorResponse)
})

app.post("/criar-prestador", (req: Request, res: Response) => {
  const { novoPrestador } = req.body

  const criarPrestadorResponse = criarPrestadoresDeServico(novoPrestador)

  res.json(criarPrestadorResponse)
})

app.delete("/apagar-prestador", (req: Request, res: Response) => {
  const { nomePrestador } = req.query

  if (nomePrestador) {
    const apagarPrestadorResponse = apagarPrestadorDeServico(nomePrestador as string)

    res.json(apagarPrestadorResponse)
  } else {
    res.json({
      message: "Nome do prestador e obrigatorio"
    })
  }
})

app.post("/editar-prestador", (req: Request, res: Response) => {
  const { nomePrestador, novosDadosDoPrestador } = req.body

  if (nomePrestador && novosDadosDoPrestador) {
    const editarPrestadorResponse = editarPrestadorDeServico(nomePrestador as string, novosDadosDoPrestador)

    res.json(editarPrestadorResponse)
  }
})

app.get("/get-users", async (req: Request, res: Response) => {
  const getusersResponse = await getUsers()

  res.json(getusersResponse)
})


app.get("/get-users-by-id", async (req: Request, res: Response) => {
  const { id } = req.query

  if (id) {
    const getUserByIdResponse = await getUserById(id as string)

    if (!getUserByIdResponse) {
      res.status(404).json({
        status: "success",
        message: "Usuario nao encontrado",
        data: null
      })
    }
    res.status(200).json({
      status: "success",
      message: "Usuario encontrado",
      data: getUserByIdResponse
    })


  } else {
    res.json({
      message: "ID do usuário é obrigatório"
    })
  }
})


//rota para novo usuario
app.post("/novo-usuario", async (req: Request, res: Response) => {
  const usuario: usuarioType = req.body
  console.log({ "usuario index.ts": usuario })
  const novoUsuarioResponse = await novoUsuario(usuario!)

  res.json(novoUsuarioResponse)
}
)
//rota para insiri servico

app.post("/inserir-servico", async (req: Request, res: Response) => {
  const servico: dbservicoType = req.body
  console.log("servico inserido")
  const inserirServicoResponse = await inserirServico(servico!)
  res.json(inserirServicoResponse)
})

                                                             


app.get("/apanharServico", async (req: Request, res: Response) => {
  const apanharServicoResponse = await apanharServico()

  res.json(apanharServicoResponse)
})

app.put("/update-servico-by-id/:id", async (req: Request, res: Response) => {

  const { id } = req.params
  const updateservico: dbservicoType = req.body

  if (!id) {
    return res.status(400).json({
      status: "error",
      mensagem: "ID obrigatorio",
      data: null
    })
  }

  if (!updateservico) {
    return res.status(400).json({
      status: "error",
      mensagem: "Dados de servico invalidos",
      data: null
    })
  }
  const updateServicoResponse = await updateServico(id as string, updateservico)

  if (!updateServicoResponse) {
    return res.status(500).json({
      status: "error",
      mensagem: "Erro ao atualizar servico",
      data: null
    })
  }
  return res.status(200).json({
    status: "success",
    mensagem: "Servico atualizado com sucesso",
    data: updateServicoResponse
  })
}
)


app.delete("/apagar-servico-by-id/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({
      status: "error",
      mensagem: "ID obrigatorio",
      data: null
    })
  }
  const apagarServicoResponse = await apagarServico(id as string)
  if (!apagarServicoResponse) {
    return res.status(500).json({
      status: "error",
      mensagem: "Erro ao apagar servico",
      data: null
    })
  }
  return res.status(200).json({
    status: "success",
    mensagem: "Servico apagado com sucesso",
    data: apagarServicoResponse
  })
})


app.listen(8080, () => {
  console.log("Server running on port 8080")
})


