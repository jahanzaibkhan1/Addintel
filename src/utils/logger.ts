export class Logger {
  static log(title: string, data?: any) {
    console.log(`\n[${new Date().toISOString()}] ${title}`);
    if (data !== undefined) {
      console.dir(data, { depth: null });
    }
  }

  static step(step: string) {
    console.log(`\n ${step}`);
  }

  static error(message: string, error?: any) {
    console.error(`\n ${message}`);
    if (error) console.error(error);
  }
}