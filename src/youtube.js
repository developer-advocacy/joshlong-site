import {graphqlJson} from "@/graphql";

export class YoutubeVideo {
    constructor(published, thumbnail, title, id) {
        this.published = published
        this.thumbnail = thumbnail
        this.title = title
        this.youtubeId = id
        this.youtubeEmbedUrl = 'https://youtube.com/embed/' + this.youtubeId
    }
}


export class YoutubeService {


    async __fetchYoutubeVideos(field) {
        const graphqlQuery = `
            query {
                ${field}   {
                     id, published, thumbnail, title
                }
            }
        `
        const response = (await graphqlJson(graphqlQuery, {}))['data'][field]

        const results = response.map(jsonObj => new YoutubeVideo(
            jsonObj ['published'], jsonObj ['thumbnail'], jsonObj ['title'], jsonObj ['id']
        ))
        results.sort((a, b) => a.published.localeCompare(b.published))
        return results
    }

    async springtipsVideos() {
        return (await this.__fetchYoutubeVideos('springtipsVideos'))
    }

    async coffeesoftwareVideos() {
        return (await this.__fetchYoutubeVideos('coffeesoftwareVideos'))
    }
}