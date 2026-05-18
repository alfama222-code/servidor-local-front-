import { create } from "node:domain";
import type { PrestadorType } from "../utils/types.js";
import type { Request, Response } from "express";
import { prestadormodels } from "../models/prestador.models.js";
import { id } from "date-fns/locale";

export const prestadorecontrollers = {
    async create(req: Request, res: Response) {
        const Prestador: PrestadorType = req.body

        if (!Prestador) {
            return ({
                status: 'error',
                message: "dados de prestador invalidos",
                data: null,
            });
        }
        const criarPrestadorResponse = await prestadormodels.create(Prestador)
        if (criarPrestadorResponse === null)
            return res.status(400).json({
                status: "error",
                mensagem: "dados de prestador invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "dados de prestador validos",
            data: null,
        })

    },


    async apanharPrestador(req: Request, res: Response) {
        const prestador: PrestadorType = req.body
        if (!this.apanharPrestador) {
            return ({
                status: 'error',
                menssagem: "dados de prestador invalidos",
                data: null,
            });
        }
        const apanharPrestadorResponse = await prestadormodels.apanharPrestador(req.params.id_categoria as string)
        if (apanharPrestadorResponse === null)
            return res.status(400).json({
                status: "error",
                 message: "dados de prestador invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            message: "dados de prestador validos",
            data: null,
        })

    },
    async deletePrestador(req: Request, res: Response) {
        const deletePrestador: PrestadorType = req.body
        const { id } = req.params
        if (!this.deletePrestador) {
            return ({
                status: 'error',
                mensagem: "dados de prestador invalidos",
                data: null,
            });
        }
        const deletePrestadorResponse = await prestadormodels.deletePrestador(id as string)
        if (!deletePrestadorResponse)
            return res.status(404).json({
                status: "error",
                message: "dados de prestador invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            message: "dados de prestador validos",
            data: null
        })

    },


    async getPrestador(req: Request, res: Response) {
        const getPrestador: PrestadorType = req.body
        const { id } = req.params
        if (!this.getPrestador) {
            return ({
                status: 'error',
                mensagem: "dados de prestador invalidos",
                data: null,
            });
        }
        const getPrestadorResponse = await prestadormodels.apanharPrestador(id as string)
        if (!getPrestadorResponse)
            return res.status(404).json({
                status: "error",
                message: "dados de prestador invalidos",
                data: null
            })
        return res.status(200).json({
            status: "sucess",
            message: "dados de prestador validos",
            data: null,
        })


    },

    async updatePrestador(req: Request, res: Response) {
        const updatePrestador: PrestadorType = req.body
        const { id } = req.params
        if (!this.updatePrestador) {
            return ({
                status: 'error',
                menssagem: "dados de prestador invalidos",
                data: null,
            })
        }
        const updatePrestadorResponse = await prestadormodels.updatePrestador(id as string, updatePrestador)
        if (!updatePrestadorResponse)
            return res.status(400).json({
                status: "error",
                message: "dados de prestador invalidos",
                data: null
            })
        return res.status(200).json({
            status: "success",
            message: "dados de prestador validos",
            data: null
        })

    },
}

