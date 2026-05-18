import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import { catalogoServicos } from "../servico.js";
import type { dbservicoType, ServicoDetalhadaType} from "../utils/types.js";

export const servicomodels = {

    async inserirServico(servico: dbservicoType) {
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

    },


    // listar todos os serviços
    async apanharServico() {
        try {
            const query = `SELECT * FROM table_servicos`
            const rows = await db.execute(query)
            return Array.isArray(rows) && rows.length > 0 ? (rows)[0] : []
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // apagar um servico 
    async deleteServico(id: string) {
        try {
            const query = `DELETE FROM table_servicos WHERE id = ?`
            const values = [id]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return error
        }
    },
    async getServico(id: string) {
        try {
            const query = `SELECT * FROM table_servicos WHERE id = ?`
            const values = [id]
            const rows = await db.execute(query, values)
            return Array.isArray(rows) && rows.length > 0 ? (rows)[0] : null
        } catch (error) {
            console.log(error)
            return null
        }
    },
    //update de dados de um servico
    async updateServico(id: string, updateservico: dbservicoType) {
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
    },
   async getAllServicoDetalhada(Limit: number, offset: number): Promise<ServicoDetalhadaType[] | null> {
        try {
            const query = `
                SELECT DISTINCT
                    s.id as id_servico,
                    s.nome as nome_servico,
                    s.descricao as descricao_servico,
                    c.designacao as designacao_categoria,
                    c.icone as icone_categoria,
                    e.id as id_empresa,
                    e.designacao as designacao_empresa,
                    e.icone as icone_empresa,
                    s.enabled,
            FROM table_servicos s,
            INNER JOIN table_categorias c ON s.id_categoria = c.id,
            INNER JOIN table_prestacao_servico ps ON s.id = ps.id_servico,
            INNER JOIN table_empresas e ON s.id_empresa = e.id,
            WHERE s.enabled = true
            LIMIT ? OFFSET ?
        `;


            const values = [Limit.toString(), offset.toString()]


            const [rows] = await db.execute<ServicoDetalhadaType[] & RowDataPacket[]>(
                query,
                values
            );
            return Array.isArray(rows) ? (rows as ServicoDetalhadaType[]) : null;

        } catch (error) {
            console.error("error ao buscar servicos detalhadas,error")
            return null

        }
    }
}