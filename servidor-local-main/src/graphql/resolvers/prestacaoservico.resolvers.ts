import { orcamentomodels } from "../../models/orcamento.models.js";
import { prestacaoservicomimodels } from "../../models/prestacaoservico.models.js";
import { prestadormodels } from "../../models/prestador.models.js";
import { propostamodels } from "../../models/proposta.models.js";
import { servicomodels } from "../../models/servico.models.js";
import type { prestacaoType, prestadocaoServicoDetalhadaType } from "../../utils/types.js";

export const prestacaoservicoresolvers = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await prestacaoservicomimodels.GetAllprestacaoServicoDetalhada(1,0);
        },
        getPrestacaoServicoById: async (_: any, args: { id: string }) => {
            return await prestacaoservicomimodels.getPrestacaoServico(args.id as string)
        },

    },
    
    Mutation: {

        createPrestacaoServico: async (_: any, args : { prestacaoServico: prestadocaoServicoDetalhadaType  }) => {
            return await prestacaoservicomimodels.create(args.prestacaoServico as unknown as prestacaoType);
        },
        updatePrestacaoServico: async (_: any, args : { id: string, prestacaoServico: prestadocaoServicoDetalhadaType  }) => {
            return await prestacaoservicomimodels.updatePrestacaoServico(args.id as string, args.prestacaoServico as unknown as prestacaoType);
        },
        deletePrestacaoServico: async (_: any, args : { id: string }) => {
            return await prestacaoservicomimodels.deletePrestacaoServico(args.id as string);
        }
    },
    PrestacaoServico: {
        prestador: async (_: any, args: { id: string }) => {
            return await prestadormodels.get(args.id as string);
        },
        servico: async (_: any, args: { id: string }) => {
            return await servicomodels.getServico(args.id as string);
        },
        proposta: async (_: any, args: { id: string }) => {
            return await propostamodels.getProposta(args.id as string);
        },
        orcamento: async (_: any, args: { id: string }) => {
            return await orcamentomodels.getOrcamento(args.id as string);
        },
    }
}