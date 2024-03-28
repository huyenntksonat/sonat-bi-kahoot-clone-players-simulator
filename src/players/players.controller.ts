import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PushQuestionDto } from './dto/push-question.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('join-game/:pin')
  joinGame(@Param('pin') pin: string) {
    return this.playersService.joinGame(pin);
  }

  @Post(':pin/push-question')
  pushQuestion(
    @Param('pin') pin: string, 
    @Body() dto: PushQuestionDto
  ): any {
    // console.log(`Arriving at push question controller`);
    return this.playersService.pushQuestion(pin, dto);
  }
}
