export function graphql(graphqlQuery, variables) {
    // https://graphql.org/graphql-js/passing-arguments/
    const url = process.env.VUE_APP_SERVICE_ROOT + '/graphql'
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

export async function graphqlJson(q, v) {
    return (await graphql(q, v)).json()
}