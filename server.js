const app = require('./app');
const http = require('http');

const port = 3001;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
// docker run -p 3000:3001 --name aula-cc-new -d leroilui31/atv04ead:0.0.1 - pra rodar