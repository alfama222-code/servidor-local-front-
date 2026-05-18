import { orcamentomodels } from "../../models/orcamento.models.js";
import { prestacaoservicomimodels } from "../../models/prestacaoservico.models.js";
import { usersmodels } from "../../models/users.models.js";
import type { usuarioType } from "../../utils/types.js";
export const usersresolvers = {

    Query: {
        getUserById: async (_: any, args: { id: string }) => {
            return await usersmodels.get(args.id as string)
        },

    },
    
    Mutation: {

        createUser: async (_: any, args : { user: usuarioType  }) => {
            return await usersmodels.iserirUsers(args.user);
        },
        updateUser: async (_: any, args : { id: string, user: usuarioType  }) => {
            return await usersmodels.updateServico(args.id as string, args.user);
        },
        deleteUser: async (_: any, args : { id: string }) => {
            return await usersmodels.delete(args.id as string);
        }
    },
    Usuario: {
        orcamento: async (_: any, args: { id: string }) => {
            return await orcamentomodels.getOrcamento(args.id as string);
        }

    }
}
