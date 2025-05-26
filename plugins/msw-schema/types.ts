export interface Config {
  /**
   * Plugin name. Must be unique.
   */
  name: "msw-schema";
  /**
   * Name of the generated file.
   *
   * @default 'msw-schema'
   */
  output?: string;
  /**
   * Should the exports from the generated files be re-exported in the index
   * barrel file?
   *
   * @default false
   */
  exportFromIndex?: boolean;
}

export interface OpenAPIOperation {
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

export interface OpenAPISpec {
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
  components?: Record<string, unknown>;
}

export interface OpenAPIParameter {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  schema?: Record<string, unknown>;
}

export interface OpenAPIResponse {
  description: string;
  content?: Record<
    string,
    {
      schema?: Record<string, unknown>;
    }
  >;
}

export interface OpenAPIPaths {
  [path: string]: OpenAPIPathItem;
}

export interface OpenAPIPathItem {
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

  [key: string]: unknown;
}
