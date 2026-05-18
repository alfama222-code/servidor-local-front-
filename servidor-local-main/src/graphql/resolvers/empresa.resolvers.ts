import { empresasmodels } from "../../models/empresa.models.js";
import { prestadormodels } from "../../models/prestador.models.js";
import type { EmpresaDBType } from "../../utils/types.js";

export const empresaresolvers = {
    Query: {
        getAllEmpresa: async () => {
            return await empresasmodels.getAll();
        },
        getEmpresaById: async (_: any, args: { id: string }) => {
            return await empresasmodels.get(args.id as string)
        },

    },

    Mutation: {

        createEmpresa: async (_: any, args: { empresa: EmpresaDBType }) => {
            return await empresasmodels.create(args.empresa as unknown as EmpresaDBType);
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: EmpresaDBType }) => {
            return await empresasmodels.update(args.id as string, args.empresa as unknown as EmpresaDBType);
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await empresasmodels.delete(args.id as string);
        }
    },
    Empresa: {
        prestador: async (_: any, args: { id: string }) => {
            return await prestadormodels.get(args.id as string);
        }
        
    }
}
