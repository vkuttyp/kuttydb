declare module "bun:sqlite" {
  export class Database {
    constructor(filename: string, options?: any);
    prepare(sql: string): Statement;
    close(): void;
  }

  export class Statement {
    all(...params: any[]): any[];
    get(...params: any[]): any;
    run(...params: any[]): void;
    finalize(): void;
  }
}
