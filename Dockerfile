# Dockerfile

FROM node:18-slim

# Instalação do MySQL
RUN apt-get update && \
    apt-get install -y mysql-client && \
    apt-get clean

# Copiar o script SQL para dentro do contêiner
COPY script.sql /docker-entrypoint-initdb.d/

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos necessários para a construção do projeto
COPY package*.json ./

# Instalação das dependências
RUN npm install

# Copiar o resto dos arquivos do projeto
COPY . .

# Comando para iniciar o servidor
CMD [ "npm", "start" ]
