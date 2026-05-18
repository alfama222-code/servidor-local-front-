 # especifica versao de sistema operacional e runtime do node 
FROM node:22-alpine 

 # define o diretorio de trabalho no container
 WORKDIR /app

#copia os arquivos package.jason e packge.lock.jason para pasta app
COPY package*.json ./

#instala as dependencias do projeto
RUN npm install

#copia o restante dos arquivos da aplicação para a pasta app
COPY . .

#expõe a porta 8080
EXPOSE 8080

# comando que será executado quando o container for iniciado
CMD [ "npm", "run", "dev" ]

