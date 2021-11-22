import {graphqlJson} from "@/graphql";

import {Post} from "@/components/posts/post";

function responseToPost(data) {
    console.log('the data is ', data)
    const posts = []
    data.forEach(r => {
        posts.push(new Post(r['date'], r['title'], r['title'], r['heroParagraphs'], r['heroImageUrl']))
    })
    return posts
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
        return responseToPost(response)
    }

    async search(query) {
        const graphqlQuery = `
            
            query ($query: String) {
                search(query: $query ){
                    ...blogPostResults
                }
            }
        `
        return graphqlJson(this.blogPostFragment + graphqlQuery, {query: query})
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