import { categoriamodels } from "../../models/categoria.models.js";
import { servicomodels } from "../../models/servico.models.js";
import type { categoriaDBType } from "../../utils/types.js";

export const categoriaresolvers = {
    Query: {
        getAllCategoria: async () => {
            return await categoriamodels.getAll();
        },
        getCategoriaById: async (_: any, args: { id: string }) => {
            return await categoriamodels.get(args.id as string)
        },

    },

    Mutation: {
        createCategoria: async (_: any, args: { categoria: categoriaDBType }) => {
            return await categoriamodels.create(args.categoria as unknown as categoriaDBType);
        },
        updateCategoria: async (_: any, args: { id: string, categoria: categoriaDBType }) => {
            return await categoriamodels.update(args.id as string, args.categoria as unknown as categoriaDBType);
        },
        deleteCategoria: async (_: any, args: { id: string }) => {
            return await categoriamodels.delete(args.id as string);
        }
    },
    Categoria: {
        servico: async (_: any, args: { id: string }) => {
            return await servicomodels.getServico(args.id as string);
        },
    }
}