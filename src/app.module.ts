import { Module } from '@nestjs/common';
import { InstagramModule } from './instagram/instagram.module';
import { ConfigModule } from '@nestjs/config';
import { YoutubeModule } from './youtube/youtube.module';
import { PinterestModule } from './pinterest/pinterest.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InstagramModule,
    YoutubeModule,
    PinterestModule
  ]
})
export class AppModule {}
