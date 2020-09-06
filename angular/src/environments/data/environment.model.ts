export interface Environment {
  readonly config: string;
  readonly identity: any;
  readonly name: string;
  readonly production: boolean;
  readonly release: string;
}
