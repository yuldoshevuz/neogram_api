import { Controller, Get, Query } from '@nestjs/common';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';
import { PinterestService } from './pinterest.service';

@Controller('pinterest')
export class PinterestController {
    constructor(private readonly pinterestService: PinterestService) {}

    @Get()
    async getPost(@Query() queryData: GetOriginalLinkDto) {
        return this.pinterestService.getOriginalUrl(queryData)
    }
}
