import { Injectable } from '@nestjs/common';
import { KahootService } from 'src/third-party/service/kahoot.service';

@Injectable()
export class PlayersService {
    constructor(
        private readonly kahootService: KahootService
    ) { }

    joinGame(pin: string) {
        return this.kahootService.joinGame(pin);
    }
}
