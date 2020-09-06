export interface Environment {
  readonly config: string;
  readonly identity: object;
  readonly name: string;
  readonly production: boolean;
  readonly release: string;
}
