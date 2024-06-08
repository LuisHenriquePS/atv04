// app.js

const express = require('express');
const mysql = require('mysql');
const os = require('os');

const app = express();

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: '123456',
  database: 'minha_database'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL...');
});

// Endpoint para consulta de dados
app.get('/consulta-dados', (req, res) => {
  let sql = 'SELECT * FROM minha_tabela';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// Endpoint para verificar a disponibilidade do serviço (liveness probe)
app.get('/liveness', (req, res) => {
  res.status(200).json({
    status: true
  });
});

// Endpoint para verificar a prontidão do serviço (readiness probe)
app.get('/rediness', (req, res) => {
  res.status(200).json({
    status: true,
    os: os.platform(),
    freemem: os.freemem(),
    homedir: os.homedir()
  });
});

// Inicializar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Node.js executando na porta ${port}`);
});
