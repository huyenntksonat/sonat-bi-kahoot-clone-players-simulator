import { Injectable } from '@nestjs/common';
import { KahootService } from 'src/third-party/service/kahoot.service';
import { PushQuestionDto } from './dto/push-question.dto';

@Injectable()
export class PlayersService {
  constructor(private readonly kahootService: KahootService) {}

  async delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  joinGame(pin: string) {
    return this.kahootService.joinGame(pin);
  }

  async pushQuestion(pin: string, dto: PushQuestionDto) {
    await this.delay(5000);
    // send answers to kahoot
    await this.kahootService.answer(pin, dto);

    // call host app to process 
    return `All players have answered question`;
  }
}
