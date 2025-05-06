import ts from "typescript";

export function createObjectLiteralExpression(obj: unknown, useSingleQuotes?: boolean): ts.Expression {
  if (obj === null) {
    return ts.factory.createNull();
  }

  if (typeof obj === "string") {
    return ts.factory.createStringLiteral(obj, useSingleQuotes);
  }

  if (typeof obj === "number") {
    return ts.factory.createNumericLiteral(obj);
  }

  if (typeof obj === "boolean") {
    return obj ? ts.factory.createTrue() : ts.factory.createFalse();
  }

  if (Array.isArray(obj)) {
    const elements = obj.map((item) => createObjectLiteralExpression(item, useSingleQuotes));
    return ts.factory.createArrayLiteralExpression(elements, true);
  }

  if (typeof obj === "object") {
    const properties = Object.entries(obj).map(([key, value]) => {
      return ts.factory.createPropertyAssignment(
        ts.factory.createStringLiteral(key, useSingleQuotes),
        createObjectLiteralExpression(value, useSingleQuotes)
      );
    });

    return ts.factory.createObjectLiteralExpression(properties, true);
  }

  // Default fallback for any other types
  return ts.factory.createNull();
}