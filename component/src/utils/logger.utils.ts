export class Logger {
  constructor(private readonly name: string = "") {}

  log(message: any, ...optionalParams: any[]) {
    console.log(`${this.name} - ${message}`, ...optionalParams);
  }
}
