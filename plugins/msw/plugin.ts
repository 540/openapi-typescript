import * as ts from "typescript";
import openapiTS, { type OpenAPI3 } from "openapi-typescript";
import type { Plugin } from "@hey-api/openapi-ts";
import type { Config } from "./types.js";

export const handler: Plugin.Handler<Config> = async ({ context, plugin }) => {
  try {
    const file = context.createFile({
      id: plugin.name,
      path: plugin.output,
      exportFromIndex: plugin.exportFromIndex,
    });

    const openapiMswImport = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(
            false,
            ts.factory.createIdentifier("createOpenApiHttp"),
            ts.factory.createIdentifier("baseCreateOpenApiHttp"),
          ),
        ]),
      ),
      ts.factory.createStringLiteral("openapi-msw"),
    );

    const createOpenApiHttpExport = ts.factory.createVariableStatement(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      ts.factory.createVariableDeclarationList(
        [
          ts.factory.createVariableDeclaration(
            ts.factory.createIdentifier("createOpenApiHttp"),
            undefined,
            ts.factory.createTypeReferenceNode(
              ts.factory.createIdentifier("typeof baseCreateOpenApiHttp"),
              [ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("paths"))],
            ),
            ts.factory.createIdentifier("baseCreateOpenApiHttp"),
          ),
        ],
        ts.NodeFlags.Const,
      ),
    );

    const openapiSchema = await openapiTS(context.spec as OpenAPI3);

    file.add(openapiMswImport);
    file.add(createOpenApiHttpExport);
    file.add(...openapiSchema);
  } catch (error) {
    console.error("Error generando tipos paths:", error);
    throw error;
  }
};
