import { empresacontrolers } from "../../controllers/empresa.controlers.js";
import { prestadormodels } from "../../models/prestador.models.js";
import type { PrestadorType } from "../../utils/types.js";

export const prestadorresolvers = {
    Query: {
        getAllPrestador: async () => {
            return await prestadormodels.apanharPrestador("");
        },
        getPrestadorById: async (_: any, args: { id: string }) => {
            return await prestadormodels.get(args.id as string)
        },

    },

    Mutation: {

        createPrestador: async (_: any, args: { prestador: PrestadorType }) => {
            return await prestadormodels.create(args.prestador as unknown as PrestadorType);
        },
        updatePrestador: async (_: any, args: { id: string, prestador: PrestadorType }) => {
            return await prestadormodels.updatePrestador(args.id as string, args.prestador as unknown as PrestadorType);
        },
        deletePrestador: async (_: any, args: { id: string }) => {
            return await prestadormodels.deletePrestador(args.id as string);
        }
    },
    Prestador: {
        empresa: async (_: any, args: { id: string }, context: any) => {
            return await prestadormodels.get(args.id as string);
        },
        prestacaoservico: async (_: any, args: { id: string }, context: any) => {
            return await prestadormodels.get(args.id as string);
        },
    }


}