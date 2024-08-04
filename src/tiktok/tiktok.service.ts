import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';

@Injectable()
export class TiktokService {
    async getOriginalUrl(query: GetOriginalLinkDto) {
        const { data } = await axios.get<any>(`https://tiktok-dl.hazex.workers.dev/?url=${query.url}`)

        if (!data.result.download_url.without_watermark) {
            throw new NotFoundException("The media not found or invalid URL.")
        }

        return {
            ok: true,
            link: data.result.download_url.without_watermark
        }
    }
}
