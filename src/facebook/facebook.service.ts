import { Injectable, NotFoundException } from '@nestjs/common';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';
import * as downloader from "rahad-media-downloader"

@Injectable()
export class FacebookService {
    async getOriginalUrl(query: GetOriginalLinkDto) {
        const result = await downloader.rahadfbdl(query.url)

        if (!result.data) {
            throw new NotFoundException("The media not found or invalid URL.")
        }

        return {
            ok: true,
            link: result.data.hd
        }
    }
}
