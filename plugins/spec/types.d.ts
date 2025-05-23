export interface Config {
  /**
   * Plugin name. Must be unique.
   */
  name: "spec";
  /**
   * Name of the generated file.
   *
   * @default 'spec'
   */
  output?: string;
  /**
   * Use single quotes instead of double quotes in the generated files.
   *
   * @default 'false'
   */
  useSingleQuotes?: boolean;
  /**
   * Should the exports from the generated files be re-exported in the index
   * barrel file?
   *
   * @default false
   */
  exportFromIndex?: boolean;
}
