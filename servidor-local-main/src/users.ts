import db from "./lib/db.js"
import { formatDateDDMMYYYY } from "./utils/date.js"
import { hashPassword } from "./utils/password.js"
import type {  usuarioType } from "./utils/types.js"
import { generateUUID } from "./utils/uuid.js"



export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM table_utilizadores")

    return rows

}

export async function getUserById(id: String) {
    console.log("id", id)

    const [rows] = await db.execute(
        `SELECT * FROM table_utilizadores  
         WHERE table_utilizadores.id = ?`,

        [id]
    )
    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}



export async function novoUsuario(usuario: usuarioType) {
    console.log(usuario)
    try {
        const rows = await db.execute(
            `INSERT INTO table_utilizadores VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [generateUUID(), usuario.nome, usuario.numero_identificacao, formatDateDDMMYYYY(usuario.data_nascimento), usuario.email,
             await hashPassword(usuario.password), usuario.telefone, usuario.pais, usuario.localidade, usuario.enabled, new Date(), new Date()]
        )

        return rows
    } catch (error) {
        console.log(error)
        return error

    }

}



