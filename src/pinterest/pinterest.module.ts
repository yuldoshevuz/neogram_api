import { Module } from '@nestjs/common';
import { PinterestController } from './pinterest.controller';
import { PinterestService } from './pinterest.service';

@Module({
  controllers: [PinterestController],
  providers: [PinterestService]
})
export class PinterestModule {}
