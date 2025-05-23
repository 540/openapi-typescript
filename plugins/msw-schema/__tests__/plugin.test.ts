import { generateCode, loadFixture } from "./utils.js";

describe("msw-schema plugin", () => {
  test("should generate empty Paths interface for minimal OpenAPI with no paths", () => {
    const spec = loadFixture("minimal-openapi-no-paths.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate Paths interface for simple path with 201 response and no body", () => {
    const spec = loadFixture("simple-path-201-no-body.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate Paths interface with path parameters", () => {
    const spec = loadFixture("path-with-path-param.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate Paths interface with query parameters", () => {
    const spec = loadFixture("path-with-query-param.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate Paths interface with 200 response containing an object", () => {
    const spec = loadFixture("path-with-200-response-object.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate Paths interface with 401 error response", () => {
    const spec = loadFixture("path-with-401-error-response.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate Paths interface with 500 error response without body", () => {
    const spec = loadFixture("path-with-500-error-no-body.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });

  test("should generate Paths interface with request body and 201 response without body", () => {
    const spec = loadFixture("path-with-request-body.json");

    const generatedCode = generateCode(spec);

    expect(generatedCode).toMatchSnapshot();
  });
});
