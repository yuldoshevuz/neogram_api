import { Module } from '@nestjs/common';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule ],
  controllers: [YoutubeController],
  providers: [YoutubeService]
})
export class YoutubeModule {}
