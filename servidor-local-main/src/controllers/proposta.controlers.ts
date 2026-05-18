import { json } from "node:stream/consumers";
import { propostamodels } from "../models/proposta.models.js";
import type { propostaType } from "../utils/types.js";
import type { Request, Response } from "express";
import { get } from "node:http";
import { id } from "date-fns/locale";
import db from "../lib/db.js";
import type { isDataView } from "node:util/types";


export const propostacontrolers = {

    async create(req: Request, res: Response) {
        const novaProposta: propostaType = req.body

        if (!novaProposta) {
            return ({
                status: 'error',
                message: "dados de proposta invalidos",
                data: null,
            });
        }
        const criarPropostaResponse = await propostamodels.create(novaProposta)
        if (criarPropostaResponse === null)
            return res.status(400).json({
                status: "error",
                mensagem: "dados de proposta invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "dados de proposta validos",
            data: null,
        })

    },

    async apanharProposta(req: Request, res: Response) {
        const novaProposta: propostaType = req.body

        if (!novaProposta) {
            return ({
                status: 'error',
                message: "dados de proposta invalidos",
                data: null,
            });
        }
        const criarPropostaResponse = await propostamodels.apanharProposta()
        if (criarPropostaResponse === null)
            return res.status(400).json({
                status: "error",
                mensagem: "dados de proposta invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "dados de proposta validos",
            data: null,
        })

    },



    async deleteProposta(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const deletePropostaResponse = await propostamodels.deleteProposta(id as string)
        if (!deletePropostaResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Proposta nao encontrada",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Proposta deletada com sucesso",
            data: deletePropostaResponse
        })
    },

    async getProposta(req: Request, res: Response) {
        const { id } = req.params

        if (!this.getProposta) {
            return res.json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const getPropostaResponse = await propostamodels.getProposta(id as string)
        if (!getPropostaResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Proposta nao encontrada",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Proposta encontrada",
            data: getPropostaResponse
        })


    },

    async updateProposta(req: Request, res: Response) {
        const { id } = req.params
        const updateProposta: propostaType = req.body


        if (!this.updateProposta) {
            return res.json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const updatePropostaResponse = await propostamodels.updateProposta
        if (!updatePropostaResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Proposta nao encontrada",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Proposta atualizada com sucesso",
            data: updatePropostaResponse
        })

    },

// controlador para aceitar proposta
    async aceitarProposta(req: Request, res: Response) {
        const propostaId = Number(req.params.id); // ID da proposta escolhida
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            // 1. Descobrir a qual prestação essa proposta pertence
            const [resultado] = await connection.query(
                "SELECT id_prestacao FROM tabela_proposta WHERE id = ?",
                [propostaId]
            );

            if (!Array.isArray(resultado) || resultado.length === 0) {
                await connection.rollback();
                return res.status(404).json({
                    status: "error",
                    message: "Proposta não encontrada",
                    data: null
                });
            }

            const idPrestacao = await Number((resultado as any)[0].id_prestacao);

            // 2. Marcar a proposta escolhida como "Aceite"
            const updatePropostaResponse = await connection.execute(
                "UPDATE tabela_proposta SET estado = 'aceite' WHERE id = ?",
                [propostaId]
            );

            // 3. Rejeitar todas as outras propostas ligadas à mesma prestação
            const updatePropostaResponse2 = await connection.execute(
                "UPDATE tabela_proposta SET estado = 'recusado' WHERE id_prestacao = ? AND id != ?",
                [idPrestacao, propostaId]
            );

            await connection.commit();
            res.status(200).json({
                status: "success",
                message: "Proposta aceita com sucesso",
                data: null
            });
        } catch (error: any) {
            if (connection) await connection.rollback();
            res.status(500).json({
                status: "error",
                message: "erro ao aceitar proposta",
                data: null
            });
        } finally {
            if (connection) connection.release();
        }
    }
}
    





