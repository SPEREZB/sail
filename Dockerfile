# Establece la imagen base
FROM node:14 as builder

# Establece el directorio de trabajo en la carpeta de la aplicación Angular
WORKDIR /app

# Copia los archivos de configuración y las dependencias del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación Angular
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos de construcción de la etapa anterior
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]