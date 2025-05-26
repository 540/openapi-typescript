import { generateCode, loadFixture } from "./utils.js";

describe("msw-schema plugin", () => {
  test("should generate correct TypeScript interfaces for empty OpenAPI spec", async () => {
    const spec = loadFixture("minimal-openapi-no-paths.json");

    const generatedCode = await generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate correct TypeScript interfaces for basic API endpoints", async () => {
    const spec = loadFixture("simple-path-201-no-body.json");

    const generatedCode = await generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate correct TypeScript interfaces for endpoints with request bodies", async () => {
    const spec = loadFixture("path-with-request-body.json");

    const generatedCode = await generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate correct TypeScript interfaces for endpoints with complex responses", async () => {
    const spec = loadFixture("path-with-200-response-object.json");

    const generatedCode = await generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });
});
