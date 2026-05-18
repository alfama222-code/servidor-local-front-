import type { prestacaoType } from "../utils/types.js"
import type { Request, Response } from "express"
import { prestacaoservicomimodels } from "../models/prestacaoservico.models.js"
import { id } from "date-fns/locale"
import { STATUS_CODES } from "node:http"
import  type { categoriaDBType } from "../utils/types.js"

//controlador para atualizar prestacao de servico
export const prestacaoControler = {
    async updatePrestacaoServico(req: Request, res: Response) {
        const prestacaoServico: prestacaoType = req.body
        const id = req.params.id
        if (!prestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "dados invalidos",
                data: null
            })
        }
        const updatePrestacaoServicoResponse = await prestacaoservicomimodels.updatePrestacaoServico(id as string, prestacaoServico)
        if (!updatePrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao atualizar prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse
        })
    },

    //funcao para criar prestacao de servico
    async createPrestacaoServico(req: Request, res: Response) {
        const prestacaoServico: prestacaoType = req.body
        if (!prestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "dados invalidos",
                data: null
            })
        }
        const createPrestacaoServicoResponse = await prestacaoservicomimodels.getPrestacaoServico
        if (!createPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao criar prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        })
    },

    //funcao para apagar prestacao de servico
    async deletePrestacaoServico(req: Request, res: Response) {
        const id = req.params.id
        const prestacaoServico = await prestacaoservicomimodels.deletePrestacaoServico(id as string)
        if (!prestacaoServico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao apagar prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico apagada com sucesso",
            data: prestacaoServico
        })
    },

    //funcao para obter prestacao de servico por id
    async getPrestacaoServicoById(req: Request, res: Response) {
        const id = req.params.id
        const prestacaoServico = await prestacaoservicomimodels.getPrestacaoServico(id as string)
        if (!prestacaoServico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao obter prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico obtida com sucesso",
            data: prestacaoServico
        })
    },

    //funcao para obter todas as prestacoes de servico
    async getAllPrestacoesServico(req: Request, res: Response) {
        const prestacoesServico = await prestacaoservicomimodels.getPrestacaoServico
        if (!prestacoesServico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao obter prestacoes de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacoes de servico obtidas com sucesso",
            data: prestacoesServico
        })
    },

    //funcao para obter todas as prestacoes de servico detalhadas
    async getAllPrestacoesServicoDetalhada(req: Request, res: Response) {
        const { Limit, offset } = req.query as { Limit: string, offset: string }
       
        let LIMIT = 10
        let OFFSET = 0


        if (LIMIT && parseInt (Limit) > 0) LIMIT = parseInt(Limit)
        if (OFFSET && parseInt(offset) >= 0) OFFSET = parseInt(offset)

        const prestacoeServicoDetalhada = await prestacaoservicomimodels.GetAllprestacaoServicoDetalhada (LIMIT,OFFSET)

        if (!prestacoeServicoDetalhada) {
            return res.status(500).json({
                Sstatus: "error",
                message: "erro ao obter prestacoes de servico detalhada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacoes de servico detalhada obtidas com sucesso",
            data: prestacoeServicoDetalhada
        })
        },
        async categoriaDBType(req: Request, res: Response) {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                })
            }
            const categoria = await prestacaoservicomimodels.GetAllprestacaoServicoBycategoriaDBType(id as string)
            if (!categoria) {
                return res.status(500).json({
                    status: "error",
                    message: "erro ao obter categoria",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "categoria obtida com sucesso",
                data: categoria
            })
        }


    }



