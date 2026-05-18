import { servicomodels } from "../../models/servico.models.js"
import type { dbservicoType, ServicoType } from "../../utils/types.js";
import {categoriamodels} from "../../models/categoria.models.js";
import { prestacaoservicomimodels } from "../../models/prestacaoservico.models.js";




export const resolvers = {
    Query: {
        getAllServico: async () => {
            return await servicomodels.getAllServicoDetalhada(1,0);
        },
        getServicoById: async (_: any, args: { id: string }) => {
            return await servicomodels.getServico(args.id as string)
        },

    },
    
    Mutation: {

        createServico: async (_: any, args : { servico: ServicoType  }) => {
            return await servicomodels.inserirServico(args.servico as unknown as dbservicoType);
        },
        updateServico: async (_: any, args : { id: string, servico: ServicoType  }) => {
            return await servicomodels.updateServico(args.id as string, args.servico as unknown as dbservicoType);
        },
        deleteServico: async (_: any, args : { id: string }) => {
            return await servicomodels.deleteServico(args.id as string);
        }
    },
    Servico: {
        categoria: async (parent: any) => {
            return await categoriamodels.get(parent.id_categoria as string);
        }, 
        prestacaoservico: async (parent: any) => {
            return await prestacaoservicomimodels.getPrestacaoServico(parent.id as string);
        }
    }
}
