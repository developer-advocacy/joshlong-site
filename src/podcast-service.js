import {graphqlJson} from "@/graphql";
import {Podcast} from "@/podcast";

function podcastsResultsToPodcasts(data) {
    return data.map(r => new Podcast(
        r['id'],
        r['uid'],
        r['title'],
        r['description'],
        r['episodeUri'],
        r['episodePhotoUri'],
        r['date']
    ));
}

export class PodcastService {

    async podcasts() {
        const graphqlQuery = ` 
            {
              podcasts {
                ...podcastResults
              }
            }
        `
        const response = (await graphqlJson(this.podcastsFragment + graphqlQuery))['data']['podcasts']
        return podcastsResultsToPodcasts(response)
    }


    constructor() {

        this.podcastsFragment = ` 
             
            fragment podcastResults on Podcast {
                id
                uid
                title
                description
                episodeUri
                episodePhotoUri
                date
            }
        `


    }
}