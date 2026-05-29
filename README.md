# BackendCoder3 - API de Adopciones

Repo de GitHub:
https://github.com/NicolasUrsino/backendcoder3-Ursino

Imagen Docker:
nicolasursino/backendcoder3-adoptions:1.0.0

Repositorio DockerHub:
https://hub.docker.com/r/nicolasursino/backendcoder3-adoptions

---

## Descripción del proyecto

Este proyecto consiste en una API REST desarrollada con Node.js y Express para gestionar adopciones de mascotas.

La aplicación permite crear, listar, consultar, actualizar el estado y eliminar adopciones. Para este entregable se implementaron tests funcionales sobre el router `adoption.router.js`, utilizando una persistencia simulada en memoria para aislar la lógica de datos y evitar depender de una base de datos externa.

---

## Tecnologías utilizadas

* Node.js
* Express
* Docker
* Node Test Runner
* Persistencia en memoria mediante fake repository

---

## Estructura del proyecto

```txt
backendCoder3-Ursino/
├── .dockerignore
├── .env
├── .env.desa
├── .env.prod
├── .gitignore
├── Dockerfile
├── README.md
├── package.json
├── package-lock.json
├── simple.json
├── compleja.json
├── errors.log
├── estructura.txt
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── process.js
│   │
│   ├── config/
│   │   └── config.js
│   │
│   ├── middleware/
│   │   └── errors/
│   │       └── mainError.js
│   │
│   ├── repositories/
│   │   └── adoption.repository.js
│   │
│   ├── routes/
│   │   ├── adoption.router.js
│   │   └── users.router.js
│   │
│   ├── services/
│   │   └── adoption.service.js
│   │
│   ├── service/
│   │   └── errors/
│   │       ├── CustomError.js
│   │       ├── enums.js
│   │       └── infoError.js
│   │
│   └── utils/
│       └── logger.js
│
└── test/
    └── adoption.router.test.js
```

---

## Endpoints principales

### Listar adopciones

```http
GET /api/adoptions
```

Devuelve el listado completo de adopciones registradas.

---

### Buscar una adopción por ID

```http
GET /api/adoptions/:id
```

Devuelve una adopción específica según su ID.

---

### Crear una adopción

```http
POST /api/adoptions
```

Crea una nueva adopción.

Ejemplo de body:

```json
{
  "petName": "Firulais",
  "adopterName": "Juan Pérez",
  "adopterEmail": "juan@mail.com"
}
```

---

### Actualizar estado de adopción

```http
PATCH /api/adoptions/:id/status
```

Actualiza el estado de una adopción.

Ejemplo de body:

```json
{
  "status": "approved"
}
```

Estados permitidos:

```txt
pending
approved
rejected
```

---

### Eliminar una adopción

```http
DELETE /api/adoptions/:id
```

Elimina una adopción existente.

---

## Tests funcionales

Los tests funcionales están ubicados en:

```txt
test/adoption.router.test.js
```

Estos tests validan los endpoints definidos en `adoption.router.js`.

Se prueban casos de:

* creación correcta de una adopción;
* listado de adopciones;
* búsqueda por ID;
* actualización del estado de adopción;
* eliminación de una adopción;
* errores de validación;
* errores por recurso inexistente.

Para aislar dependencias externas se utiliza un repositorio en memoria, funcionando como fake repository. De esta forma los tests no dependen de una base de datos real y pueden ejecutarse de manera controlada.

### Ejecutar tests

```bash
npm test
```

---

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/NicolasUrsino/backendcoder3-Ursino.git
```

Ingresar al proyecto:

```bash
cd backendcoder3-Ursino
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm start
```

La aplicación queda disponible en:

```txt
http://localhost:8080
```

---

## Dockerización

El proyecto incluye un Dockerfile para construir una imagen Docker de la aplicación.

### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

EXPOSE 8080

CMD ["node", "src/server.js"]
```

### Decisiones de optimización

Se utiliza `node:22-alpine` como imagen base porque es una imagen liviana de Node.js basada en Alpine Linux. Esto permite reducir el tamaño final de la imagen Docker.

Se define `WORKDIR /app` como directorio de trabajo dentro del contenedor.

Primero se copian los archivos `package.json` y `package-lock.json`, y luego se instalan las dependencias. Esto permite aprovechar la caché de Docker, ya que si no cambian las dependencias no es necesario reinstalarlas en cada build.

Se utiliza `npm ci --omit=dev` para instalar dependencias de forma limpia y reproducible, usando el archivo `package-lock.json`. Además, se omiten las dependencias de desarrollo para que la imagen final sea más liviana.

Luego se copia la carpeta `src`, que contiene el código fuente necesario para ejecutar la aplicación.

La instrucción `EXPOSE 8080` documenta el puerto utilizado por la aplicación.

Finalmente, `CMD ["node", "src/server.js"]` ejecuta el servidor Express al iniciar el contenedor.

---

## Construir la imagen Docker

```bash
docker build -t backendcoder3-adoptions:1.0.0 .
```

---

## Ejecutar el contenedor

```bash
docker run --name backendcoder3-adoptions -p 8080:8080 backendcoder3-adoptions:1.0.0
```

Luego acceder a:

```txt
http://localhost:8080
http://localhost:8080/api/adoptions
```

Si el contenedor ya existe, se puede detener y eliminar con:

```bash
docker stop backendcoder3-adoptions
docker rm backendcoder3-adoptions
```

---

## Publicación en DockerHub

Imagen publicada:

```txt
nicolasursino/backendcoder3-adoptions:1.0.0
```

Repositorio público:

```txt
https://hub.docker.com/r/nicolasursino/backendcoder3-adoptions
```

### Login en DockerHub

```bash
docker login
```

### Etiquetar imagen

```bash
docker tag backendcoder3-adoptions:1.0.0 nicolasursino/backendcoder3-adoptions:1.0.0
```

### Subir imagen

```bash
docker push nicolasursino/backendcoder3-adoptions:1.0.0
```

---

## Escaneo básico de seguridad

Para realizar un escaneo básico de seguridad se puede utilizar Docker Scout:

```bash
docker scout quickview nicolasursino/backendcoder3-adoptions:1.0.0
```

El resultado del escaneo se incluye como evidencia en el documento de entrega.

---

## Comandos principales

Instalar dependencias:

```bash
npm install
```

Ejecutar tests:

```bash
npm test
```

Levantar aplicación localmente:

```bash
npm start
```

Construir imagen Docker:

```bash
docker build -t backendcoder3-adoptions:1.0.0 .
```

Ejecutar contenedor:

```bash
docker run --name backendcoder3-adoptions -p 8080:8080 backendcoder3-adoptions:1.0.0
```

Subir imagen a DockerHub:

```bash
docker tag backendcoder3-adoptions:1.0.0 nicolasursino/backendcoder3-adoptions:1.0.0
docker push nicolasursino/backendcoder3-adoptions:1.0.0
```

---

## Evidencia

La evidencia de ejecución de tests, construcción de imagen Docker, ejecución del contenedor, publicación en DockerHub y escaneo básico de seguridad se encuentra documentada en el archivo de entrega en Google Docs mediante logs y capturas de pantalla.
