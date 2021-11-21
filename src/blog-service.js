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

    async search() {
        const graphqlQuery = `
            query {
                search(query : "title: 'apache' " ){
                    path
                }
            }
        `

        graphql(graphqlQuery, {})
            .then(r => r.json())
            .then(s => console.log(s))
        // return (await graphql(graphqlQuery, {query: query}))
    }

    constructor(client) {
        console.log('the blog service is started')
        this.client = client
    }
}