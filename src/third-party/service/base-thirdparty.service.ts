import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { time } from 'console';

@Injectable()
export class BaseThirdPartyService {
  constructor(private readonly httpService: HttpService) {}

  async sendPost(
    url: string,
    requestBody: any,
    headers?: Record<string, string>,
  ): Promise<any> {
    var start = Date.now();
    const { data } = await firstValueFrom(
      this.httpService.post(url, requestBody, { headers: headers }).pipe(
        catchError((er: AxiosError) => {
          // console.log(`An error happened: `, er);
          throw er;
        }),
      ),
    );
    var end = Date.now();
    console.log(
      `Url = ${url}\tStart = ${start}\tEnd = ${end}\tDuration = ${Math.abs(end - start)}`,
    );
    return data;
  }
}
