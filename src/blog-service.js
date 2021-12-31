import {graphqlJson} from "@/graphql";

import {Post} from "@/post";

function blogPostResultsToPosts(data) {
    return data.map(r => new Post(r['date'], r['title'], r['pathId'], r['heroParagraphs'], r['heroImageUrl']))
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


    /*
     *
     * this mapper expects a collection of results,
     * but this graphql query only returns a single value.
     *
     */
    async byPath(path) {
        console.log('searching for path ' + path)
        const graphqlQuery = `
             query ($path: String) {
                blogPostByPath( path: $path){ 
                        pathId
                        title 
                        processedContent
                        heroImage 
                        date
                } 
             }
        `
        const r = (await graphqlJson(graphqlQuery, {path: path})) ['data']['blogPostByPath']
        if (r != null) {
            console.log(r )
            return new Post(r['date'], r['title'], r['pathId'], r['processedContent'], r['heroImageUrl']);
        }
        return null;
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
             pathId
             title 
             heroParagraphs
             heroImage 
             date
            }
    `
    }
}