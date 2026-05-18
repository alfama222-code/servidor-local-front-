import { catalogoServicos } from "./servico.js"
import { type PedidoServicoType, type PrestadorType, type ServicoType } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: ServicoType[] = []
const prestadoresDeServicos: PrestadorType[] = []
const prestadoreSelecionados: PrestadorType[] = []


// funcao para selecionar servicos e horasEstimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }
    }
    return false
}


// funcao para selecionar prestadores
export function criarPrestadoresDeServico(novoPrestador: PrestadorType) {
    //verificar se os prestadores ja esta no array
    prestadoresDeServicos.map((prestadorExisteente: PrestadorType) => {
        if (prestadorExisteente.nome === novoPrestador.nome) {
            //se o prestador ja existe, nao adicionar e retornar mensagem de erro
            return {
                status: false,
                mensagem: " ja existe um prestador de servicocom esse nome",
                data: null
            }
        }
    })
}

// funcao parra editar um prestador de servico
export function editarPrestadorDeServico(nomePrestador: string, novosDadosDoPrestador: PrestadorType) {
    // encontar o prestador de servico na minha lista
    //ciclo que precore a lista e verifica o nome  do prestador de servico
    prestadoresDeServicos.map((prestadorExistente: PrestadorType,) => {
        if (prestadorExistente.nome === nomePrestador) {
            prestadorExistente.nome = novosDadosDoPrestador.nome
            prestadorExistente.precoHora = novosDadosDoPrestador.precoHora
            prestadorExistente.profissao = novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto = novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novosDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novosDadosDoPrestador.taxaUrgencia

            return {
                status: true,
                mensagem: "Prestador de servico editado com sucesso",
                data: prestadorExistente
            }

        }
    })
    // se o prestador de servico nao for encontrado, retornar mensagem de erro
    return {
        status: false,
        mensagem: "nao existe um prestador de servico com esse nome",
        data: null
    }
}

// funcao para apagar um prestador de servico
export function apagarPrestadorDeServico(nomePrestador: string) {
    // ciclo que precore a lista de prestadores
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        //if para vaerifiucar se o mome do prestador for igual ao nome do recebido 
        if (prestadoresDeServicos[i]?.nome === nomePrestador) {
            // se encontarrem remover o prestador 
            prestadoresDeServicos.splice(i, 1)//remove o prestador do array
            // retornar mensagem de sucesso
            // se nao encontrarem retornar mensagem de erro
            return {
                status: true,
                mensagem: "Prestador de servico apagado com sucesso",
                data: prestadoresDeServicos
            }
        }
        return {
            status: false,
            mensagem: "nao existe um prestador de servico com esse nome",
            data: null
        }
    }
    // funcao para obter um prestador de servico pelo nome






    //se o prestador nao existe, adicionar ao array de prestadores
    return {
        status: true,
        mensagem: "Prestador adicionado com sucesso",
        data: null
    }
}


// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

    return totalFinal

    // () => {} --- arrow function
    // function () {} --- function normal

    /* 
    
    urgente: true
    taxaUrgencia: 0.3
    totalBruto: 100
    totalTaxa: 100 * 0.3 = 30
    totalFinal: 100 + 30 = 130
 
    totalBruto: 100
    totalbruto apos urgencia: 150
    minimo descnto: 100
    percentagem: 10%
    desconto sobre total final: 150 * 0.1 = 15
    desconto sobre total bruto: 100 * 0.1 = 10
 
    */
}

const prestadoresDisponiveis: PrestadorType[] = [];
let prestadoresSelecionados: PrestadorType[] = [];

export function selecionarPrestador(nomePrestador: PrestadorType) {
    if (prestadoresDisponiveis.includes(nomePrestador)) {
        prestadoresSelecionados.push(nomePrestador);
        return true;// Retorna true se o prestador foi adicionado com sucesso
    } else {
        return false;// Retorna false se o prestador não está disponível
    }
}

