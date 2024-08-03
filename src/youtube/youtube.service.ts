import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { GetOriginalLinkDto } from 'src/dto/get.original.link.dto';

@Injectable()
export class YoutubeService {
    async getPostId(url: string) {
        const response = await axios.get<{
            success: boolean;
            id: string;
            message: string;
        }>(`https://ab.cococococ.com/ajax/download.php?copyright=0&format=1080&url=${url}`);
            
        if (!response.data.success) {
            throw new BadRequestException(response.data.message)
        }
        
        return response.data.id;
    };

    async getOriginalUrl(postId: string) {
        let retryCount = 0;
        const maxRetries = 500;

        while (true) {
            const response = await axios.get<{
                success: boolean;
                download_url: string; 
            }>(`https://p.oceansaver.in/ajax/progress.php?id=${postId}`);
            
            const data = response.data;

            if (data.success) {
                return data.download_url;
            };

            if (retryCount === maxRetries && !data.success) {
                throw new BadRequestException("Failed to get download URL after maximum retries");
            };

            retryCount++
        };
    };

    async getPost(query: GetOriginalLinkDto) {
        const postId = await this.getPostId(query.url)
        const postUrl = await this.getOriginalUrl(postId)

        return {
            ok: true,
            data: {
                type: "video",
                url: postUrl
            }
        }
    }
}
