import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, last, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { time } from 'console';
import { SubmitAnswerDto } from '../dto/submit-answer.dto';

@Injectable()
export class BaseThirdPartyService {
  constructor(private readonly httpService: HttpService) {}

  async sendPost(
    url: string,
    requestBody: any,
    headers?: Record<string, string>,
  ): Promise<any> {
    var start = Date.now();

    const { data } = await lastValueFrom(
      this.httpService.post(url, requestBody, { headers: headers }).pipe(
        catchError((er: AxiosError) => {
          console.log(`An error happened: `, er);
          throw er;
        }),
      ),
    );
    var end = Date.now();
    if((requestBody as SubmitAnswerDto).submitAnswerTime != null) {
      const tmp = JSON.parse(JSON.stringify(data.data));
      const time = Number(tmp.time)*1000;
      const pointQues = Number(tmp.pointQues);
      const startQuestionTime = Number(tmp.startQuestionTime);
      const submitQuestionTime = (requestBody as SubmitAnswerDto).submitAnswerTime.getTime();
      let pointCalculate = pointQues * (1-(submitQuestionTime-startQuestionTime)/time);
      if(!tmp.TorF) pointCalculate = 0;
      console.log(
        `${start}, ${end}, ${Math.abs(end - start)}, ${(requestBody as SubmitAnswerDto).displayName}, ${tmp.point}, ${pointCalculate}`,
      );
    }
    else {
      console.log(
        `${start}, ${end}, ${Math.abs(end - start)}, ${(requestBody as SubmitAnswerDto).displayName}`,
      );
    }
    return data;
  }

  async sendGet(url: string, headers?: Record<string, string>): Promise<any> {
    var start = Date.now();
    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers: headers }).pipe(
        catchError((er: AxiosError) => {
          console.log(`An error happened: `, er);
          throw er;
        }),
      ),
    );
    var end = Date.now();
    console.log(
      `${start}, ${end}, ${Math.abs(end - start)}`,
    );
    return data;
  }
}
