
import { NOMEM } from "node:dns";
import db from "./lib/db.js";
import { type dbservicoType, type ResponseType, type ServicoType } from "./utils/types.js"

export let catalogoServicos: ServicoType[] = []

// adicionar um serviço novo
export function adicionarServico(novoServico: ServicoType): ResponseType {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return ({
            status: false,
            message: "Erro: Nome obrigatório e preço deve ser maior que zero.",
            data: null,
        });
    }

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return ({
                status: false,
                message: `Erro: O serviço '${novoServico.nome}' já existe.`,
                data: null,
            });
        }
    }

    catalogoServicos.push(novoServico);

    return ({
        status: true,
        message: "Sucesso: Serviço adicionado!",
        data: novoServico,
    });
}

// listar todos os serviços
export function listarServicos(): ServicoType[] {
    // TODO: implementar fetch de servicos

    return catalogoServicos
}

// apagar um servico 
export function apagarServico(nome: string): boolean {
    // TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}
export async function apanharServico() {
    try {
        const query = `SELECT * FROM table_servicos`
        const rows = await db.execute(query)
        return Array.isArray(rows) && rows.length > 0 ? (rows)[0] : []
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function inserirServico(servico: dbservicoType) {
    console.log("servicos inserido")
    try {
        const rows = await db.execute(
            `INSERT INTO table_servicos VALUES (?, ?, ?, ?, ?, ?) `,

            [null, servico.nome, servico.descricao, servico.categoria, new Date(), new Date()]
        )
        return rows
    } catch (error) {
        console.log(error)
        return error

    }

}
//update de dados de um servico
export async function updateServico(id: string, updateservico: dbservicoType) {
    try {
        const query = `UPDATE table_servicos 
        Set
              nome=?,
              descricao=?,
              categoria=?,
              enabled=?,
              updated_at=?
        WHERE
        id = ?
        ;`
        const values = [updateservico.nome,
        updateservico.descricao,
        updateservico.categoria,
        new Date(),
            id]

    } catch (error) {
        console.log(error)
        return error
    }
}


export async function deleteServico(id: string) {
    try {
        const query = `DELETE FROM table_servicos WHERE id = ?`
        const values = [id]
        const rows = await db.execute(query, values)

        return rows
        } catch (error) {
        console.log(error)
        return error
    }
}