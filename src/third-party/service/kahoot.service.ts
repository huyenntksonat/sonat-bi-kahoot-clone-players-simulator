import { Injectable } from '@nestjs/common';
import { BaseThirdPartyService } from './base-thirdparty.service';
import { JoinGameDto } from '../dto/join-game.dto';
import { DISPLAY_NAMES } from 'src/constants/config.constant';
import { KAHOOT_F8_BASE_URL } from '../constant/url.constant';

@Injectable()
export class KahootService extends BaseThirdPartyService {

    joinGame(pin: string) {
        // create 100 thread
        const dtoList: JoinGameDto[] = DISPLAY_NAMES.map(item => new JoinGameDto({
            displayName: item
        }));
        const requests = Array.from(dtoList, (item) => {
            this.joinGameOne(pin, item)
        });
        const responses = Promise.all(requests);
        // const successfulResponses = responses.filter(response => response);
        // return successfulResponses.length;
        return `Join game successfully`
    }

    async joinGameOne(pin: string, dto: JoinGameDto): Promise<boolean> {
        try {
            var response = await this.sendPost(
                `${KAHOOT_F8_BASE_URL}/games/${pin}/join`,
                dto
            )
            return response.statusCode == 201
        } catch (e) {
            return false;
        }
    }
}
