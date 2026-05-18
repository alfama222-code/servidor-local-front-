#verifica o sistema operacional base
FROM node:20-alpine

#cria a pasta /app
WORKDIR /app

#copia os arquivos de configuração package.json e package-lock.json para a pasta /app
COPY package.json .

#instala as dependências
RUN npm install

#copia o resto dos arquivos do projeto para a pasta /app
COPY . .

#expõe a porta 3000
EXPOSE 3000

# comando que vai ser executado quando o container for iniciado
CMD ["npm", "run", "dev"]