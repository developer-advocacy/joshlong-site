import {graphqlJson} from "@/graphql";

import {Post} from "@/post";

function blogPostResultsToPosts(data) {
    return data.map(r => new Post(r['date'], r['title'], r['title'], r['heroParagraphs'], r['heroImageUrl']))
}

export class BlogService {


    async recent(c) {
        const graphqlQuery = ` 
            query ($count: Int) {
                recentBlogPosts(count: $count) { 
                    ...blogPostResults
                }
            }
        `
        const response = (await graphqlJson(this.blogPostFragment + graphqlQuery, {count: c}))['data']['recentBlogPosts']
        return blogPostResultsToPosts(response)
    }

    async search(query) {
        const graphqlQuery = `
            query ($query: String) {
                search(query: $query ){
                    ...blogPostResults
                }
            }
        `
        const response = (await graphqlJson(this.blogPostFragment + graphqlQuery, {query: query})) ['data']['search']
        return blogPostResultsToPosts(response)
    }


    constructor() {
        this.blogPostFragment = `
            fragment blogPostResults on BlogPost {
             path
             title 
             heroParagraphs
             heroImage 
             date
            }
    `
    }
}