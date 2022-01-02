import {graphqlJson} from "@/graphql";
import {SpringTipsEpisode} from "@/springtips";


function springTipsEpisodeResults(data) {
    return data.map(r => new SpringTipsEpisode(r['blogUrl'], r['date'], r['title'], r['youtubeEmbedUrl'], r['youtubeId'], r ['seasonNumber']))
}

/**
 * the client for all interactions with the Spring Tips Episode feed.
 */
export class SpringTipsService {

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


    constructor() {
        this.springTipsEpisodesFragment = `
            fragment springTipsEpisodeResults on SpringTipsEpisode {
                blogUrl
                date
                title
                youtubeEmbedUrl
                youtubeId
                seasonNumber
            }
        `;

    }
}