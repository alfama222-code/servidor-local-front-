import { orcamentomodels } from "../../models/orcamento.models.js";
import { prestacaoservicomimodels } from "../../models/prestacaoservico.models.js";
import { usersmodels } from "../../models/users.models.js";
import type { orcamentoType } from "../../utils/types.js";

export const orcamentoresolvers = {
    Query: {
        getAllOrcamento: async () => {
            return await orcamentomodels.getAllOrcamentos();
        },
        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await orcamentomodels.getOrcamento(args.id as string)
        },

    },

    Mutation: {

        createOrcamento: async (_: any, args: { orcamento: orcamentoType }) => {
            return await orcamentomodels.createOrcamento(args.orcamento as unknown as orcamentoType);
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: orcamentoType }) => {
            return await orcamentomodels.updateOrcamento(args.id as string, args.orcamento as unknown as orcamentoType);
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await orcamentomodels.deleteOrcamento(args.id as string);
        }
    },
    Orcamento: {
        utilizador: async (parent: any) => {
            return await usersmodels.get(parent.id_utilizador as string);
        },
        prestacaoservico: async (_: any, args: { id: string }) => {
            return await prestacaoservicomimodels.getPrestacaoServico(args.id as string);
        },
    }

}