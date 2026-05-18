import { stat } from "node:fs";
import { empresasmodels } from "../models/empresa.models.js";
import type { EmpresaDBType } from "../utils/types.js";
import type { Request, Response } from "express";


export const empresacontrolers = {

    async create(req: Request, res: Response) {
        const empresa: EmpresaDBType = await req.body

        if (!empresa) {
            return ({
                status: 'error',
                message: "dados de empresa invalidos",
                data: null,
            });
        } 
        const criarEmpresaResponse = await empresasmodels.create(empresa)
        if (criarEmpresaResponse === null)

            if (!empresa) {
                return res.status(400).json({
                    status: "error",
                    mensagem: "dados de empresa invalidos",
                    data: null
                })
            }

        return res.status(200).json({
            status: "success",
            mensagem: "dados de empresa validos",
            data: empresa,
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
        const getEmpresaResponse = await empresasmodels.get(id as string)
        if (!getEmpresaResponse) {
            return res.status(404).json({
                status: "error",
                mensagem: "Empresa nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Empresa encontrada",
            data: getEmpresaResponse
        })

    },

    async getAll(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const getAllEmpresaResponse = await empresasmodels.getAll()
        if (!getAllEmpresaResponse) {
            return res.status(404).json({
                status: "error",
                mensagem: "Empresas nao encontradas",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Empresas encontradas",
            data: getAllEmpresaResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const deleteEmpresaResponse = await empresasmodels.delete(id as string)
        if (!deleteEmpresaResponse) {
            return res.status(404).json({
                status: "error",
                mensagem: "Empresa nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Empresa encontrada",
            data: deleteEmpresaResponse
        })

    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const updateEmpresa: EmpresaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const updateEmpresaResponse = await empresasmodels.update(id as string, updateEmpresa)
        if (!updateEmpresaResponse) {
            return res.status(404).json({
                status: "success",
                mensagem: "Empresa encontrada",
                data: updateEmpresaResponse
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Empresa encontrada",
            data: updateEmpresaResponse
        })

    }
}
