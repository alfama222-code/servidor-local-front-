import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js"
import type { EmpresaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import { get } from "node:http";

export const empresasmodels = { 
    async create(empresa: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(
                `INSERT INTO table_empresas (
                    id,
                    designacao,
                    descricao,
                    nif,
                    icone,
                    id_utilizador,
                    localizacao,
                    enabled,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                empresa.id ?? generateUUID(),
                empresa.designacao,
                empresa.descricao,
                empresa.nif,
                empresa.icone,
                empresa.id_utilizador,
                empresa.localizacao,
                empresa.enabled,
                new Date(),
                new Date

            ],
            );
            console.log({ rows });
            return rows;
        }catch (err) {
            console.log(err);
            return null;
        }
    },
async get(id: string): Promise<EmpresaDBType | null> {
    try {
        const query = `SELECT * FROM table_empresas WHERE id = ?`;

        const value = [id];

        const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, value);
        return Array.isArray(rows) ? rows[0] as EmpresaDBType : null;
    } catch (error) {
        console.log(error);
        return null;
    }
},
async getAll(): Promise<EmpresaDBType[] | null> {
    try {
        const query = `SELECT * FROM table_empresas`;

        const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(query);
        return Array.isArray(rows) ? rows as EmpresaDBType[] : null;
    } catch (error) {
        console.log(error);
        return null;
    }
},
async delete(id: string): Promise<EmpresaDBType | null> {
    try {
        const query = `SELECT *FROM table_empresas WHERE id = ?`;

        const value = [id];

const [rows]: any = await db.execute<EmpresaDBType & RowDataPacket[]>(query, value);
return rows?.affectedRows === 0 ? null : rows;
    } catch (error) {
        console.log(error);
        return null;
    }
},
async update(id: string, updateEmpresa: EmpresaDBType): Promise<EmpresaDBType | null> {
    try {
        const query = `UPDATE table_empresas 
        Set
         id=?,
         designacao=?,
         descricao=?,
         nif=?,
         icone=?,
         id_utilizador=?,
         localizacao=?,
         enabled=?,
         updated_at=?
        WHERE
        id = ?
        ;`
         const values = [
            updateEmpresa.designacao,
            updateEmpresa.descricao,
            updateEmpresa.nif,
            updateEmpresa.icone,
            updateEmpresa.id_utilizador,
            updateEmpresa.localizacao,
            updateEmpresa.enabled,
            new Date(),
            id]

        const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(query, values);
        return rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}
} 