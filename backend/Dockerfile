# Imagen base de Node
FROM node:22

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend (ajústalo si usas otro)
EXPOSE 4000

# Comando de inicio con nodemon
CMD ["npm", "run", "dev"]
