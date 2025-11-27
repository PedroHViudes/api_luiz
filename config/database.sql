create database intro_api;
use intro_api;


create table produtos(
id int primary key auto_increment,
nome varchar(255),
valor double
);

INSERT INTO produtos (nome, valor) VALUES
('Monitor LG 27"', 1200.50),
('Teclado Mecânico', 350.00),
('Mouse Gamer', 180.99);


create table if not exists usuarios(
id int primary key auto_increment,
nome_empresa  varchar(255),
nome_user varchar(255),
senha varchar(255),
email varchar(255)
);

create table if not exists licitacoes(
id int primary key auto_increment,
cliente varchar(255),
numlicit varchar(255),
localizacao varchar(255),
data_inicio date,
data_final date,
observacao varchar(255),
id_usuario int not null,
 FOREIGN KEY (id_usuario) references usuarios(id) 
);

INSERT INTO usuarios (nome_empresa, nome_user, senha, email) VALUES
('Construtora Alpha', 'joao.almeida', 'senha123', 'joao@alpha.com'),
('Engenharia Beta', 'maria.santos', 'beta2024', 'maria@beta.com'),
('Consultoria Gamma', 'carlos.souza', 'gamma#321', 'carlos@gamma.com');


INSERT INTO licitacoes (cliente, numlicit, localizacao, data_inicio, observacao, id_usuario) VALUES
('Prefeitura Municipal de Curitiba', '05/2024', 'Curitiba - PR', '2024-02-10', 'Concorrência pública para pavimentação.', 1),
('Governo do Estado do Paraná', '112/2024', 'Londrina - PR', '2024-03-22', 'Reforma de escolas estaduais.', 2),
('Prefeitura de Maringá', '207/2024', 'Maringá - PR', '2024-04-15', 'Aquisição de materiais hospitalares.', 3),
('Prefeitura de Jacarezinho', '300/2024', 'Jacarezinho - PR', '2024-05-01', 'Serviços de manutenção predial.', 1),
('Prefeitura de Cambará', '88/2024', 'Cambará - PR', '2024-06-10', 'Projeto de drenagem urbana.', 2);

select * from usuarios;

select * from licitacoes;
