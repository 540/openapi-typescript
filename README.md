# API POC - Pets API

Una demostración completa (Proof of Concept) que incluye una API REST, un cliente frontend y herramientas de desarrollo para gestionar información sobre mascotas utilizando TypeScript, OpenAPI y tecnologías modernas.

## Descripción

Este proyecto implementa una solución completa que incluye:

### Backend (API REST)
- API REST basada en especificación OpenAPI
- Endpoints para gestionar mascotas (listar todas, obtener por ID)
- Implementación con Fastify y generación automática de tipos TypeScript

### Frontend (React)
- Aplicación React con TypeScript
- Cliente SDK generado automáticamente desde la especificación OpenAPI
- Integración con TanStack Query para gestión de estado del servidor
- Soporte para mocking con MSW (Mock Service Worker)

### Herramientas de desarrollo
- Plugin personalizado MSW para generar mocks tipados
- Plugin de especificación para generar configuración de Fastify
- Configuración completa de linting, formatting y testing

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- npm

## Instalación

1. Clone el repositorio:

   ```bash
   git clone git@github.com:540/openapi-typescript.git
   cd openapi-typescript
   ```

2. Instale las dependencias:
   ```bash
   npm install
   ```

## Uso

### Generar código a partir de la especificación OpenAPI

#### Para el servidor:
```bash
npm run generate:server
```

Este comando genera tipos TypeScript, configuración de Fastify y otros archivos necesarios para el backend.

#### Para el cliente:
```bash
npm run generate:client
```

Este comando genera el SDK del cliente, tipos TypeScript, hooks de React Query y configuración de MSW para el frontend.

### Ejecutar el servidor

```bash
npm run start:server
```

El servidor se iniciará en http://localhost:3000 por defecto con recarga automática.

### Ejecutar el frontend

```bash
npm run start:front
```

El frontend se iniciará en http://localhost:5173 por defecto.

#### Habilitar MSW (Mock Service Worker)

Para usar datos simulados en lugar de la API real, cree un archivo `.env` en la raíz del proyecto:

```bash
VITE_ENABLE_MSW=true
```

### Endpoints disponibles

- **GET /healthcheck**: Comprueba el estado del servidor
- **GET /pets**: Obtiene una lista de todas las mascotas
- **GET /pets/{petId}**: Obtiene una mascota específica por su ID

### Scripts disponibles

- `npm run start:server` - Ejecuta el servidor con recarga automática
- `npm run start:front` - Ejecuta el frontend en modo desarrollo
- `npm run generate:server` - Genera código del servidor desde OpenAPI
- `npm run generate:client` - Genera código del cliente desde OpenAPI
- `npm run build:front` - Construye el frontend para producción
- `npm run lint` - Ejecuta ESLint en todo el proyecto
- `npm run lint:fix` - Ejecuta ESLint y corrige errores automáticamente
- `npm run format` - Formatea el código con Prettier
- `npm run format:check` - Verifica el formato del código
- `npm run test` - Ejecuta los tests con Jest

## Estructura del proyecto

```
├── openapi-ts.server.config.ts  # Configuración para generar código del servidor
├── openapi-ts.client.config.ts  # Configuración para generar código del cliente
├── openapi.yaml                 # Especificación OpenAPI de la API
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración base de TypeScript
├── tsconfig.server.json         # Configuración específica del servidor
├── tsconfig.frontend.json       # Configuración específica del frontend
├── vite.config.ts               # Configuración de Vite para el frontend
├── jest.config.js               # Configuración de Jest para testing
├── eslint.config.js             # Configuración de ESLint
├── .prettierrc.js               # Configuración de Prettier
├── plugins/                     # Plugins personalizados para generación de código
│   ├── spec/                    # Plugin para generar configuración de Fastify
│   └── msw/                     # Plugin para generar mocks de MSW
├── src/
│   ├── server/                  # Implementación del servidor
│   │   ├── api.ts               # Configuración de la API
│   │   ├── index.ts             # Punto de entrada del servidor
│   │   └── controllers/         # Controladores para cada endpoint
│   ├── frontend/                # Aplicación React
│   │   ├── main.tsx             # Punto de entrada del frontend
│   │   ├── App.tsx              # Componente principal
│   │   ├── index.html           # Template HTML
│   │   ├── msw/                 # Configuración de Mock Service Worker
│   │   │   ├── handlers.ts      # Handlers de MSW
│   │   │   ├── browser.ts       # Configuración para navegador
│   │   │   ├── node.ts          # Configuración para Node.js
│   │   │   └── index.ts         # Exportaciones principales
│   │   └── public/              # Archivos estáticos
│   │       └── mockServiceWorker.js  # Worker de MSW
│   └── generated/               # Código generado automáticamente
│       ├── server/              # Tipos y configuración del servidor
│       └── client/              # SDK del cliente, tipos y hooks
```

## Tecnologías utilizadas

### Backend
- **TypeScript**: Para desarrollo con seguridad de tipos
- **Fastify**: Framework web rápido para Node.js
- **OpenAPI**: Para la definición y documentación de la API
- **@hey-api/openapi-ts**: Para generar código TypeScript desde la especificación OpenAPI

### Frontend
- **React**: Biblioteca para interfaces de usuario
- **TypeScript**: Para desarrollo con seguridad de tipos
- **Vite**: Herramienta de construcción y desarrollo rápido
- **TanStack Query**: Para gestión de estado del servidor
- **MSW (Mock Service Worker)**: Para mocking de APIs

### Herramientas de desarrollo
- **ESLint**: Para análisis estático de código
- **Prettier**: Para formateo automático de código
- **Jest**: Framework de testing con SWC para mayor velocidad
- **Plugins personalizados**: Para generación de código específico

## Desarrollo

### Modificar la API

1. Edite el archivo `openapi.yaml` para modificar la especificación de la API
2. Ejecute `npm run generate:server` para regenerar el código del servidor
3. Ejecute `npm run generate:client` para regenerar el código del cliente
4. Implemente la lógica en los controladores correspondientes

### Añadir nuevos endpoints

1. Añada la definición del nuevo endpoint en `openapi.yaml`
2. Genere el código con `npm run generate:server` y `npm run generate:client`
3. Cree un nuevo controlador en `src/server/controllers/`
4. Añada el controlador al índice en `src/server/controllers/index.ts`
5. Actualice los handlers de MSW en `src/frontend/msw/handlers.ts` si es necesario

### Desarrollo del frontend

1. Los componentes React están en `src/frontend/`
2. El SDK del cliente se genera automáticamente en `src/generated/client/`
3. Use los hooks de TanStack Query generados para las llamadas a la API
4. Configure MSW para desarrollo local con `VITE_ENABLE_MSW=true`

### Testing

El proyecto incluye configuración para testing con Jest:

```bash
npm run test
```

Los tests utilizan SWC para mayor velocidad y soporte para ESM.

### Plugins personalizados

#### Plugin MSW (`plugins/msw/`)
Genera automáticamente la función `createOpenApiHttp` tipada para MSW basada en la especificación OpenAPI.

#### Plugin Spec (`plugins/spec/`)
Genera configuración específica para Fastify basada en la especificación OpenAPI.

### Linting y formateo

```bash
# Verificar código
npm run lint
npm run format:check

# Corregir automáticamente
npm run lint:fix
npm run format
```
