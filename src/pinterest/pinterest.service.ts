import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';

@Injectable()
export class PinterestService {
    async getOriginalUrl(query: GetOriginalLinkDto) {
        const response: { data: string } = await axios.get<string>(query.url).catch(() => {
            throw new BadRequestException("INVALID URL")
        })
            
        const regex = /https:\/\/(v1\.pinimg\.com\/videos\/mc\/720p\/|i\.pinimg\.com\/originals\/)[a-z\/0-9]*\.(mp4|jpg)/mg

        const urls = response.data.match(regex)

        let videoUrl: string;
        let imageUrl: string;

        if (!urls) {
            throw new NotFoundException("Media not found")
        }

        console.log(urls)

        urls.forEach((url) => {
            if (url.includes(".mp4")) {
                videoUrl = url
            } else if (url.includes(".jpg")) {
                imageUrl = url
            }
        })

        return {
            ok: true,
            data: {
                type: videoUrl? "video" : "image",
                url: videoUrl || imageUrl
            }
        }
    }
}
