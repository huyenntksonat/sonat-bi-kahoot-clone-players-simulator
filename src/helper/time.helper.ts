export class TimeHelper {
  static async delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
