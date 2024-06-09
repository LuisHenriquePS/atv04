const express = require('express');
const mysql = require('mysql');
const os = require('os');

const app = express();

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: '123456',
  database: 'minha_database',
  port: 3306
});

// Conectar ao banco de dados e configurar a tabela
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  const createDatabase = `CREATE DATABASE IF NOT EXISTS minha_database`;
  const useDatabase = `USE minha_database`;
  const createTable = `
    CREATE TABLE IF NOT EXISTS minha_tabela (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      idade INT NOT NULL
    )`;
  const insertData = `
    INSERT INTO minha_tabela (nome, idade) VALUES 
    ('João', 30), 
    ('Maria', 25)`;

  db.query(createDatabase, (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists');
    db.query(useDatabase, (err, result) => {
      if (err) throw err;
      console.log('Using database');
      db.query(createTable, (err, result) => {
        if (err) throw err;
        console.log('Table created or already exists');
        db.query(insertData, (err, result) => {
          if (err) throw err;
          console.log('Data inserted');
        });
      });
    });
  });
});

app.get('/', (request, response) => {
  return response
    .status(200)
    .json({
      status: true,
      mensagem: 'OK'
    });
});

app.get('/consulta-dados', (request, response) => {
  db.query('SELECT * FROM minha_tabela', (err, results) => {
    if (err) {
      return response.status(500).json({ status: false, mensagem: err.message });
    }
    return response.status(200).json({ status: true, data: results });
  });
});

app.get('/redirect', (request, response) => {
  return response.redirect(307, '/redirect2');
});

app.get('/redirect2', (request, response) => {
  return response
    .status(200)
    .json({
      status: true,
      mensagem: 'OK'
    });
});

app.get('/liveness', (request, response) => {
  return response
    .status(200)
    .json({
      status: true,
      path: "",
      gid: "",
      uid: ""
    });
});

app.get('/rediness', (request, response) => {
  return response
    .status(200)
    .json({
      status: true,
      mensagem: 'rediness',
      os: os.platform(),
      freemem: os.freemem(),
      homedir: os.homedir()
    });
});

app.get('/diario', (request, response) => {
  return response
    .status(200)
    .json({
      message: "Meu aplicativo está funcionando, UFA!!!",
      platform: os.platform(),
      os: os.platform(),
      freemem: os.freemem(),
      homedir: os.homedir(),
      date: new Date().getTime()
    });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
