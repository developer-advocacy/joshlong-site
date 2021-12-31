export function createPromiseForGraphqlQuery(graphQlclient, query) {
    return new Promise((resolve, reject) => {
        let result;
        graphQlclient.subscribe(
            {
                query: query,
                variables: ['query'],
                variableValues: ['title: "Apache"'],
            },
            {
                next: (data) => (result = data),
                error: reject,
                complete: () => resolve(result),
            },
        );
    });
}

