import { Controller, Get, Query } from '@nestjs/common';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';
import { FacebookService } from './facebook.service';

@Controller('facebook')
export class FacebookController {
    constructor(private readonly facebookService: FacebookService) {}

    @Get()
    async getPost(@Query() queryData: GetOriginalLinkDto) {
        return this.facebookService.getOriginalUrl(queryData)
    }
}
