import e from "express";
/*enem*/ 
export enum Role {
    CLIENTE = "cliente",
    ADMIN = "admin",
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
}
export enum Esatdoproposta {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    REJEITADO = "rejeitado"
}
export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROGRESSO = "em progresso",
    CANCELADO = "cancelado"
}
export enum TipoPrestador {
    PARTICULAR = "particular",
    EMPRESA = "empresa"
}
/*intwrface*/
export interface PedidoServicoType {
    cliente: string,
    descricao: string,
    horasEstimadas: number,
    urgente: boolean
}
export interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDescontado: number,
    percentagemDesconto?: number
}
export interface PrestadorType {
    id: string,
    nome: string,
    taxaUrgencia: number,
    profissao: string,
    minimoParaDesconto: number,
    nif: string,
    percentagemDesconto: number,
    precoHora: number,
    disponivel: boolean,
    id_empresa: string,
    tipo_prestador: TipoPrestador,
    enabled: boolean,
    created_at: string,
    updated_at: string

}
export interface usuarioType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    password: string,
    telefone: string,
    pais: string,
    localidade: string,
    role: Role,
    enabled: boolean,
    created_at: string,
    update_at: string

}

export interface dbservicoType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    created_at: string,
    updated_at: string
}


export interface orcamentoType {
    id: string,
    total: number,
    id_utilizador: string,
    enabled: boolean,
    created_at: string,
    updated_at: string


}
export interface propostaType {
    id: string,
    id_prestacao: number,
    precoHora: number,
    horaEstimadas: number,
    estado: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface prestacaoType {
    id: string,
    disignacao: string,
    subtotal: number,
    horasEstimadas: number,
    id_prestador: string,
    id_servico: string,
    precoHora: number,
    estado: string,
    id_orcamento: string,
    id_utilizador: string,
    urgente: boolean,
    enabled: boolean,
    created_at: string,
    update_at: string


}
export interface ServicoDetalhadaType {
    id: string,
    nome: string,
    descricao: string,
    id_categoria: string,
    id_empresa: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface prestadocaoServicoDetalhadaType {
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    estado: string,
    urgente: boolean
}
export interface ResponseType<T> {
    status: "success" | "error",
    message: string,
    data: T | null
}
export interface EmpresaDBType {
    id: string,
    designacao: string,
    descricao: string,
    nif: string,
    icone: string,
    id_utilizador: string,
    localizacao:string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}
export interface categoriaDBType {
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    estado: string,
    urgente: boolean,
    enabled: boolean,
    created_at: string,
    updated_at: string
}
