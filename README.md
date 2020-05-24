### Si queres sabes mas sobre mi:
[Nestor Marsollier](https://github.com/nmarsollier/profile)

# Microservicio de Imágenes

Este microservicio recibe y almacena imágenes en formato base64 en una base de datos redis.

Si bien esta desarrollado con fines académicos, si se refinan los detalles puede utilizarse en producción.

El cliente puede solicitar las imágenes en distintos tamaños, cada tamaño se ajusta y se guarda en la base de datos para una mejor velocidad de acceso en futuras llamadas.

Las imágenes pueden recuperarse en formato base64 o bien en formato jpeg.

[Documentación de API](./README-API.md)

La documentación de las api se pueden consultar desde el home del microservicio
que una vez levantado el servidor se puede navegar en [localhost:3001](http://localhost:3001/)

## Dependencias

### Auth

Las imágenes solo pueden subirse y descargarse por usuarios autenticados, ver la arquitectura de microservicios de [ecommerce](https://github.com/nmarsollier/ecommerce).

### Node 10.15

Seguir los pasos de instalación del sitio oficial [nodejs.org](https://nodejs.org/en/)

## Redis

Las imágenes se almacenan en una instancia de Redis. Seguir los pasos de instalación desde la pagina oficial [redis.io](https://redis.io/download)

No se requiere ninguna configuración adicional, solo levantarlo luego de instalarlo.

Tambien se puede instalar usando docker, ver notas en [ecommerce](https://github.com/nmarsollier/ecommerce)

## RabbitMQ

Solo usuarios autorizados pueden subir y descargar imágenes. El microservicio [Auth](https://github.com/nmarsollier/ecommerce) es el que identifica usuarios. Auth notifica con un broadcast los logouts en la aplicación para que se vacíen los caches locales de usuario.

Seguir los pasos de instalación en la pagina oficial de [RabbitMQ](https://www.rabbitmq.com/)

No se requiere ninguna configuración adicional, solo levantarlo luego de instalarlo.

Tambien se puede instalar usando docker, ver notas en [ecommerce](https://github.com/nmarsollier/ecommerce)

## Ejecución

Abrir ventana de comandos en la carpeta del microservicio y ejecutar :

```bash
npm install
npm start
```

## Apidoc

Apidoc es una herramienta que genera documentación de apis para proyectos node (ver [Apidoc](http://apidocjs.com/)).

El microservicio auth muestra la documentación como archivos estáticos si se abre en un browser la raíz del servidor [localhost:3001](http://localhost:3001/)

Ademas se genera la documentación en formato markdown.

## Archivo .env

Este archivo permite configurar diversas opciones de la app, ver ejemplos en .env.example

## Docker

Para crear el contenedor docker de este repositorio ejecutamos :

```bash
docker build -t ecommerce-image-node .
docker run -d --name ecommerce-image-node --network host ecommerce-image-node
```

El contenedor se puede parar usando :

```bash
docker stop ecommerce-image-node
```
Se vuelve a levantar usando 

```bash
docker start ecommerce-image-node 
```
