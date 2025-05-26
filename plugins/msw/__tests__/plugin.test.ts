import { generateCode, loadFixture } from "./utils.js";

describe("msw plugin", () => {
  const testCases = [
    {
      fixture: "minimal-openapi-no-paths.json",
      description: "should generate correct TypeScript interfaces for empty OpenAPI spec",
    },
    {
      fixture: "simple-path-201-no-body.json",
      description: "should generate correct TypeScript interfaces for basic API endpoints",
    },
    {
      fixture: "path-with-request-body.json",
      description: "should generate correct TypeScript interfaces for endpoints with request bodies",
    },
    {
      fixture: "path-with-200-response-object.json",
      description: "should generate correct TypeScript interfaces for endpoints with complex responses",
    },
  ];

  it.each(testCases)("$description", async ({ fixture }) => {
    const spec = loadFixture(fixture);

    const generatedCode = await generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });
});
