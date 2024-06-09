const express = require('express');
const mysql = require('mysql');
const os = require('os');

const app = express();

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '123456',
    database: 'minha_database',
    port: 3306 // Porta do MySQL dentro do contêiner
  });
  

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL...');
});

// Criar tabela e inserir dados
const createTableAndInsertData = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS minha_tabela (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      idade INT NOT NULL
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Tabela criada ou já existente.');

    const insertDataQuery = `
      INSERT INTO minha_tabela (nome, idade) VALUES ('João', 25), ('Maria', 30)
    `;

    db.query(insertDataQuery, (err, result) => {
      if (err) throw err;
      console.log('Dados inseridos.');
    });
  });
};

// Chamar a função para criar a tabela e inserir os dados
createTableAndInsertData();

// Endpoint para consultar dados
app.get('/consulta-dados', (req, res) => {
  const query = 'SELECT * FROM minha_tabela';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao consultar dados' });
    }

    res.status(200).json(results);
  });
});

// Outros endpoints existentes
app.get('/', (request, response) => {
  return response
    .status(200)
    .json({
      status: true,
      mensagem: 'OK'
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

// Iniciar o servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
