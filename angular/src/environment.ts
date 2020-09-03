export interface Environment {
  readonly config: string;
  readonly name: string;
  readonly production: boolean;
  readonly release: string;
}
