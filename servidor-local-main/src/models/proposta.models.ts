import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { propostaType } from "../utils/types.js";

export const propostamodels = {
    async create(Proposta: propostaType): Promise<propostaType | null> {

        try {
            const query = `INSERT INTO table_proposta VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                null,
                Proposta.id_prestacao,
                Proposta.precoHora,
                Proposta.horaEstimadas,
                Proposta.estado,
                Proposta.enabled,
                new Date(),
                new Date(),
            ];
            const [rows] = await db.execute<propostaType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async apanharProposta(): Promise<propostaType[] | null> {
        try {
            const query = `SELECT * FROM table_proposta`;

            const [rows] = await db.execute<propostaType & RowDataPacket[]>(query);

            return Array.isArray(rows) ? rows as propostaType[] : null
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async deleteProposta(id: string) {
        try {
            const query = `DELETE FROM table_proposta WHERE id = ?`
            const values = [id]
            const rows = await db.execute(query, values)

            return rows
        } catch (error) {
            console.log(error)
            return error
        }
    },

    async getProposta(id: string): Promise<propostaType | null> {
        try {
            const query = `SELECT * FROM tabela_proposta WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<propostaType & RowDataPacket[]>(
                `SELECT Distinct
                pt.*,
                pr.id as awner,
                from table_propsta pt
                INNER JOIN table_prestadores pr on pt.idprestador = pr.id
                INNER JOIN table_prestadores u on pr.id_utilizador = u.id
                WHERE pt.id = ?`,

                [id]
            )
                ;
            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as propostaType : null
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async updateProposta(id: string, updateProposta: propostaType): Promise<propostaType | null> {
        try {
            const query = `UPDATE table_proposta 
        Set
        id_prestacao=?,
        precoHora=?,
        horaEstimadas=?,
        estado=?,
        enabled=?,
        updated_at=?
        WHERE
        id = ?
        ;`
            const values = [
                updateProposta.id_prestacao,
                updateProposta.precoHora,
                updateProposta.horaEstimadas,
                updateProposta.estado,
                updateProposta.enabled,
                new Date(),
                id]

            const [rows] = await db.execute<propostaType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}