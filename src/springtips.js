/**
 * Provides a wrapper around the data coming
 * from <a href="https://springtipslive.io/episodes.json">the Spring Tips episode feed</a>
 */
export class SpringTipsEpisode {

    constructor(blogUrl, date, title, youtubeEmbedUrl, youtubeId, seasonNumber) {
        this.blogUrl = blogUrl
        this.date = date;
        this.title = title;
        this.youtubeEmbedUrl = youtubeEmbedUrl;
        this.youtubeId = youtubeId;
        this.seasonNumber = seasonNumber;
    }
}