const express = require('express');
const bodyParser = require('body-parser');

const os = require('os');

const app = express();

app.get('/', (request, response) => {
    return response
    .status(200)
    .json({
        status: true,
        mensagem: 'OK'
    });
})

app.get('/redirect', (request, response) => {
    return response.redirect(307, '/redirect2');
})

app.get('/redirect2', (request, response) => {
    return response
    .status(200)
    .json({
        status: true,
        mensagem: 'OK'
    });
})

app.get('/liveness', (request, response) => {
    return response
    .status(200)
    .json({
        status: true,
        path: "",
        gid: "",
        uid: ""
    });
})

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
})

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
})

module.exports = app;