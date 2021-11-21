// import {createPromiseForGraphqlQuery} from "./async"

function graphql(graphqlQuery, variables) {
    const url = 'http://localhost:8080/graphql'
    return window.fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: graphqlQuery,
            variables: variables,
        })
    })

}

// https://graphql.org/graphql-js/passing-arguments/
export class BlogService {

    async search(query) {
        const graphqlQuery = `
            query Search($query: String) {
                search(query: $query ){
                    path
                }
            }
        `
        return   (await graphql(graphqlQuery, {query: query})).json()
    }

    constructor(client) {
        console.log('the blog service is started')
        this.client = client
    }
}