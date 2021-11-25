import {graphqlJson} from "@/graphql";
import {Content} from "@/content";


function contentResultsToContent(data) {
    console.log(data)
    return data.map(r => new Content(r['title'], r['imageUrl'], r['html']))
}

export class ContentService {

    async books(c) {
        const query = ` 
            query {
                books {
                   ...contentResults
                }
            }
        `
        const response = (await graphqlJson(this.fragment + query, {count: c}))['data']['books']
        return contentResultsToContent(response)
    }


    constructor() {
        this.fragment = `
            fragment contentResults on Content {
                title 
                imageUrl
                html
            }
    `
    }
}