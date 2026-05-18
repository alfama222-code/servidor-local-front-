SELECT nome FROM table_utilizadores;

SELECT * FROM table_utilizadores;

SELECT id,nome FROM table_utilizadores;

SELECT table_utilizadores.id FROM table_utilizadores,table_prestadores;

SELECT table_utilizadores.id,table_prestadores.id
FROM table_utilizadores,table_prestadores;

SELECT  * FROM  table_utilizadores,table_prestadores;

SELECT table_orcamento.id,
total,
table_utilizadores.id,
nome
FROM table_orcamento,
table_utilizadores
WHERE 
table_orcamento.id_utilizadores = "4945b932-79ba-4146-a724-e5cb88832ade";

SELECT * FROM table_servicos;

SELECT *
FROM table_utilizadores
WHERE table_utilizadores.id = "4945b932-79ba-4146-a724-e5cb88832ade";