import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { categoriaDBType } from "../utils/types.js";
import { empresasmodels } from "./empresa.models.js";
import { generateUUID } from "../utils/uuid.js";
import { updateServico } from "../servico.js";

export const categoriamodels = {
    async create(categoria: categoriaDBType): Promise<categoriaDBType | null> {

        try {
            const [rows] = await db.execute<categoriaDBType & RowDataPacket[]>(
                `INSERT INTO table_categorias (
                id,
                nome_utilizador,
                email_utilizador,
                nome_servico,
                descricao,
                data_pedido,
                estado,
                urgente,
                enabled,
                created_at,
                updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,

                [
                    categoria.id ?? generateUUID(),
                    categoria.nome_utilizador,
                    categoria.email_utilizador,
                    categoria.nome_servico,
                    categoria.descricao,
                    categoria.data_pedido,
                    categoria.estado,
                    categoria.urgente,
                    categoria.enabled,
                    new Date(),
                    new Date()

                ],
            );
            console.log({ rows });
            return rows;
        } catch (err) {
            console.log(err);
            return null;


        }
    },
    async get(id: string): Promise<categoriaDBType | null> {
        try {
            const query = `SELECT * FROM table_categorias WHERE id = ?`;

            const value = [id];

            const [rows] = await db.execute<categoriaDBType & RowDataPacket[]>(query, value);
            return Array.isArray(rows) ? rows[0] as categoriaDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async getAll(): Promise<categoriaDBType[] | null> {
        try {
            const query = `SELECT * FROM table_categorias`;

            const [rows] = await db.execute<categoriaDBType[] & RowDataPacket[]>(query);
            return Array.isArray(rows) ? rows as categoriaDBType[] : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    async delete(id: string): Promise<categoriaDBType | null> {
        try {
            const query = `DELETE FROM table_categorias WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute<categoriaDBType & RowDataPacket[]>(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, updateCategoria: categoriaDBType): Promise<categoriaDBType | null> {
        try {
            const query = `UPDATE table_categorias 
        Set
        id=?,
        nome_utilizador=?,
        email_utilizador=?,
        nome_servico=?,
        descricao=?,
        data_pedido=?,
        estado=?,
        urgente=?,
        enabled=?,
        updated_at=?
        WHERE
        id = ?
        ;`
            const values = [
                updateCategoria.nome_utilizador,
                updateCategoria.email_utilizador,
                updateCategoria.nome_servico,
                updateCategoria.descricao,
                updateCategoria.data_pedido,
                updateCategoria.estado,
                updateCategoria.urgente,
                updateCategoria.enabled,
                new Date(),
                id]

const [rows] = await db.execute<categoriaDBType & RowDataPacket[]>(query, values);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}