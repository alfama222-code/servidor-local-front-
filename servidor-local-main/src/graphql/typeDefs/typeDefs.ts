import { gql } from "graphql-tag";

export const typeDefs = gql`


enum Role {
    CLIENTE
    ADMIN
    PRESTADOR
    EMPRESA
}

enum Esatdoproposta {
    PENDENTE
    ACEITE
    REJEITADO
}


  type usuarioType {
    id: ID!,
    nome: String!
    numero_identificacao: String!
    data_nascimento: String!
    email: String!
    password: String,
    telefone: String!
    pais: String
    localidade: String,
    role: Role,
    enabled: Boolean,
    created_at: String,
    update_at: String
}

 type propostaType {
    id: ID!,
    id_prestacao: String!,
    precoHora: String!,
    horaEstimadas: String!,
    estado: String,
    id_prestador: String!,
    owner: String,
    enabled: Boolean,
    created_at: String,
    updated_at: String
}
 type ServicoType     {
    nome: String
    precoHora: String
    categoria: String
    minimoDescontado: String
    percentagemDesconto: String
    enabled: Boolean
    created_at: String
    updated_at: String
}
 type prestadorType {
    id: ID!
    nome: String!
    taxaUrgencia: String!
    profissao: String!
    minimoParaDesconto: String!
    nif: String!
    percentagemDesconto: String!
    precoHora: String!
    disponivel: Boolean
    id_empresa: String!
    tipo_prestador: String!
    enabled: Boolean
    created_at: String
    updated_at: String
}
 type dbServicoType  {
    id: ID!
    nome: String!
    descricao: String!
    categoria: String
    enabled: Boolean
    created_at: String
    updated_at: String
}
 type orcamentoType{
    id: ID!
    total: String!
    id_utilizador: String!
    enabled: Boolean
    created_at: String
    updated_at: String
}
 type prestacaoServicoType{
    id: ID!
    disignacao: String!
    subtotal: String!
    horasEstimadas: String!
    id_prestador: String!
    id_servico: String!
    precoHora: String!
    estado: String
    id_orcamento: String!
    id_utilizador: String!
    urgente: Boolean
    enabled: Boolean
    created_at: String
    update_at: String
}
 type EmpresaType{
    id: ID!
    designacao: String!
    descricao: String!
    nif: String!
    icone: String!
    id_utilizador: String!
    localizacao:String!
    enabled: Boolean
    created_at: String
    updated_at: String
}
type categoriaType{
    id: ID!
    nome: String!
    descricao: String!
    id_empresa: String!
    enabled: Boolean
    created_at: String
    updated_at: String
}

type Query {
        getAllUsers: [usuarioType]
        getUserById(id: ID!): usuarioType

        getAllService: [dbServicoType]
        getServiceById(id: ID!): dbServicoType

        getAllProposta: [propostaType]
        getPropostaById(id: ID!): propostaType

        getAllPrestador: [prestadorType]
        getPrestadorById(id: ID!): prestadorType

        getAllPrestacaoServico: [prestacaoServicoType]
        getPrestacaoServicoById(id: ID!): prestacaoServicoType

        getAllOrcamento: [orcamentoType]
        getOrcamentoById(id: ID!): orcamentoType

        getAllEmpresa: [EmpresaType]
        getEmpresaById(id: ID!): EmpresaType   

        getAllCategoria: [categoriaType]
        getCategoriaById(id: ID!): categoriaType
    }

    type Mutation {
        createUser(
            nome: String!
            numero_identidade: String!
            data_nascimento: String!
            email: String!
            password: String!
            telefone: String!
            pais: String!
            localidade: String
            role: Role
            enabled: Boolean
        ): usuarioType

        updateUser(
            id: ID!
            nome: String
            numero_identidade: String
            data_nascimento: String
            email: String
            password: String
            telefone: String
            pais: String
            localidade: String
            role: Role
            enabled: Boolean
        ): usuarioType

        deleteUser(id: ID!): usuarioType

        createServico(
            nome: String!
            descricao: String
            categoria: [ID]
            enabled: Boolean
        ): dbServicoType

        updateServico(
            id: ID!
            nome: String
            descricao: String
            categoria: [ID]
            enabled: Boolean
        ): dbServicoType

        deleteServico(id: ID!): dbServicoType

        createProposta(
            id_prestacao_servico: ID!
            id_prestador: ID!
            preco_hora: Float!
            horas_estimadas: Int!
            estado: Esatdoproposta
            owner: String
            enabled: Boolean
        ): propostaType

        updateProposta(
            id: ID!
            id_prestacao_servico: ID
            id_prestador: ID
            preco_hora: Float
            horas_estimadas: Int
            estado: Esatdoproposta
            owner: String
            enabled: Boolean
        ): propostaType

        deleteProposta(id: ID!): propostaType

        createPrestador(
            taxa_urgencia: Float!
            percentagem_desconto: Float!
            minimo_desconto: Float!
            nif: String
            profissao: String!
            enable: Boolean
        ): prestadorType

        updatePrestador(
            id: ID!
            taxa_urgencia: Float
            percentagem_desconto: Float
            minimo_desconto: Float
            nif: String
            profissao: String
            enable: Boolean
        ): prestadorType

        deletePrestador(id: ID!): prestadorType

        createPrestacaoServico(
            designacao: String!
            subtotal: Float!
            horas_estimadas: Int!
            id_prestador: ID!
            id_utilizador: ID!
            id_servico: ID!
            preco_hora: Float!
            estado: Esatdoproposta
            id_orcamento: ID
            id_empresa: ID
            tipo_prestador: String!
            urgente: Boolean
            enabled: Boolean
        ): prestacaoServicoType

        updatePrestacaoServico(
            id: ID!
            designacao: String
            subtotal: Float
            horas_estimadas: Int
            id_prestador: ID
            id_utilizador: ID
            id_servico: ID
            preco_hora: Float
            estado: Esatdoproposta
            id_orcamento: ID
            id_empresa: ID
            tipo_prestador: String
            urgente: Boolean
            enabled: Boolean
        ): prestacaoServicoType

        deletePrestacaoServico(id: ID!): prestacaoServicoType

        createOrcamento(
            total: Float!
            id_utilizadores: ID!
            enabled: Boolean
        ): orcamentoType

        updateOrcamento(
            id: ID!
            total: Float
            id_utilizadores: ID
            enabled: Boolean
        ): orcamentoType

        deleteOrcamento(id: ID!): orcamentoType

        createEmpresa(
            designacao: String!
            descricao: String
            localizacao: String
            nif: String
            icone: String
            id_utilizador: ID!
            enabled: Boolean
        ): EmpresaType

        updateEmpresa(
            id: ID!
            designacao: String
            descricao: String
            localizacao: String
            nif: String
            icone: String
            id_utilizador: ID
            enabled: Boolean
        ): EmpresaType

        deleteEmpresa(id: ID!): EmpresaType

        createCategoria(
            designacao: String!
            descricao: String
            id_empresa: String!
            enabled: Boolean
        ): categoriaType

        updateCategoria(
            id: ID!
            designacao: String
            descricao: String
            id_empresa: String!
            enabled: Boolean
        ): categoriaType

        deleteCategoria(id: ID!): categoriaType

}
`