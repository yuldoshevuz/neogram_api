import { Controller, Get, Query } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { GetOriginalLinkDto, GetInstaStoriesDto } from 'src/dto/get.original.link.dto';

@Controller('instagram')
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) {}

    @Get()
    async getPost(@Query() queryData: GetOriginalLinkDto ) {
        return this.instagramService.getOriginalUrl(queryData)
    }

    @Get("stories")
    async getStories(@Query() quertDto: GetInstaStoriesDto) {
        return await this.instagramService.getStories(quertDto)
    }
}
