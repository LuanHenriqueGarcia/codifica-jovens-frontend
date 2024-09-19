# Use a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho no container
COPY . .

# Expõe a porta que o React utiliza
EXPOSE 3000

# Define o comando padrão para iniciar a aplicação
CMD ["npm", "start"]
