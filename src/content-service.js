import {graphqlJson} from "@/graphql";
import {Content} from "@/content";


function contentResultsToContent(data) {
    console.log(data)
    return data.map(r => new Content(r['title'], r['imageUrl'], r['html']))
}

export class ContentService {

    async livelessons() {
        const query = ` 
            query {
                livelessons {
                   ...contentResults
                }
            }
        `
        const response = (await graphqlJson(this.fragment + query, {}))['data']['livelessons']
        return contentResultsToContent(response)
    }

    async books() {
        const query = ` 
            query {
                books {
                   ...contentResults
                }
            }
        `
        const response = (await graphqlJson(this.fragment + query, {}))['data']['books']
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