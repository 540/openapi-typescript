# API POC - Pets API

Una API de demostración (Proof of Concept) que proporciona endpoints para gestionar información sobre mascotas utilizando TypeScript, Fastify y OpenAPI.

## Descripción

Este proyecto implementa una API REST basada en una especificación OpenAPI que permite:
- Recuperar una lista de todas las mascotas
- Obtener información detallada sobre una mascota específica por su ID

La API está construida utilizando Fastify como framework web y aprovecha la generación de código TypeScript a partir de la especificación OpenAPI para garantizar una implementación con seguridad de tipos.

## Estructura del Monorepo

Este proyecto está estructurado como un monorepo que contiene dos paquetes principales:

### Paquete Cliente (`@ied/api-client`)

El paquete cliente proporciona:
- SDK tipado para consumir la API de Pets desde aplicaciones JavaScript/TypeScript
- Tipos generados automáticamente desde la especificación OpenAPI
- Integración con [TanStack Query](https://tanstack.com/query/latest) para React
- Cliente HTTP basado en fetch para consumir los endpoints de la API

### Paquete Servidor (`@ied/api-server`)

El paquete servidor ofrece:
- Plugin de Fastify para implementar la API según la especificación OpenAPI
- Validación de peticiones y respuestas basada en esquemas OpenAPI
- Tipos y esquemas generados automáticamente
- Integración con fastify-openapi-glue para enrutar peticiones a los controladores

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

### Construcción de los paquetes

Para construir todos los paquetes del monorepo:

```bash
npm run build
```

Este comando genera código TypeScript a partir de la especificación OpenAPI para ambos paquetes (cliente y servidor) y luego construye los paquetes con tsup.

### Construcción individual de paquetes

Para construir solo el paquete cliente:

```bash
cd packages/client
npm run build
```

Para construir solo el paquete servidor:

```bash
cd packages/server
npm run build
```

### Uso del paquete servidor

Cuando implementes una API con el paquete servidor:

```typescript
import fastify from 'fastify';
import { apiPlugin } from '@ied/api-server';
import * as handlers from './handlers';

const app = fastify();

// Registrar el plugin de la API con los controladores
await app.register(apiPlugin, {
  handlers
});

await app.listen({ port: 3000 });
```

### Uso del paquete cliente

Para consumir la API desde una aplicación:

```typescript
import { createClient } from '@ied/api-client';

// Crear un cliente para la API
const client = createClient({
  baseUrl: 'http://localhost:3000'
});

// Usar el cliente para llamar a los endpoints
const pets = await client.getPets();
const pet = await client.getPetById({ petId: '123' });
```

### Con React Query

```typescript
import { useGetPets, useGetPetById } from '@ied/api-client';

function PetsList() {
  const { data: pets, isLoading } = useGetPets();
  // ...
}

function PetDetails({ petId }) {
  const { data: pet } = useGetPetById({ petId });
  // ...
}
```

### Endpoints disponibles

- **GET /healthcheck**: Comprueba el estado del servidor
- **GET /pets**: Obtiene una lista de todas las mascotas
- **GET /pets/{petId}**: Obtiene una mascota específica por su ID

## Estructura del proyecto

```
├── openapi.yaml                 # Especificación OpenAPI de la API
├── package.json                 # Dependencias y scripts del monorepo
├── tsconfig.json                # Configuración de TypeScript
├── packages/                    # Paquetes del monorepo
│   ├── client/                  # Paquete cliente (@ied/api-client)
│   │   ├── openapi-ts.config.ts # Configuración para generar código cliente
│   │   ├── package.json         # Dependencias del cliente
│   │   ├── tsconfig.json        # Configuración TypeScript del cliente
│   │   └── src/                 # Código fuente del cliente
│   │       ├── client.gen.ts    # Cliente HTTP generado
│   │       ├── index.ts         # Punto de entrada del paquete
│   │       ├── sdk.gen.ts       # SDK tipado generado
│   │       ├── types.gen.ts     # Tipos generados
│   │       └── @tanstack/       # Integración con React Query
│   └── server/                  # Paquete servidor (@ied/api-server)
│       ├── openapi-ts.config.ts # Configuración para generar código servidor
│       ├── package.json         # Dependencias del servidor
│       ├── tsconfig.json        # Configuración TypeScript del servidor
│       └── src/                 # Código fuente del servidor
│           ├── index.ts         # Plugin de Fastify para la API
│           └── generated/       # Código generado automáticamente
│               ├── fastify.gen.ts # Configuración de Fastify
│               ├── spec.gen.ts    # Especificación procesada
│               └── types.gen.ts   # Tipos generados
└── plugins/                     # Plugins para la generación de código
    └── spec/                    # Plugin para procesar la especificación
```

## Tecnologías utilizadas

- **TypeScript**: Para desarrollo con seguridad de tipos
- **Fastify**: Framework web rápido para Node.js
- **OpenAPI**: Para la definición y documentación de la API
- **@hey-api/openapi-ts**: Para generar código TypeScript desde la especificación OpenAPI
- **TanStack Query**: Para gestión de estado y caché en el cliente
- **tsup**: Para empaquetar los paquetes TypeScript
- **Workspaces de npm**: Para gestionar el monorepo

## Desarrollo

### Flujo de trabajo con el monorepo

1. Edite el archivo `openapi.yaml` en la raíz para modificar la especificación de la API
2. Ejecute `npm run build` para regenerar el código en ambos paquetes
3. Implemente los controladores del servidor utilizando el paquete servidor
4. Utilice el paquete cliente para consumir la API en sus aplicaciones

### Modificar la API

1. Edite el archivo `openapi.yaml` para modificar la especificación de la API
2. Ejecute `npm run build` para regenerar el código en ambos paquetes
3. Implemente la lógica en los controladores de su aplicación

### Añadir nuevos endpoints

1. Añada la definición del nuevo endpoint en `openapi.yaml`
2. Genere el código con `npm run build`
3. Implemente los controladores para los nuevos endpoints
4. Utilize los nuevos métodos generados en el cliente para consumir los endpoints

### Publicación de los paquetes

Este proyecto utiliza [Changesets](https://github.com/changesets/changesets) para gestionar los cambios de versiones, generar changelogs y publicar paquetes a GitHub Packages.

#### Flujo de trabajo de CI/CD

1. **Desarrollo de feature**:
   ```bash
   # Crea una rama de trabajo
   git checkout -b feature/nueva-funcionalidad
   
   # Haz tus cambios en la especificación OpenAPI o en los paquetes
   # ...
   
   # Crea un changeset para documentar los cambios
   npm run changeset
   ```

2. **Validación CI**:
   - Cuando creas una PR a `main`, las GitHub Actions verifican:
     - La especificación OpenAPI mediante linting
     - La correcta construcción de los paquetes
     - La presencia de changesets para documentar cambios

3. **Merge a main**:
   - Después de la aprobación y merge, se ejecuta el flujo de CD

4. **Publicación automática**:
   - El flujo de CD:
     - Genera código a partir de la especificación OpenAPI
     - Crea una PR de release con los cambios de versión o publica directamente
     - Publica los paquetes en GitHub Packages

#### Publicación manual

Para crear manualmente un changeset:

```bash
npm run changeset
# Sigue las instrucciones para seleccionar paquetes y tipo de cambio
```

Para publicar manualmente los paquetes:

```bash
npm run version  # Actualiza versiones según los changesets
npm run release  # Construye y publica los paquetes a GitHub Packages
```