import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { prestacaoType, prestadocaoServicoDetalhadaType, categoriaDBType } from "../utils/types.js";


export const prestacaoservicomimodels = {
    async create(prestacaoservico: prestacaoType): Promise<prestacaoType | null> {
        try {
            const query =
                'INSERST INTO table_prestacao_servico VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)'

            const values = [
                null,
                prestacaoservico.disignacao,
                prestacaoservico.subtotal,
                prestacaoservico.horasEstimadas,
                prestacaoservico.id_prestador,
                prestacaoservico.id_servico,
                prestacaoservico.precoHora,
                prestacaoservico.estado,
                prestacaoservico.id_orcamento,
                prestacaoservico.enabled,
                new Date(),
                new Date(),];

            const [rows] = await db.execute<prestacaoType[] & RowDataPacket[]>(query, values);
            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as prestacaoType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async apanharPrestacaoServico(id: string): Promise<prestacaoType[] | null> {
        try {
            const [rows] = await db.execute<prestacaoType[] & RowDataPacket[]>(

                `SELECT * FROM table_prestacao_servico`,
            )
            return rows as prestacaoType[]
        } catch (error) {
            console.log(error)
            return null
        }
    },
    async deletePrestacaoServico(id: string): Promise<prestacaoType | null> {
        try {
            const query = `DELETE FROM table_prestacao_servico WHERE id = ?`
            const values = [id]

            const [rows]: any = await db.execute<prestacaoType & RowDataPacket[]>(query, values);

            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error)
            return null
        }


    },
    async getPrestacaoServico(id: string): Promise<prestacaoType | null> {
        try {
            const query = `SELECT * FROM table_prestacao_servico WHERE id = ?`;

            const value = [id];
            const [rows] = await db.execute<prestacaoType[] & RowDataPacket[]>(query, value);
            return Array.isArray(rows) && rows.length === 0 ? null : rows[0] as prestacaoType;
        } catch (error) {
            console.log(error);
            return null;
        }

    },
    async updatePrestacaoServico(id: string, updatePrestacaoServico: prestacaoType): Promise<prestacaoType | null> {

        try {
            const query = `UPDATE table_prestacao_servico 
        Set
        disignacao=?,
        subtotal=?,
        horasEstimadas=?,
        id_prestador=?,
        id_servico=?,
        precoHora=?,
        estado=?,
        id_orcamento=?,
        enabled=?,
        updated_at=?
        WHERE
        id = ?
        ;`;
            const values = [
                updatePrestacaoServico.disignacao,
                updatePrestacaoServico.subtotal,
                updatePrestacaoServico.horasEstimadas,
                updatePrestacaoServico.id_prestador,
                updatePrestacaoServico.id_servico,
                updatePrestacaoServico.precoHora,
                updatePrestacaoServico.estado,
                updatePrestacaoServico.id_orcamento,
                updatePrestacaoServico.enabled,
                new Date(),
                id,
            ];
            const [rows] = await db.execute<prestacaoType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null
        }
    },

    async getByPrestacaoServico(idPretacaoServico: string): Promise<prestacaoType[] | null> {
        try {
            const [rows] = await db.execute<prestacaoType[] & RowDataPacket[]>(
                `SELECT * FROM table_prestacao_servico 
                  WHERE table_prestacao_servico.id = ?`,
                [idPretacaoServico]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as prestacaoType[] : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async GetAllprestacaoServicoDetalhada(Limit: number, offset: number) {
        try {
            const query = `
                SELECT 
                    ps.id, as id_prestacao_servico,
                    ps.designacao as descricao,
                    u.nome as nome_utilizador,
                    u.email as email_utilizador,
                    s.nome as nome_servico,
                    ps.created_at as data_pedido,
                    ps.estado as estado,
                    ps.urgente 
                FROM table_prestacao_servicos ps
                INVER JOIN table_utilizadores u ON ps.id_utilizador = u.id
                INVER JOIN table_servicos s ON ps.id_servico = s.id
                ORDIER BY ps.created_at DESC
                LIMIT ? OFFSET ?
            `
            const [rows] = await db.execute<prestadocaoServicoDetalhadaType[] & RowDataPacket[]>(
                query,
                [
                    Limit.toString(),
                    offset.toString()
                ]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows as prestadocaoServicoDetalhadaType[] : null
        } catch (error) {
            console.log(error)
            return null
        }

    },
    
    async GetAllprestacaoServicoBycategoriaDBType(id: string) {
        try {
            const query = `SELECT * FROM table_categorias WHERE id = ?
            id,
            nome_utilizador,
            email_utilizador,
            nome_servico,
            descricao,
            data_pedido,
            estado,
            urgente
            `;
            const values = [id];
            const [rows] = await db.execute<categoriaDBType[] & RowDataPacket[]>(query, values);
            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as categoriaDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}


