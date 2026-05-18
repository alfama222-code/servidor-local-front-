import { prestacaoservicomimodels } from "../../models/prestacaoservico.models.js";
import { propostamodels } from "../../models/proposta.models.js"
import { usersmodels } from "../../models/users.models.js";
import type {  propostaType } from "../../utils/types.js";

export const propostaresolvers = {
    Query: {
        getAllProposta: async () => {
            return await propostamodels.apanharProposta();
        },
        getPropostaById: async (_: any, args: { id: string }) => {
            return await propostamodels.getProposta(args.id as string)
        },

    },
    
    Mutation: {

        createProposta: async (_: any, args : { proposta: propostaType  }) => {
            return await propostamodels.create(args.proposta as unknown as propostaType);
        },
        updateProposta: async (_: any, args : { id: string, proposta: propostaType  }) => {
            return await propostamodels.updateProposta(args.id as string, args.proposta as unknown as propostaType);
        },
        deleteProposta: async (_: any, args : { id: string }) => {
            return await propostamodels.deleteProposta(args.id as string);
        }
    },
    Proposta: {
        prestacaoservico: async (parent: any) => {
            return await prestacaoservicomimodels.getPrestacaoServico(parent.id_prestacao_servico as string);
        }
    }
}   
