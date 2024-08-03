import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';

@Controller('youtube')
export class YoutubeController {
    constructor(private readonly youtubeService: YoutubeService) {}

    @Get()
    async getPost(@Query() queryData: GetOriginalLinkDto) {
        return this.youtubeService.getPost(queryData)
    }
}
