# Use uma imagem Node como base
FROM node:16

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o diretório de trabalho
COPY package*.json ./
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

RUN npm run build

# Exponha a porta necessária pelo aplicativo NestJS
EXPOSE 5000

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
