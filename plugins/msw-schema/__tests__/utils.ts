import type { OpenAPISpec } from "../types.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import * as ts from "typescript";
import type { IR } from "@hey-api/openapi-ts";
import { handler } from "../plugin.js";

const printNode = (nodes: ts.Node[]): string => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    "",
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  );
  return printer.printList(ts.ListFormat.MultiLine, ts.factory.createNodeArray(nodes), sourceFile);
};

export const loadFixture = (filename: string): OpenAPISpec => {
  const testDirName = dirname(fileURLToPath(import.meta.url));
  const fixturePath = path.join(testDirName, "fixtures", filename);
  const fixtureContent = fs.readFileSync(fixturePath, "utf-8");
  return JSON.parse(fixtureContent) as OpenAPISpec;
};

export const generateCode = async (spec: OpenAPISpec): Promise<string> => {
  const nodes: ts.Node[] = [];
  const context = {
    spec,
    createFile: () => {
      return {
        add: (node: ts.Node) => {
          nodes.push(node);
        },
      };
    },
  } as unknown as IR.Context;

  await handler({ context, plugin: { name: "msw-schema", output: "test.ts", exportFromIndex: true } });

  if (nodes.length === 0) {
    throw new Error("No se encontró la interfaz Paths");
  }

  return printNode(nodes);
};
