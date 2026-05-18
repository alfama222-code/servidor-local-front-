import db from "../lib/db.js";
import type { orcamentoType } from "../utils/types.js";
import type { RowDataPacket } from "mysql2";
import { generateUUID } from "../utils/uuid.js";

//funcao para atualizar orcamento
export const orcamentomodels = {
    async updateOrcamento(id: string, updatedOrcamento: orcamentoType) {
        try {
            const query = "UPDATE tabela_orcamento SET total=?, id_utilizador=?, enabled=?, created_at=?, updated_at=? WHERE id=?"

            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.enabled,
                new Date(),
                id
            ]

            const rows: any = await db.execute(query, values)
            return rows[0]?.affectedRows === 0 ? null: rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para criar orcamento
    async createOrcamento(orcamento: orcamentoType): Promise<orcamentoType | null> {
        try {
            const [rows] = await db.execute<orcamentoType & RowDataPacket[]>(
                `SELECT INTO tabela_orcamento
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    orcamento.total,
                    orcamento.id_utilizador,
                    orcamento.enabled,
                    orcamento.created_at,
                    orcamento.updated_at,
                    new Date(),
                    new Date()
                ]
            )
            return rows as orcamentoType    
        } catch (error) {
            console.log(error)
            return null
        }

    },

    // funcao para apagar orcamento
    async deleteOrcamento(id: string) {
            try {
                const query = "DELETE FROM tabela_orcamento WHERE id=?"
                const values = [id]
                const rows = await db.execute(query, values)
                return rows
            } catch (error) {
                console.log(error)
                return null
            }
        },

    // funcao para obter orcamento por id 
    async getOrcamento(id: string): Promise<orcamentoType | null>{
            try {
                // Corrigido: nome da tabela consistente na query
                const [rows] = await db.execute<orcamentoType[] & RowDataPacket[]>(
                "SELECT * FROM tabela_orcamento WHERE table_orcamento.id =?",
                [id]
                );
                // Se rows não existir ou o array estiver vazio, retornamos null
                if (Array.isArray(rows) && rows.length === 0) return null
                return Array.isArray(rows) ? rows[0] as orcamentoType : null
            } catch (error) {
                console.log(error)
                return null
            }
                
        },

    // funcao para obter todos os orcamentos 
    async getAllOrcamentos(): Promise<orcamentoType[] | null>{
        const [rows] = await db.execute<orcamentoType[] & RowDataPacket[]>(
            `SELECT * FROM tabela_orcamento`
        )
        return rows as orcamentoType[]
    }
           
    }












