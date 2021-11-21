import {graphql} from "@/graphql";


export class BlogService {



    async search(query) {
        const graphqlQuery = `
            query ($query: String) {
                search(query: $query ){
                    path
                }
            }
        `
        return (await graphql(graphqlQuery, {query: query})).json()
    }

    constructor(client) {
        console.log('the blog service is started')
        this.client = client
    }
}