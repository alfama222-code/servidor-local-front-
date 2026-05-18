USE servidor_local;

CREATE TABLE IF NOT EXISTS table_prestadores (
	id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
	id_utilizadores VARCHAR(255),
	taxa_Urgencia DECIMAL(10, 3),
	percentagem_desconto DECIMAL(10, 3),
	minimo_desconto DECIMAL(10, 2),
	nif NUMERIC NOT NULL,
	profissao VARCHAR(100) NOT NULL,
	enabled BOOLEAN NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS table_orcamento(
	id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    valor_total DOUBLE NOT NULL,
    id_utilizadores VARCHAR(255) NOT NULL,
    id_prestadores VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS table_utilizadores (
	id VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
	nome VARCHAR(50) NOT NULL,
	numero_identificacao VARCHAR(100) NOT NULL,
	data_nascimento DATE NOT NULL,
	email VARCHAR(100) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	telefone VARCHAR(20),     
	pais VARCHAR(100) NOT NULL,
	localidade VARCHAR(100) NOT NULL,
	enabled BOOLEAN NOT NULL,
	created_at DATETIME NOT NULL,
	update_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS table_servicos (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
	nome VARCHAR(50) NOT NULL,
	descricao VARCHAR(255),
	categoria VARCHAR(20) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS table_orcamento (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
	valor_total DOUBLE NOT NULL,
	id_utilizadores VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS table_prestacao_servico (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
	id_prestador VARCHAR(255) NOT NULL,
	id_orcamento INTEGER,
	id_servicos INTEGER NOT NULL,
	designacao VARCHAR(100) NOT NULL,
	sub_total DOUBLE NOT NULL,
	horas_estimadas INTEGER,
	preco_hora DOUBLE,
	estado ENUM('pendente', 'em_progresso', 'finalizado', 'cancelado') NOT NULL
);
CREATE TABLE IF NOT EXISTS table_proposta (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
	id_prestacao_servico INTEGER NOT NULL,
	preco_hora DOUBLE NOT NULL,
	horas_estimadas INTEGER NOT NULL,
	estados ENUM('aceito', 'recusado') NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);


ALTER TABLE tbl_proposta
 ADD CONSTRAINT fk_prestacao_servico_proposta
 FOREIGN KEY (id_prestacao_servico)
REFERENCES tbl_prestacao_servico(id)
;



ALTER TABLE table_prestacao_servico
ADD CONSTRAINT fk_prestadores_prestacao_servico
FOREIGN KEY (id_prestador)
REFERENCES tbl_prestadores(id),
ADD CONSTRAINT fk_servicos_prestacao_servico
FOREIGN KEY (id_servicos)
REFERENCES table_servicos(id)
 ;