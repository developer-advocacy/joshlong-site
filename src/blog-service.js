import {graphqlJson} from "@/graphql";

import {Post} from "@/post";

function blogPostResultsToPosts(data) {
    console.log('blogPostResultsToPosts', data.length)
    const result = []
    for (let i = 0; i < data.length; i++) {
        const r = data [i]
        result.push(new Post(r['date'], r['title'], r['pathId'], r['heroParagraphs'], r['heroImage'], r['heroParagraphsTruncated']))
    }
    return result
}

export class BlogService {

    async byPath(path) {
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
        const r = (await graphqlJson(graphqlQuery, {path: path}))['data']['blogPostByPath']
        if (r != null) {
            return new Post(r['date'], r['title'], r['pathId'], r['processedContent'], r['heroImageUrl']);
        }
        return null;
    }

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

    async search(query, offset, pageSize) {
        const graphqlQuery = `
            query($query: String , $offset: Int , $pageSize: Int) {
                search(query: $query, offset: $offset, pageSize: $pageSize ) {
                    totalResultsSize
                    offset
                    pageSize
                    posts {
                        ...blogPostResults
                    }
                }
            }
        `
        console.log('the query is ', query, 'the offset is  ', offset, 'the pageSize is', pageSize)
        const results = (await graphqlJson(this.blogPostFragment + graphqlQuery, {
            query: query,
            offset: offset,
            pageSize: pageSize
        }))
        console.log('the results are', results)
        let r = results ['data'] ['search']
        console.log("::", r.posts)
        r.posts = blogPostResultsToPosts( r.posts)
        return r
    }

    constructor() {
        this.blogPostFragment = `
            fragment blogPostResults on BlogPost {
             pathId
             title 
             heroParagraphs
             heroImage 
             date
             heroParagraphsTruncated
            }
    `
    }
}