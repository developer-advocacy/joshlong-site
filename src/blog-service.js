import {graphqlJson} from "@/graphql";

import {Post} from "@/post";

function blogSearchResults(r) {
    console.log('the r is', r)
    r.posts = blogPostResultsToPosts(r.posts)
    return r
}

function blogPostResultsToPosts(data) {
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

    async recent(offset, pageSize) {
        const graphqlQuery = ` 
            query ($offset: Int , $pageSize: Int) {
                recentBlogPosts(  offset: $offset, pageSize: $pageSize   ) { 
                        totalResultsSize
                        offset
                        pageSize
                        posts {
                            ...blogPostResults
                        }    
                }
            }
        `
        const results = (await graphqlJson(this.blogPostFragment + graphqlQuery, {
            offset: offset, pageSize: pageSize
        }))
        return blogSearchResults(results['data']['recentBlogPosts'])
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
        const results = (await graphqlJson(this.blogPostFragment + graphqlQuery, {
            query: query,
            offset: offset,
            pageSize: pageSize
        }))
        return blogSearchResults(results ['data'] ['search'])

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