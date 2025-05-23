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
}
