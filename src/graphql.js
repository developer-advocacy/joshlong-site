export function graphql(graphqlQuery, variables) {
// https://graphql.org/graphql-js/passing-arguments/

    const url = 'http://localhost:8080/graphql' // todo make this URL a parameter from the environment or something
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