import {graphqlJson} from "@/graphql";

function blogSearchResults(r) {
    if (r !== null) {
        r.posts = blogPostResultsToPosts(r.posts)
    }

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
                blogPostByPath( path: $path ){ 
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
                recentBlogPosts(  offset: $offset, pageSize: $pageSize  ) { 
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
            query: query, offset: offset, pageSize: pageSize
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

export class Appearance {

    constructor(date, title, descriptionHtml) {
        this.date = date;
        this.title = title;
        this.html = descriptionHtml;
        if ((typeof this.date) !== 'string') {
            this.day = this.date.getUTCDate();
            this.year = this.date.getUTCFullYear();
            this.month = this.date.toLocaleString('default', {month: 'short'})
        }

    }
}

function appearancesResultsToAppearances(data) {
    return data.map(r => {
        const numberSinceEpoch = Date.parse(r['startDate'])
        const date = new Date(numberSinceEpoch)
        return new Appearance(date, r['title'], r['marketingBlurb']);
    });
}


export class Content {
    constructor(title, imageUrl, descriptionHtml) {
        this.title = title;
        this.html = descriptionHtml;
        this.imageUrl = imageUrl
    }
}


function contentResultsToContent(data) {
    return data.map(r => new Content(r['title'], r['imageUrl'], r['html']))
}

export class ContentService {

    async about() {
        return (await this.resolveData()) ['about']
    }

    async abstracts() {
        return (await this.resolveData()) ['abstracts']
    }

    async livelessons() {
        return contentResultsToContent((await this.resolveData())['livelessons'])
    }

    async books() {
        return contentResultsToContent((await this.resolveData())['books'])
    }

    async resolveData() {
        if (this.data == null) {
            const query = `
                 query {
                    abstracts 
                    about
                    livelessons { ... contentResults }
                    books { ... contentResults }
                 }
            `;
            this.data = (await graphqlJson(this.fragment + query, {}))['data']
        }
        return this.data
    }

    constructor() {

        this.data = null;
        this.fragment = `
        
            fragment contentResults on Content {
                title 
                imageUrl
                html
            }
            
        `;
    }
}


export class Podcast {

    constructor(id, uid, title, description, episodeUri, episodePhotoUri, date) {
        this.id = id
        this.uid = uid
        this.title = title
        this.description = description
        this.episodeUri = episodeUri
        this.episodePhotoUri = episodePhotoUri
        this.date = date
    }
}


function podcastsResultsToPodcasts(data) {
    return data.map(r => new Podcast(r['id'], r['uid'], r['title'], r['description'], r['episodeUri'], r['episodePhotoUri'], r['date']));
}

export class Post {
    constructor(date, title, path, html, hiu, heroParagraphsTruncated) {
        this.date = date;
        this.title = title;
        this.html = html;
        this.path = path
        this.heroImageUrl = hiu;
        this.date = new Date(date)
        this.day = this.date.getUTCDate();
        this.year = this.date.getUTCFullYear();
        this.month = this.date.toLocaleString('default', {month: 'short'})
        this.heroParagraphsTruncated = heroParagraphsTruncated;
        // console.log(this.title, ':', this.heroParagraphsTruncated)
    }
}


export class YoutubeVideo {
    constructor(published, thumbnail, title, id) {
        this.published = published
        this.thumbnail = thumbnail
        this.title = title
        this.youtubeId = id
        this.youtubeEmbedUrl = 'https://youtube.com/embed/' + this.youtubeId
    }
}


export class YoutubeService {


    __gqlForVideo(field) {
        return `
            ${field} {
                 id, published, thumbnail, title
            }
        `
    }

    constructor() {
        this.result = null
    }

    async __fetchYoutubeVideos(field) {
        // lazily load both video feeds when either one of them is requested. saves us the extra roundtrip.
        if (this.result == null) {
            console.debug( 'result == null ' +field)
            const totalGqlQuery = 'query { ' + this.__gqlForVideo('coffeesoftwareVideos') + '\n\n' + this.__gqlForVideo('springtipsVideos') + ' } ';
            this.result = (await graphqlJson(totalGqlQuery, {}))['data']
        }
        else {
            console.debug('the result is not null ' + field)
        }
        const results = this.result [field].map(jsonObj => new YoutubeVideo(jsonObj ['published'], jsonObj ['thumbnail'], jsonObj ['title'], jsonObj ['id']))
        results.sort((a, b) => a.published.localeCompare(b.published))
        return results
    }

    async springtipsVideos() {
        return (await this.__fetchYoutubeVideos('springtipsVideos'))
    }

    async coffeesoftwareVideos() {
        return (await this.__fetchYoutubeVideos('coffeesoftwareVideos'))
    }
}

export class PodcastService {

    async podcasts() {
        const graphqlQuery = ` 
            {
              podcasts {
                ...podcastResults
              }
            }
        `
        const response = (await graphqlJson(this.podcastsFragment + graphqlQuery))['data']['podcasts']
        return podcastsResultsToPodcasts(response)
    }


    constructor() {

        this.podcastsFragment = ` 
             
            fragment podcastResults on Podcast {
                id
                uid
                title
                description
                episodeUri
                episodePhotoUri
                date
            }
        `


    }
}

export class AppearanceService {

    async appearances() {
        const graphqlQuery = ` 
            query  {
                appearances { 
                    event
                    time
                    startDate
                    endDate
                    marketingBlurb
                }
            }
        `
        const response = (await graphqlJson(graphqlQuery, {}))['data']['appearances']
        return appearancesResultsToAppearances(response)
    }

}
