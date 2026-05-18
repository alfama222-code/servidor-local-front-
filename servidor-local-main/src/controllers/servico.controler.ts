import { servicomodels } from "../models/servico.models.js";
import { catalogoServicos, updateServico } from "../servico.js";
import type { ResponseType, ServicoDetalhadaType, ServicoType } from "../utils/types.js";
import type { Request, Response } from "express";


export const ServicoController = {
    // criacao de novo servico2
    async create(req: Request, res: Response) {

        const novoServico: any = req.body
        if (!novoServico) {
            return ({
                status: 'error',
                message: "dados de servico invalidos",
                data: null,
            })
        }
        const criarServicoResponse = await servicomodels.inserirServico(novoServico)
        if (criarServicoResponse === null)
            return res.status(400).json({
                status: "error",
                mensagem: "dados de servico invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "dados de servico validos",
            data: null,
        })
    },

    // para apnhar todos os servico
    async getAll(req: Request, res: Response) {

        const getServicoResponse = await servicomodels.apanharServico()

    },
    // para deletar servico
    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const apagarServicoResponse = await servicomodels.deleteServico(id as string)
    },
    // para atualizar servico por id 
    async update(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const updateServico: any = req.body
        const updateServicoResponse = await servicomodels.updateServico(id as string, updateServico)

        if (!updateServicoResponse) {
            return res.status(500).json({
                status: "error",
                mensagem: "Erro ao atualizar servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Servico atualizado com sucesso",
            data: updateServicoResponse
        })
    },
    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const getServicoResponse = await servicomodels.getServico(id as string)
        if (!getServicoResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Servico nao encontrado",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Servico encontrado",
            data: getServicoResponse
        })
    },
    async getAllServicoDetalhada(req: Request, res: Response) {
        const { Limit, offset } = req.query

        let LIMIT = 10
        let OFFSET = 0

        if (Limit) (
            LIMIT = parseInt(Limit as string)
        )
        if (offset) (
            OFFSET = parseInt(offset as string)
        )

        const getAllServicoDetalhadaResponse = await servicomodels.getAllServicoDetalhada(LIMIT, OFFSET)

        if (!getAllServicoDetalhadaResponse){

            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servicos detalhados",
                data: null
            }
            return res.status(404).json(response)            
            }
            const response: ResponseType<ServicoDetalhadaType[]> = {
                status: "success",
                message: "Servicos detalhados encontrados",
                data: getAllServicoDetalhadaResponse
        }
        return res.status(200).json(response)

    }
}
