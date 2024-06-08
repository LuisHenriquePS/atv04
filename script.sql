-- script.sql
CREATE DATABASE IF NOT EXISTS minha_database;
USE minha_database;

CREATE TABLE IF NOT EXISTS minha_tabela (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL
);

INSERT INTO minha_tabela (nome, idade) VALUES ('João', 30), ('Maria', 25);
