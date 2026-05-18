INSERT INTO table_utilizadores( 
id,
nome,
numero_identificacao,
data_nascimento,
email,
telefone,
pais,
localidade,
`password`,
enabled,
created_at,
update_at
)VALUES (
"4945b932-79ba-4146-a724-e5cb88832ade",
"Ismar Alfama",
"M001",
"2004-12-24",
"ismaralfama222gmail.com",
"9860051",
"Cabo Verde",
"Sao Pedro",
"$2a$12$iWJCs2mle6nTnTxqF0/.iuy24yEUK/VcYXzqQnCTaI32.sLQ2Ytqq",
true,
NOW(),
NOW()
);

INSERT INTO table_orcamento
VALUES (
NULL,
200,
"4945b932-79ba-4146-a724-e5cb88832ade",
true,
NOW(),
NOW()
);

INSERT INTO table_prestadores
VALUES(
"452cf52a-a296-4243-a90c-eef845ffe6f4",
"4945b932-79ba-4146-a724-e5cb88832ade",
0.2,
0.3,
0.5,
063798,
"programador",
1,
now(),
now()
);

INSERT INTO  table_servicos (
id,
nome,
descricao,
categoria,
created_at,
updated_at
)
VALUE(
NULL,
"Developed",
"sites",
TRUE,
now(),
now()
);
INSERT INTO table_utilizadores
VALUES(
"0ad57142-9003-4b73-92c0-5225208505a3",
"ismar Alfama",
"MO0L",
"2004-12-24",
"ismaralfama222@gmail.com",
"9860051",
"Cabo Verde",
"Sao Pedro",
"$2a$12$2JYv/i68nDM7abGHgF0mN.GCkvFhkXk0bg8Ohb0MCZF4Er5GWU6xu",
true,
NOW(),
NOW()
);



