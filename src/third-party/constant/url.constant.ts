export class UrlConstants {
  static KAHOOT_F8_BASE_URL = 'https://kahoot-f8-apis.sonatgame.com';
  // static KAHOOT_F8_BASE_URL = 'http://localhost:5050';
  static HOST_SIMULATOR_BASE_URL = 'http://localhost:8001';
  static JOIN_GAME = 'games/:pin/join';

  static constructUrl(url: string, values: string[]) {
    const list: string[] = url.split('/');
    const regex = /^:(.)+/;
    const placeholders = list.filter((item) => regex.test(item));
    var i = 0;
    placeholders.forEach((element) => {
      url.replace(element, values[i++]);
    });
  }
}
