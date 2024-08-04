import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { getCookie, igApi } from "insta-fetcher";
import { LoginData } from "insta-fetcher/dist/types";
import { GetOriginalLinkDto, GetInstaStoriesDto } from "src/dto/get.original.link.dto";

@Injectable()
export class InstagramService {
    private readonly INSTA_USERNAME: string;
    private readonly INSTA_PASSWORD: string;

    constructor(private readonly configService: ConfigService) {
        this.INSTA_USERNAME = this.configService.get<string>("INSTA_USERNAME");
        this.INSTA_PASSWORD = this.configService.get<string>("INSTA_PASSWORD");
    }

    private async getSessionId(): Promise<string | LoginData> {
        try {
            return await getCookie(this.INSTA_USERNAME, this.INSTA_PASSWORD, false);
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Failed to retrieve Instagram session ID.");
        }
    }

    private async fetchPost(sessionId: string, url: string) {
        const ig = new igApi(sessionId);
        try {
            return await ig.fetchPost(url);
        } catch (error) {
            throw new NotFoundException("The media not found or invalid URL.");
        }
    }

    private async fetchStories(sessionId: string, username: string) {
        const ig = new igApi(sessionId);
        const data = await ig.fetchStories(username)

        if (!data.stories) {
            throw new NotFoundException("This profile is private or has no stories");
        }

        return data
    }

    async getOriginalUrl(query: GetOriginalLinkDto) {
        const sessionId = await this.getSessionId();
        const post = await this.fetchPost(sessionId as string, query.url);

        const links = post.links.map(link => ({
            type: link.type,
            url: link.url,
        }));

        return {
            ok: true,
            links,
        };
    }

    async getStories(query: GetInstaStoriesDto) {
        const sessionId = await this.getSessionId()
        const stories = await this.fetchStories(sessionId as string, query.username)

        const links = stories.stories.map((story) => {
            return { type: story.type, url: story.url }
        })

        return {
            ok: true,
            links
        }
    }
};