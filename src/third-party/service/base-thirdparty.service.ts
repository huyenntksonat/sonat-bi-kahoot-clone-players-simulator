import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseThirdPartyService {
  constructor(private readonly httpService: HttpService) { }

  async sendPost(
    url: string,
    requestBody: any,
    headers?: Record<string, string>,
  ): Promise<any> {
    const { data } = await firstValueFrom(this.httpService.post(
      url,
      requestBody,
      { headers: headers }
    ).pipe(
      catchError((er: AxiosError) => {
        // console.log(`An error happened: `, er);
        throw er;
      })
    ))
    return data;
  }
}
