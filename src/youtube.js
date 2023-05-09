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


    async videos(field) {
        const graphqlQuery = `
            query {
                ${field}   {
                     id, published, thumbnail, title
                }
            }
        `
        console.log('the gql query is ', graphqlQuery);

        const response = (await graphqlJson(graphqlQuery, {}))['data'][field]
        console.log('the response is', response)
        const results = response.map(jsonObj => new YoutubeVideo(
            jsonObj ['published'], jsonObj ['thumbnail'], jsonObj ['title'], jsonObj ['id']
        ))
        return results
    }

    async springtipsVideos() {
        return (await this.videos('springtipsVideos'))
    }

    async coffeesoftwareVideos() {
        return (await this.videos('springtipsVideos'))
    }

    /*

        async latestSpringTipsEpisode() {
            const graphqlQuery = `
                query {
                    latestSpringTipsEpisode   {
                        ...springTipsEpisodeResults
                    }
                }
            `
            const response = (await graphqlJson(this.springTipsEpisodesFragment + graphqlQuery, {}))['data']['latestSpringTipsEpisode']
            const results = springTipsEpisodeResults([response])
            return results[0]
        }

    */

    /* constructor() {
         this.springTipsEpisodesFragment = `
             fragment springTipsEpisodeResults on SpringTipsEpisode {
                 published
                 thumbnail
                 title
                 youtubeId
             }
         `;

     }*/
}