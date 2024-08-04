import { Controller, Get, Query } from '@nestjs/common';
import { TiktokService } from './tiktok.service';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';

@Controller('tiktok')
export class TiktokController {
    constructor(private readonly tiktokService: TiktokService) {}

    @Get()
    async getPost(@Query() queryData: GetOriginalLinkDto) {
        return this.tiktokService.getOriginalUrl(queryData)
    }
}
