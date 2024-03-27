import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { ThirdPartyModule } from 'src/third-party/service/thirdparty.module';

@Module({
  imports: [ThirdPartyModule],
  providers: [PlayersService],
  controllers: [PlayersController],
  exports: [PlayersService]
})
export class PlayersModule {}
