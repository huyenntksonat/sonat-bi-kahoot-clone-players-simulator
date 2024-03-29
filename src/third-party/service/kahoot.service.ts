import { Injectable } from '@nestjs/common';
import { BaseThirdPartyService } from './base-thirdparty.service';
import { JoinGameDto } from '../dto/join-game.dto';
import { DISPLAY_NAMES } from 'src/constants/config.constant';
import { KAHOOT_F8_BASE_URL, UrlConstants } from '../constant/url.constant';
import { PushQuestionDto } from 'src/players/dto/push-question.dto';
import { SubmitAnswerDto } from '../dto/submit-answer.dto';
import { TimeHelper } from 'src/helper/time.helper';

@Injectable()
export class KahootService extends BaseThirdPartyService {
  joinGame(pin: string) {
    const dtoList: JoinGameDto[] = DISPLAY_NAMES.map(
      (item) =>
        new JoinGameDto({
          displayName: item,
        }),
    );
    const requests = dtoList.map((item) => {
      this.joinGameOne(pin, item);
    });
    const responses = Promise.all(requests);
    return `Join game successfully`;
  }

  async joinGameOne(pin: string, dto: JoinGameDto): Promise<boolean> {
    try {
      var response = await this.sendPost(
        `${UrlConstants.KAHOOT_F8_BASE_URL}/games/${pin}/join`,
        dto,
      );
      return response.statusCode == 201;
    } catch (e) {
      return false;
    }
  }

  async answer(pin: string, dto: PushQuestionDto) {    
    const dtoList: SubmitAnswerDto[] = DISPLAY_NAMES.map((item) => {
      const randomOption = dto.options[Math.floor(Math.random() * 4)];
      var optionId = randomOption['id'];
      return new SubmitAnswerDto({
        displayName: item,
        questionId: dto.question,
        optionId: optionId,
      });
    });
    const requests = dtoList.map((item) => {
      this.answerOne(pin, item);
    });
    const responses = await Promise.all(requests);
    return `All players answer successfully`;
  }

  async answerOne(pin: string, dto: SubmitAnswerDto): Promise<boolean> {
    try {
      await TimeHelper.delay(Math.floor(Math.random() + 2) * 1000);
      // console.log(`Start sending post to answer...`);

      var response = await this.sendPost(
        `${KAHOOT_F8_BASE_URL}/games/${pin}/answer`,
        dto,
      );
      // console.log(`Answering one question: `, response);

      return response.statusCode == 201;
    } catch (e) {
      // console.log(`Error sending answer: `, e);

      return false;
    }
  }
}
