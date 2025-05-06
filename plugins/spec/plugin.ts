import ts from "typescript";

import type { Plugin } from "@hey-api/openapi-ts";

import type { Config } from "./types.js";
import { createObjectLiteralExpression } from "./lib/factory.js";

export const handler: Plugin.Handler<Config> = ({ context, plugin }) => {
  const file = context.createFile({
    id: plugin.name,
    path: plugin.output,
    exportFromIndex: plugin.exportFromIndex,
  });

  const specVariableDeclaration = ts.factory.createVariableDeclaration(
    plugin.output,
    undefined,
    undefined,
    ts.factory.createAsExpression(
      createObjectLiteralExpression(context.spec, plugin.useSingleQuotes),
      ts.factory.createTypeReferenceNode('const')
    )
  );
  const specVariableStatement = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [specVariableDeclaration],
      ts.NodeFlags.Const
    )
  );
  file.add(specVariableStatement);
};