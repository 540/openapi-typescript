# API POC - Pets API

Una API de demostración (Proof of Concept) que proporciona endpoints para gestionar información sobre mascotas utilizando TypeScript, Fastify y OpenAPI.

## Descripción

Este proyecto implementa una API REST basada en una especificación OpenAPI que permite:

- Recuperar una lista de todas las mascotas
- Obtener información detallada sobre una mascota específica por su ID

La API está construida utilizando Fastify como framework web y aprovecha la generación de código TypeScript a partir de la especificación OpenAPI para garantizar una implementación con seguridad de tipos.

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- npm

## Instalación

1. Clone el repositorio:

   ```bash
   git clone git@github.com:540/openapi-typescript.git
   cd api-poc
   ```

2. Instale las dependencias:
   ```bash
   npm install
   ```

## Uso

### Generar código a partir de la especificación OpenAPI

```bash
npm run generate:server
```

Este comando genera tipos TypeScript, configuración de Fastify y otros archivos necesarios a partir de la especificación OpenAPI.

### Ejecutar el servidor

```bash
npx tsx src/server/index.ts
```

El servidor se iniciará en http://localhost:3000 por defecto.

### Endpoints disponibles

- **GET /healthcheck**: Comprueba el estado del servidor
- **GET /pets**: Obtiene una lista de todas las mascotas
- **GET /pets/{petId}**: Obtiene una mascota específica por su ID

## Estructura del proyecto

```
├── openapi-ts.server.config.ts  # Configuración para generar código desde OpenAPI
├── openapi.yaml                 # Especificación OpenAPI de la API
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración de TypeScript
├── plugin/                      # Plugin personalizado
├── plugins/                     # Plugins para la generación de código
│   └── spec/                    # Plugin para la especificación
├── src/                         # Código fuente
│   └── server/                  # Implementación del servidor
│       ├── api.ts               # Configuración de la API
│       ├── index.ts             # Punto de entrada del servidor
│       ├── controllers/         # Controladores para cada endpoint
│       └── generated/           # Código generado automáticamente
```

## Tecnologías utilizadas

- **TypeScript**: Para desarrollo con seguridad de tipos
- **Fastify**: Framework web rápido para Node.js
- **OpenAPI**: Para la definición y documentación de la API
- **@hey-api/openapi-ts**: Para generar código TypeScript desde la especificación OpenAPI

## Desarrollo

### Modificar la API

1. Edite el archivo `openapi.yaml` para modificar la especificación de la API
2. Ejecute `npm run generate:server` para regenerar el código
3. Implemente la lógica en los controladores correspondientes

### Añadir nuevos endpoints

1. Añada la definición del nuevo endpoint en `openapi.yaml`
2. Genere el código con `npm run generate:server`
3. Cree un nuevo controlador en `src/server/controllers/`
4. Añada el controlador al índice en `src/server/controllers/index.ts`
