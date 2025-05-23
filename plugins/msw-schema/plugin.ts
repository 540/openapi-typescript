import ts from "typescript";
import type { Plugin } from "@hey-api/openapi-ts";
import type { Config } from "./types.js";

// Definición de tipos para OpenAPI
interface OpenAPIParameter {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  schema?: Record<string, unknown>;
}

interface OpenAPIResponse {
  description: string;
  content?: Record<
    string,
    {
      schema?: Record<string, unknown>;
    }
  >;
}

interface OpenAPIOperation {
  summary?: string;
  operationId?: string;
  tags?: string[];
  parameters?: OpenAPIParameter[];
  requestBody?: {
    content?: Record<string, unknown>;
    required?: boolean;
  };
  responses?: Record<string, OpenAPIResponse>;
}

// Tipo para un objeto de ruta en OpenAPI
interface OpenAPIPathItem {
  parameters?: OpenAPIParameter[];
  summary?: string;
  description?: string;
  get?: OpenAPIOperation;
  put?: OpenAPIOperation;
  post?: OpenAPIOperation;
  delete?: OpenAPIOperation;
  options?: OpenAPIOperation;
  head?: OpenAPIOperation;
  patch?: OpenAPIOperation;
  trace?: OpenAPIOperation;

  [key: string]: any; // Para otras propiedades que puedan existir
}

// Tipo para el objeto paths en OpenAPI
interface OpenAPIPaths {
  [path: string]: OpenAPIPathItem;
}

// Tipo para el documento OpenAPI
interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths: OpenAPIPaths;
  components?: Record<string, any>;
}

export const handler: Plugin.Handler<Config> = ({ context, plugin }) => {
  const file = context.createFile({
    id: plugin.name,
    path: plugin.output,
  });

  // Tratar context.spec como OpenAPISpec
  const spec = context.spec as unknown as OpenAPISpec;

  // Obtener las rutas del spec
  const pathKeys = Object.keys(spec.paths ?? {});

  // Lista de métodos HTTP que queremos comprobar
  const httpMethods = [
    "get",
    "put",
    "post",
    "delete",
    "options",
    "head",
    "patch",
    "trace",
  ] as const;

  // Helper function to check if a parameter type exists in the operation
  const hasParameterType = (
    operation: OpenAPIOperation | undefined,
    paramType: string,
  ): boolean => {
    if (!operation) return false;

    // Check operation parameters
    const operationParams = operation.parameters || [];
    if (operationParams.some((param) => param.in === paramType)) {
      return true;
    }

    return false;
  };

  // Helper function to check if a request body exists in the operation
  const hasRequestBody = (operation: OpenAPIOperation | undefined): boolean => {
    return !!operation?.requestBody;
  };

  // Conjunto para almacenar los tipos que realmente se utilizan
  const usedTypes = new Set<string>();

  // Mapa para convertir operationId a tipos de respuestas
  const operationResponsesTypes: Record<string, string> = {};

  // Mapa para convertir operationId a tipos de errores
  const operationErrorsTypes: Record<string, string> = {};

  // Llenar los mapas de tipos de respuesta y error
  // Recorremos todas las rutas y métodos para encontrar los operationId
  for (const path of pathKeys) {
    const pathObj = spec.paths[path] ?? {};

    for (const method of httpMethods) {
      const methodObj = pathObj[method] as OpenAPIOperation | undefined;
      if (methodObj) {
        const operationId = methodObj.operationId;
        if (operationId) {
          // Convertir operationId a formato PascalCase para los tipos
          const typeName = operationId.charAt(0).toUpperCase() + operationId.slice(1);

          // Añadir al mapa de tipos de respuestas (plural)
          operationResponsesTypes[operationId] = `${typeName}Responses`;
          usedTypes.add(`${typeName}Responses`);

          // Añadir al mapa de tipos de errores (plural)
          operationErrorsTypes[operationId] = `${typeName}Errors`;
          usedTypes.add(`${typeName}Errors`);

          // Comprobar si necesitamos importar el tipo Data
          const hasPath = hasParameterType(methodObj, "path");
          const hasQuery = hasParameterType(methodObj, "query");
          const hasBody = hasRequestBody(methodObj);

          // Solo añadir el tipo Data si se utiliza alguna de sus propiedades
          if (hasPath || hasQuery || hasBody) {
            usedTypes.add(`${typeName}Data`);
          }
        }
      }
    }
  }

  // Convertir el conjunto a un array y ordenarlo
  const typesToImport = Array.from(usedTypes).sort();

  // Crear los elementos de importación con nombre
  const namedImports = typesToImport.map((type) =>
    ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(type)),
  );

  // Crear la declaración de importación con 'import type'
  const importDeclaration = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(true, undefined, ts.factory.createNamedImports(namedImports)),
    ts.factory.createStringLiteral("./types.gen.js"),
  );

  // Añadir la importación al archivo
  file.add(importDeclaration);

  // Ya no necesitamos estas funciones porque vamos a derivar los parámetros directamente del tipo Data

  // Crear una propiedad para cada ruta
  const members = pathKeys.map((path) => {
    const pathObj = spec.paths[path] ?? {};

    // Obtener los parámetros a nivel de ruta (no utilizados actualmente)
    // const pathParameters = pathObj.parameters || [];

    // Crear propiedades para cada método HTTP
    const methodMembers = httpMethods.map((method) => {
      // Comprobar si el método existe en la ruta
      const methodExists = !!pathObj[method];
      const methodObj = pathObj[method] as OpenAPIOperation | undefined;

      // Si el método existe, crear una propiedad con la estructura de parámetros
      if (methodExists && methodObj) {
        // Obtener el operationId para este método
        const operationId = methodObj.operationId;

        // Crear un array de propiedades para el método
        const methodProperties = [];

        // Si hay un operationId, añadir las propiedades derivadas del tipo Data
        if (operationId) {
          // Convertir operationId a formato PascalCase para los tipos
          const typeName = operationId.charAt(0).toUpperCase() + operationId.slice(1);

          // Crear una referencia al tipo Data para este operationId
          const dataType = `${typeName}Data`;

          // Añadir la propiedad parameters derivada del tipo Data
          // Crear un tipo indexado para acceder a las propiedades query y path (sin header ni cookie)
          const parametersProperties = ["query", "path"].map((paramType) => {
            // Check if this parameter type exists in the operation
            const paramExists = hasParameterType(methodObj, paramType);

            // If the parameter doesn't exist, use ?: never directly
            if (!paramExists) {
              return ts.factory.createPropertySignature(
                undefined,
                ts.factory.createIdentifier(paramType),
                ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
              );
            }

            // Otherwise, reference the Data type
            return ts.factory.createPropertySignature(
              undefined,
              ts.factory.createIdentifier(paramType),
              undefined,
              ts.factory.createIndexedAccessTypeNode(
                ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(dataType)),
                ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(paramType)),
              ),
            );
          });

          // Añadir la propiedad parameters
          methodProperties.push(
            ts.factory.createPropertySignature(
              undefined,
              ts.factory.createIdentifier("parameters"),
              undefined,
              ts.factory.createTypeLiteralNode(parametersProperties),
            ),
          );

          // Crear una estructura de respuestas con el formato requerido
          // Primero, verificamos si existen los tipos correspondientes
          if (operationResponsesTypes[operationId] || operationErrorsTypes[operationId]) {
            const responsesType = operationResponsesTypes[operationId];
            const errorsType = operationErrorsTypes[operationId];

            // Crear un objeto literal para las respuestas
            const responsesProperties = [];

            // Función base para crear una propiedad de respuesta con headers y content
            const createBaseResponseProperty = (
              statusCode: string,
              contentValue: ts.TypeNode
            ) => {
              // Crear la propiedad headers
              const headersProperty = ts.factory.createPropertySignature(
                undefined,
                ts.factory.createIdentifier("headers"),
                undefined,
                ts.factory.createTypeLiteralNode([
                  ts.factory.createIndexSignature(
                    undefined,
                    [
                      ts.factory.createParameterDeclaration(
                        undefined,
                        undefined,
                        ts.factory.createIdentifier("name"),
                        undefined,
                        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                        undefined,
                      ),
                    ],
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
                  ),
                ]),
              );

              // Crear la propiedad content con application/json
              const contentProperty = ts.factory.createPropertySignature(
                undefined,
                ts.factory.createIdentifier("content"),
                undefined,
                ts.factory.createTypeLiteralNode([
                  ts.factory.createPropertySignature(
                    undefined,
                    ts.factory.createStringLiteral("application/json"),
                    undefined,
                    contentValue,
                  ),
                ]),
              );

              // Crear el tipo de respuesta completo para este código de estado
              return ts.factory.createPropertySignature(
                undefined,
                ts.factory.createNumericLiteral(statusCode),
                undefined,
                ts.factory.createTypeLiteralNode([headersProperty, contentProperty]),
              );
            };

            // Función para crear una propiedad de respuesta exitosa
            const createSuccessResponseProperty = (statusCode: string) => {
              const contentValue = ts.factory.createIndexedAccessTypeNode(
                ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(responsesType!)),
                ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(statusCode)),
              );

              return createBaseResponseProperty(statusCode, contentValue);
            };

            // Función para crear una propiedad de respuesta de error
            const createErrorResponseProperty = (statusCode: string) => {
              const contentValue = ts.factory.createIndexedAccessTypeNode(
                ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(errorsType!)),
                ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(statusCode)),
              );

              return createBaseResponseProperty(statusCode, contentValue);
            };

            // Obtener los códigos de estado de las respuestas y errores del spec
            const getStatusCodes = (operation: OpenAPIOperation | undefined, isError: boolean) => {
              if (!operation?.responses) return [];

              // Filtrar los códigos de estado según si son de éxito o error
              return Object.keys(operation.responses).filter((code) => {
                const codeNum = parseInt(code, 10);
                if (isError) {
                  return codeNum >= 400; // Códigos de error
                } else {
                  return codeNum >= 200 && codeNum < 400; // Códigos de éxito
                }
              });
            };

            // Añadir propiedades para los códigos de estado de éxito
            if (responsesType) {
              const successCodes = getStatusCodes(methodObj, false);
              for (const code of successCodes) {
                responsesProperties.push(createSuccessResponseProperty(code));
              }
            }

            // Añadir propiedades para los códigos de estado de error
            if (errorsType) {
              const errorCodes = getStatusCodes(methodObj, true);
              for (const code of errorCodes) {
                responsesProperties.push(createErrorResponseProperty(code));
              }
            }

            // Añadir la propiedad responses con el tipo de objeto literal
            methodProperties.push(
              ts.factory.createPropertySignature(
                undefined,
                ts.factory.createIdentifier("responses"),
                undefined,
                ts.factory.createTypeLiteralNode(responsesProperties),
              ),
            );
          }

          // Añadir la propiedad requestBody
          // Check if this operation has a request body
          const hasBody = hasRequestBody(methodObj);

          if (!hasBody) {
            // If there's no request body, use ?: never directly
            methodProperties.push(
              ts.factory.createPropertySignature(
                undefined,
                ts.factory.createIdentifier("requestBody"),
                ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
              ),
            );
          } else {
            // Otherwise, reference the Data type
            const bodyAccessExpression = ts.factory.createIndexedAccessTypeNode(
              ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(dataType)),
              ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral("body")),
            );

            // Añadir la propiedad requestBody
            methodProperties.push(
              ts.factory.createPropertySignature(
                undefined,
                ts.factory.createIdentifier("requestBody"),
                undefined,
                bodyAccessExpression,
              ),
            );
          }
        }

        return ts.factory.createPropertySignature(
          undefined,
          ts.factory.createIdentifier(method),
          undefined,
          ts.factory.createTypeLiteralNode(methodProperties),
        );
      } else {
        // Si el método no existe, crear una propiedad opcional con valor never
        return ts.factory.createPropertySignature(
          undefined,
          ts.factory.createIdentifier(method),
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
        );
      }
    });

    // Crear un nodo de tipo literal con las propiedades de los métodos HTTP
    return ts.factory.createPropertySignature(
      undefined,
      ts.factory.createStringLiteral(path),
      undefined,
      ts.factory.createTypeLiteralNode(methodMembers),
    );
  });

  const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    "Paths",
    undefined,
    undefined,
    members,
  );

  file.add(interfaceDeclaration);
};
