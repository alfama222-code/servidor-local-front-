import type { create } from "node:domain";
import { inserirServico } from "../servico.js";
import { orcamentomodels } from "../models/orcamento.models.js";
import { response, type Request, type Response } from "express";
import db from "../lib/db.js";
import type { RowDataPacket } from "mysql2";
import type { ResponseType } from "../utils/types.js";
import { id } from "date-fns/locale";

export const orcamentocontrolers = {
    // create servico orcamento
    async create(req: Request, res: Response) {
        const orcamento: any = req.body
        if (!orcamento) {
            return ({
                status: 'error',    
                message: "dados de orcamento invalidos",
                data: null,
            });
        }
        const criarOrcamentoResponse = await orcamentomodels.createOrcamento(orcamento)
        if (criarOrcamentoResponse === null)

            if (!orcamento) {
                return res.status(400).json({
                    status: "error",
                    message: "dados de orcamento invalidos",
                    data: null,
                })
            }
        if (orcamento) {
            return res.status(200).json({
                status: "success",
                message: "dados de orcamento invalidos",
                data: null,
            })
        }

    },
    // Controlador para calcular orçamento final
    async calcularOrcamento(req: Request, res: Response) {
        try {
            const idOrcamento = String(req.params.id);

            // Buscar a prestação de serviço associada a este orçamento
            const [rows]: any = await db.query<RowDataPacket[]>(
                "SELECT * FROM tabela_prestacao_servicos WHERE id_orcamento = ?",
                [idOrcamento]
            );

            if (Array.isArray(rows) && rows.length === 0) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Nenhuma prestação de serviço encontrada para este orçamento",
                    data: null
                };
                return res.status(404).json(response);
            }

            const tabela_prestacao_servicos = rows[0] as RowDataPacket;
            console.log("tabela_prestacao_servicos", tabela_prestacao_servicos)
            const prestacao_servicos = tabela_prestacao_servicos.id;
            const id_prestador = tabela_prestacao_servicos.id_prestador;

            //Buscar propostas dessa prestação
            const [propostas] = await db.query<RowDataPacket[]>(
                `SELECT * FROM tabela_proposta WHERE id_prestacao = ?`,
                [prestacao_servicos]
            );

            //Verificar proposta aceite
            const propostaAceite = propostas.find((proposta: any) => proposta.estado === "ACEITE" || proposta.estado === "Aceite" || proposta.estado === "aceite");

            if (!propostaAceite) {
                return res.status(400).json({
                    success: false,
                    message: "Nenhuma proposta aceite encontrada para esta prestação de serviço",
                    data: null
                });
            }

            const preco_hora = propostaAceite.preco_hora;
            const hora_estimada = propostaAceite.hora_estimada;

            //Buscar dados do prestador
            const [prestadores] = await db.query<RowDataPacket[]>(
                `SELECT taxa_urgencia,      
                    minimo_desconto, 
                    percentagem_desconto 
                FROM tabela_prestadores 
                WHERE id = ?`,
                [id_prestador]
            );

            if (!Array.isArray(prestadores) || prestadores.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Prestador não encontrado",
                    data: null
                });
            }

            const prestador = prestadores[0] as RowDataPacket;
            const { taxa_urgencia, minimo_desconto, percentagem_desconto } = prestador;

            console.log(taxa_urgencia, minimo_desconto, percentagem_desconto, preco_hora, hora_estimada);
            // Calcular total
            let total: number = parseInt(preco_hora) * parseInt(hora_estimada);
            // Se tiver taxa de urgência associada (garantindo conversão se vier 20 em vez de 0.20)
            if (taxa_urgencia) {
                const multiplicadorUrgencia = taxa_urgencia > 1 ? taxa_urgencia / 100 : taxa_urgencia;
                total += (total * multiplicadorUrgencia);
            }

            // Se atingir o mínimo para desconto (garantindo conversão se vier 10 em vez de 0.10)
            if (total >= minimo_desconto) {
                const multiplicadorDesconto = percentagem_desconto > 1 ? percentagem_desconto / 100 : percentagem_desconto;
                total -= total * multiplicadorDesconto;
            }
            if (isNaN(total)) {
                return res.status(400).json({
                    success: false,
                    message: "Erro no calculo: valores invalidos",
                    data: null
                });
            }

            //Atualizar orçamento
            await db.execute(
                `UPDATE tabela_orcamento SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), idOrcamento]
            );
            console.log("total2113243254", total)
            return res.status(200).json({
                success: true,
                message: "Orçamento calculado com sucesso",
                data: { idOrcamento, total }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Erro ao calcular orçamento",
                data: null
            })
        }
    },

    // apanhar servico orcamento
    async apanharOrcamento(req: Request, res: Response) {
        const orcamento: any = req.body

        if (!orcamento) {
            return ({
                status: 'error',
                message: "dados de orcamento invalidos",
                data: null,
            });

        }
        const apanharOrcamentoResponse = await orcamentomodels.getAllOrcamentos()

        if (apanharOrcamentoResponse === null)

            if (!orcamento) {
                return res.status(400).json({
                    status: "error",
                    mensagem: "dados de orcamento invalidos",
                    data: null
                })
            }
        if (orcamento) {
            return res.status(200).json({
                status: "sucess",
                message: "dados de orcamento validos",
                data: null,
            })
        }
    },
    //delete servico orcamento
    async deleteOrcamento(req: Request, res: Response) {
        const { id } = req.params


        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        if (!id)
            return res.status(200).json({
                status: "success",
                mensagem: "ID obrigatorio",
                data: null
            })
        const deleteServicoResponse = await orcamentomodels.deleteOrcamento (id as string)
        if (!deleteServicoResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Servico nao encontrado",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Servico deletado com sucesso",
            data: deleteServicoResponse
        })
    },
    // get servico orcamento
    async getOrcamento(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        if (!id)
            return res.status(200).json({
                status: "success",
                mensagem: "ID obrigatorio",
                data: null
            })
        const getServicoResponse = await orcamentomodels.getOrcamento(id as string)
        if (!getServicoResponse)
            return res.status(404).json({
                status: "error",
                mensagem: "Servico nao encontrado",
                data: null
            })
        return res.status(200).json({
            status: "success",
            mensagem: "Servico encontrado",
            data: getServicoResponse
        })
    },


    //update servio orcamento

    async updateOrcamento(req: Request, res: Response) {
        const updateOrcamento: any = req.body
        const { id } = req.params


        if (!id) {
            return res.status(400).json({
                status: "error",
                mensagem: "ID obrigatorio",
                data: null
            })
        }
        if (!id)
            return res.status(200).json({
                status: "success",
                mensagem: "ID obrigatorio",
                data: null
            })

        const updateServicoResponse = await orcamentomodels.updateOrcamento(id as string, updateOrcamento)

        if (!updateServicoResponse) {
            return res.status(500).json({
                status: "error",
                mensagem: "Erro ao atualizar servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            mensagem: "Servico atualizado com sucesso",
            data: updateServicoResponse
        })
    },
}