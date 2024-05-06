create database Atlantis;
use Atlantis;

create table endereco (
	id int not null primary key auto_increment,
    rua varchar(100),
    bairro varchar(50),
    cidade varchar(50),
    estado varchar(20),
    pais varchar(20),
    codigoPostal varchar(8)
);

create table acomodacao (
	id int not null primary key auto_increment,
	nomeAcomodacao varchar(100),
    camaSolteiro int,
    camaCasal int,
    suite int,
    climatizacao bool,
    garagem int
);

create table cliente (
	id int not null primary key auto_increment,
	nome varchar(100),
    nomeSocial varchar(100),
    dataNascimento date,
    dataCadastro date,
    id_endereco int,
    id_titular int,
    id_acomodacao int,
    foreign key (id_endereco) references endereco(id),
    foreign key (id_titular ) references cliente(id),
    foreign key (id_acomodacao ) references acomodacao(id)
);

create table tipoDocumento (
	id int not null primary key auto_increment,
    nome varchar(100)
);

create table documento (
	id int not null primary key auto_increment,
    id_cliente int not null,
    numero varchar(100),
    tipo int not null,
    dataExpedicao date,
    foreign key (id_cliente) references cliente(id),
    foreign key (tipo) references tipoDocumento(id)
);

create table telefone (
	id int not null primary key auto_increment,
    id_cliente int not null,
	ddd varchar(3),
    numero varchar(9),
    foreign key (id_cliente) references cliente(id)
);

insert into acomodacao (nomeAcomodacao, camaSolteiro, camaCasal, suite, climatizacao, garagem)
	values ("Acomodação simples para solteiro(a)", 0, 1, true, 0, 1),
		("Acomodação simples para casal", 1, 0, true, 1, 1),
		("Acomodação para família com até duas crianças", 1, 2, true, 1, 1),
		("Acomodação para família com até cinco crianças", 1, 5, true, 2, 2),
		("Acomodação com garagem para solteiro(a)", 1, 0, true, 1, 1),
		("Acomodação para até duas familias, casal e três crianças cada", 2, 6, true, 2, 3);

insert into tipoDocumento (nome)
    values ("Cadastro de Pessoa Física (CPF)"),
        ("Registro Geral (RG)"),
        ("Passaporte");
