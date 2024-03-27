import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
    constructor(
        private readonly playersService: PlayersService
    ) { }

    @Get('join-game/:pin')
    joinGame(@Param('pin') pin: string) {
        return this.playersService.joinGame(pin);
    }
}
