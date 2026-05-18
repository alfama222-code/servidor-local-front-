import { get } from "node:http";
import { categoriamodels } from "../models/categoria.models.js";
import type { categoriaDBType } from "../utils/types.js"
import type { Request, Response } from "express";


export const categoriacontrolers = {

    async create(req: Request, res: Response) {
        const Categoria: categoriaDBType = req.body

        if (!Categoria) {
            return ({
                status: 'error',
                message: "dados de categoria invalidos",
                data: null,
            });
        }
        const criarCategoriaResponse = await categoriamodels.create(Categoria)
        if (criarCategoriaResponse === null)

            if (!Categoria) {
                return res.status(400).json({
                    status: "error",
                    mensagem: "dados de categoria invalidos",
                    data: null
                })
            }

        return res.status(200).json({
            status: "success",
            mensagem: "dados de categoria validos",
            data: Categoria,
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
        const getCategoriaResponse = await categoriamodels.get(id as string)
        if (!getCategoriaResponse) {
            return res.status(404).json({
                status: "error",
                mensagem: "Categoria nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Categoria encontrada",
            data: getCategoriaResponse
        })

    },
    
    async getAll(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            });
        }
        const getAllCategoriaResponse = await categoriamodels.getAll()
        if (!getAllCategoriaResponse) {
            return res.status(404).json({
                status: "error",
                mensagem: "Categorias nao encontradas",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Categorias encontra",
            data: getAllCategoriaResponse
        })
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            });
        }
        const deleteCategoriaResponse = await categoriamodels.delete(id as string)
        if (!deleteCategoriaResponse) {
            return res.status(404).json({
                status: "error",
                mensagem: "Categoria nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Categoria encontrada",
            data: deleteCategoriaResponse
        })

    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const updateCategoria: categoriaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        const updateCategoriaResponse = await categoriamodels.update(id as string, updateCategoria)
        if (!updateCategoriaResponse) {
            return res.status(404).json({
                status: "success",
                mensagem: "Categoria encontrada",
                data: updateCategoriaResponse
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Categoria encontrada",
            data: updateCategoriaResponse
        })
    }
}
