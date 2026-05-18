import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestadorType } from "../utils/types.js";

export const prestadormodels = {
    async create(Prestador: PrestadorType): Promise<PrestadorType | null> {

        try {
            const query = `
                INSERT INTO tabela_prestadores (
                    id,
                    nif,
                    profissao,
                    taxaUrgencia,
                    minimoParaDesconto,
                    percentagemDesconto,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                Prestador.id ?? crypto.randomUUID(),
                Prestador.nif,
                Prestador.profissao,
                Prestador.taxaUrgencia,
                Prestador.minimoParaDesconto,
                Prestador.percentagemDesconto,
                Prestador.enabled,
                new Date(),
                new Date(),
            ];

            const [rows] = await db.execute<PrestadorType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async apanharPrestador(id: string): Promise<PrestadorType | null> {
        try {
            const query = `SELECT * FROM table_prestador where id=?`

            const values = [id];
            const [rows] = await db.execute<PrestadorType & RowDataPacket[]>(query, values);
            return Array.isArray(rows) ? rows[0] as PrestadorType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async deletePrestador(id: string): Promise<PrestadorType | null> {
        try {
            const query = `DELETE FROM tabela_prestadores WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute<PrestadorType & RowDataPacket[]>(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<PrestadorType | null> {
        try {
            const query = ` SELECT * FROM tabela_prestadores WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<PrestadorType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) ? rows[0] as PrestadorType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async updatePrestador(id: string, updatePrestador: PrestadorType): Promise<PrestadorType | null> {
        try {
            const query = `UPDATE table_prestador 
            Set
                nif=?,
                profissao=?,
                taxaUrgencia=?,
                minimoParaDesconto=?,
                percentagemDesconto=?,
                enabled=?,
                update=?,
            WHRRE 
                 id=?
                 ;`;

            const values = [

                updatePrestador.nif,
                updatePrestador.profissao,
                updatePrestador.taxaUrgencia,
                updatePrestador.minimoParaDesconto,
                updatePrestador.percentagemDesconto,
                updatePrestador.enabled,
                new Date(),
                id]

         const [rows] = await db.execute<PrestadorType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }

}
}
