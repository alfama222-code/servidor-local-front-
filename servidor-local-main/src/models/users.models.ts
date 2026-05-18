import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../utils/date.js"
import { hashPassword } from "../utils/password.js"
import type { dbservicoType, PrestadorType, usuarioType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"



export const usersmodels = {

    async iserirUsers(user: usuarioType): Promise<usuarioType | null> {
        try {
            const [rows] = await db.execute<usuarioType & RowDataPacket[]>(
                `INSERT INTO table_utilizadores (
                    id,
                    nome,
                    numero_identificacao,
                    data_nascimento,
                    email,
                    telefone,
                    pais,
                    localidade,
                    password,
                    enabled,
                    created_at,
                    update_at,
                    role
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    user.nome,
                    user.numero_identificacao,
                    formatDateDDMMYYYY(user.data_nascimento),
                    user.email,
                    user.telefone,
                    user.pais,
                    user.localidade,
                    await hashPassword(user.password),
                    user.enabled,
                    new Date(),
                    new Date(),
                    user.role
                ],
            );
            console.log({ rows });
            return rows;
        } catch (err) {
            console.log(err);
            return null;
        }
    },


    async apanharServico(): Promise<usuarioType[] | null> {
        try {
            // 1. Corrigido: Adicionado o sinal de '='
            const query = "SELECT * FROM tabela_utilizadores";

            // 2. Corrigido: O Generic deve ser um Array de (usuarioType & RowDataPacket)
            // Isso diz que cada linha retornada segue sua interface e a do MySQL
            const [rows] = await db.execute<(usuarioType & RowDataPacket)[]>(query);

            // 3. Verificação de segurança
            if (!rows || rows.length === 0) {
                return []; // Ou null, dependendo da sua preferência
            }

            return rows;
        } catch (err) {
            console.error("Erro ao apanhar serviço:", err);
            return null;
        }
    },
    async getByEmail(email: string): Promise<usuarioType | null> {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM table_utilizadores 
                  WHERE table_utilizadores.email = ?`,
                [email]
            )


            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as usuarioType : null
        } catch (error) {
            console.log(error)
            return null
        }

    },

    async delete(id: string): Promise<usuarioType | null> {
        try {
            const query = ` DELETE FROM tabela_utilizadores WHERE id = ?`;

            const value = [id];

            const [rows]: any = await db.execute(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async get(id: string): Promise<usuarioType | null> {
        console.log("getUserById", id);

        try {
            const [rows] = await db.execute(
                `SELECT * FROM tabela_utilizadores 
        WHERE tabela_utilizadores.id = ?`,

                [id],
            );

            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as usuarioType : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    },



    async updateServico(id: string, userupdate: usuarioType): Promise<usuarioType | null> {
        try {
            const query = `UPDATE table_utilizadores 
        Set
              nome=?,
             numero_identificacao=?,
             data_nascimento=?,
             email=?,
             telefone=?,
             pais=?,
             localidade=?,
             password=?,
             enabled=?,
             updated_at=?
        WHERE
        id = ?
        ;`
            const values = [
                userupdate.nome,
                userupdate.numero_identificacao,
                userupdate.data_nascimento,
                userupdate.email,
                userupdate.telefone,
                userupdate.pais,
                userupdate.localidade,
                userupdate.password,
                userupdate.enabled,
                new Date(),
                id]

            const [rows] = await db.execute<PrestadorType & RowDataPacket[]>(query, values)
            return rows[0] as usuarioType
        } catch (err) {
            console.log(err)
            return null
        }

    },
    async resetPassword(id: string, newPassword: string): Promise<usuarioType | null> {
        try {
            const query = `UPDATE table_utilizadores 
        Set
              password=?
        WHERE
        id = ?
        `;
            const [result] = await db.execute(query, [newPassword, id]);
            if ((result as any).affectedRows === 0) {
                return null;
            }
            const user = await this.get(id);
            return user;

        } catch (error) {
            console.log(error);
            return null;

        }

    }
}