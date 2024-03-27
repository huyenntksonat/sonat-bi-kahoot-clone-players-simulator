import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseThirdPartyService } from './base-thirdparty.service';
import { KahootService } from './kahoot.service';

@Module({
  imports: [HttpModule],
  providers: [BaseThirdPartyService, KahootService],
  exports: [BaseThirdPartyService, KahootService],
})
export class ThirdPartyModule { }
