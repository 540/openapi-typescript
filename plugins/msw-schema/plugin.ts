import * as ts from "typescript";
import path from "path";
import fs from "fs";
import openapiTS, { astToString, type OpenAPI3 } from "openapi-typescript";
import type { Plugin } from "@hey-api/openapi-ts";
import type { Config } from "./types.js";

export const handler: Plugin.Handler<Config> = async ({ context, plugin }) => {
  // Crear el archivo msw-schema.gen.ts
  const file = context.createFile({
    id: plugin.name,
    path: plugin.output,
    exportFromIndex: plugin.exportFromIndex,
  });

  // Crear la importación de openapi-msw
  const openapiMswImport = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
      false,
      undefined,
      ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(
          false,
          ts.factory.createIdentifier("createOpenApiHttp"),
          ts.factory.createIdentifier("baseCreateOpenApiHttp")
        )
      ])
    ),
    ts.factory.createStringLiteral("openapi-msw")
  );

  // Ya no necesitamos importar paths desde un archivo externo
  // porque lo vamos a generar en el mismo archivo

  // Crear la exportación de createOpenApiHttp tipado con paths (sin ejecutar)
  const createOpenApiHttpExport = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier("createOpenApiHttp"),
          undefined,
          ts.factory.createTypeReferenceNode(
            ts.factory.createIdentifier("typeof baseCreateOpenApiHttp"),
            [ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("paths"))]
          ),
          ts.factory.createIdentifier("baseCreateOpenApiHttp")
        )
      ],
      ts.NodeFlags.Const
    )
  );

  // Añadir la importación al archivo
  file.add(openapiMswImport);

  // Añadir la exportación al archivo
  file.add(createOpenApiHttpExport);

  // Generar el tipo paths usando openapi-typescript y añadirlo al final del archivo
  try {
    // Usar la API programática de openapi-typescript
    const ast = await openapiTS(context.spec as OpenAPI3);

    // Añadir directamente los nodos AST generados por openapi-typescript
    ast.forEach(node => {
      file.add(node);
    });
  } catch (error) {
    console.error("Error generando tipos paths:", error);
    throw error;
  }
};
