<template>
    <Page title="JoshLong.com - Hi, Spring fans!">

        <Zone class="menu">
            <Menu/>
        </Zone>

        <router-view></router-view>

        <a name="appearances"></a>
        <Zone class="appearances">
            <Appearances :appearances="appearances"/>
        </Zone>

        <a name="blog"></a>
        <Zone class="recent-posts">
            <div class="search-form">
                <form>
                    <input v-model="query" @keyup="doQueryAfterEnter " required type="text"/>
                    <div class="hint">
                        You can use Lucene queries like : <code> content: "paris" AND title:"2019"</code>
                    </div>
                    <div class="buttons">
                        <button :disabled="!canBeReset" @click.prevent="cancelQuery()" type="submit">
                            Reset
                        </button>
                        <button :disabled="!isValidQuery()" @click.prevent="doQuery()" type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <Posts
                    :posts="posts"
                    :older-remains="olderRemains"
                    :newer-remains="newerRemains"
                    @newer="newer()"
                    @older="older()"
            />
        </Zone>

        <a name="podcast"></a>
        <Zone class="podcast">
            <RecentPodcast :podcast="podcast"/>
        </Zone>

        <a name="livelessons"></a>
        <Zone class="livelessons">
            <ContentCarousel :content="livelessonsContent" v-if="livelessonsContent.length > 0 " side="l">
                <template v-slot:title>
                    Livelessons
                </template>
                <template v-slot:description>
                    <p>
                        I love working with the <em>Livelessons</em> teams! We have put together a <em>lot</em> of
                        in-depth, online,
                        courses on various things Spring since <strong>2013</strong>. I'm usually the instructor, but on
                        occasion
                        I've been lucky enough to
                        have been able to persuade some of my friends and heroes to collaborate with me, and the results
                        are the
                        stuff of legend.
                        Check them out!

                    </p>
                </template>
            </ContentCarousel>
        </Zone>


        <a name="books"></a>
        <Zone class="books" v-if="booksContent.length > 0 ">
            <ContentCarousel :content="booksContent">
                <template v-slot:title>
                    Books
                </template>
                <template v-slot:description>
                    <p>
                        I've authored, or co-authored, six books so far.
                        The latest and greatest of these are <strong><em>Reactive Spring</em></strong> and
                        <strong><em>Cloud Native Java</em></strong>.
                    </p>
                </template>
            </ContentCarousel>
        </Zone>


        <a name="youtube"></a>
        <Zone class="youtube-container">
            <SpringTips :latestEpisode="latestSpringTipsEpisode"/>
        </Zone>

        <a name="footer"></a>
        <Zone class="footer">
            <Footer/>
        </Zone>

    </Page>
</template>

<script>

import Zone from "@/components/Zone";
import Page from "@/components/Page";
import Menu from "@/components/Menu";
import SpringTips from "@/components/SpringTips";
import Appearances from "@/components/appearances/Appearances";
import Posts from "@/components/posts/Posts";
import RecentPodcast from "@/components/podcasts/RecentPodcast";
import ContentCarousel from "@/components/carousel/ContentCarousel";
import Footer from "@/components/Footer";
import {BlogService} from "@/blog-service";
import {AppearanceService} from "@/appearance-service";
import {PodcastService} from "@/podcast-service";
import {ContentService} from "@/content-service";
import {YoutubeService} from "@/youtube";

const blogService = new BlogService()
const appearanceService = new AppearanceService()
const podcastService = new PodcastService()
const youtubeService = new YoutubeService()
const contentService = new ContentService()
const recentPostsTitleString = 'Recent Posts'
const searchResultsTitleString = 'Search Results'

/**
 * This component is the centerpiece of the entire application.
 * It also orchestrates the pagination for the search engine and the recent blogs.
 */
export default {
    name: 'App',
    methods: {

        async doQueryAfterEnter(event) {
            event.preventDefault()
            console.log('preventDefault')
            const kc = event.keyCode
            console.log('the keycode is ', kc)
            if (kc === 13) {
                console.log('running doQuery()')
                await this.doQuery()
            }
        },

        isValidQuery() {
            return (this.query !== null && this.query.trim() !== '') === true
        },

        async doQuery() {
            this.offset = 0
            this.callback = async () => await this.runQuery()
            await this.doSearch()
        },
        async cancelQuery() {
            this.offset = 0
            this.query = ''
            await this.doRecent()
        },
        async doRecent() {
            this.callback = async () => await this.runRecent()
            await this.doSearch()
        },
        async runQuery() {
            if (this.isValidQuery()) {
                const results = await blogService.search(this.query, this.offset, this.pageSize)
                this.doHandleResults(searchResultsTitleString, results, true)
            }
        },
        async runRecent() {
            const results = await blogService.recent(this.offset, this.pageSize)
            this.doHandleResults(recentPostsTitleString, results, false)
        },
        async newer() {
            if ((this.offset - this.pageSize) <= 0)
                this.offset = 0
            else
                this.offset -= this.pageSize
            await this.doSearch()
        },
        async older() {
            if ((this.offset + this.pageSize) < this.totalResultsSize)
                this.offset += this.pageSize
            await this.doSearch()
        },

        async doSearch() {
            console.log('doSearch(): the callback should not be null! it is:', (this.callback === null ? 'null' : 'not null'))
            this.callback()
        },

        /**
         * generic function to reset the results regardless of the query that produced them
         * @param title
         * @param results
         * @param canBeReset
         */
        doHandleResults(title, results, canBeReset) {
            this.postsTitle = title
            this.offset = results.offset
            this.totalResultsSize = results.totalResultsSize
            this.pageSize = results.pageSize
            this.posts = results.posts
            this.newerRemains = results.offset !== 0
            this.olderRemains = (results.offset + results.pageSize) < results.totalResultsSize // &&  ( results.totalResultsSize > results.pageSize )
            this.canBeReset = canBeReset
            console.log('the offset is', this.offset, 'the pageSize', this.pageSize, 'the totalResultSize', this.totalResultsSize)
        }
    },


    async created() {
        this.springtipsVideos = (await youtubeService.springtipsVideos())
        this.coffeesoftwareVideos = (await youtubeService.coffeesoftwareVideos())
        this.podcast = (await podcastService.podcasts())[0]
        this.appearances = await appearanceService.appearances()
        this.booksContent = await contentService.books()
        this.livelessonsContent = await contentService.livelessons()
        this.latestSpringTipsEpisode = this.springtipsVideos [this.springtipsVideos.length - 1]
        this.latestCoffeesoftwareEpisode = this.coffeesoftwareVideos [this.coffeesoftwareVideos.length - 1]

        console.log(this.latestSpringTipsEpisode)
        console.log(this.latestCoffeesoftwareEpisode)
        // this.coffeesoftwareVideos.forEach(o => console.log('result is', o))
        await this.doRecent()
    },

    data() {
        return {
            callback: null,
            offset: 0,
            totalResultsSize: 0,
            pageSize: 10,
            olderRemains: false,
            newerRemains: false,
            latestSpringTipsEpisode: null,
            canBeReset: false,
            postsTitle: 'Recent Posts',
            maxResults: 10,
            booksContent: [],
            livelessonsContent: [],
            appearances: [],
            podcast: null,
            posts: [],
            query: '',
        }
    },
    components: {
        Footer, ContentCarousel, RecentPodcast, Posts, Page, Menu, Zone, SpringTips, Appearances
    }
}
</script>

<style>

@import url("assets/posts.css");

/* the search form */

.hint {
    font-size: smaller;
    color: var(--gray-400);
    grid-area: hint;
    text-align: center;
}

button:disabled, button[disabled] {
    color: var(--gray-500);
    background-color: var(--gray-100);
}

.search-form input {
    padding: var(--common-gutter);
    line-height: calc(var(--common-gutter) * 3);
    background-color: #fff;
    text-align: center;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: var(--button-radius);
    width: 100%;
    font-size: larger;
}

.search-form {
    padding: 5vh;
}

.search-form form {
    display: grid;
    grid-template-areas: "  query  "
                       "  hint   "
                       " buttons ";
    grid-template-columns:   100%;
    grid-row-gap: 10px;
}

.search-form form input {
    grid-area: query;

}

.search-form .buttons {
    grid-area: buttons;
    display: flex;
    align-items: center;
    justify-content: center;

}

.search-form .buttons button {
    text-align: center;
    margin-right: .5vw;
    margin-left: .5vw;
}

/* the search form */

.content .buttons a.icon {
    --icon-dimensions: 27px;
    border: 2px solid black;
    font-weight: normal;
    text-decoration: none;
    margin-right: 0;
    background-repeat: no-repeat;
    padding: 5px;
    border-radius: 5px;
    padding-left: 35px;
    margin-left: 5px;
    background-position-x: 5px;
}

.content .buttons a.icon.leanpub {
    color: white;
    background-color: black;
    background-image: url("assets/images/buttons/leanpub.png");
    background-size: var(--icon-dimensions) 14px;
    background-position-y: 7px;

}

.content .buttons a.icon.amazon {
    color: black;
    background-color: white;
    background-size: var(--icon-dimensions) var(--icon-dimensions);
    background-image: url("assets/images/buttons/amazon.png");
}


.content .buttons a.icon.oreilly {
    color: white;
    background-color: black;
    --oreilly-image-width: 385;
    --oreilly-image-height: 66;
    --oreilly-image-divisor: 3;
    --oreilly-image-size-factor: calc(var(--oreilly-image-width) / var(--oreilly-image-height));
    --oreilly-width: calc(calc(var(--oreilly-image-size-factor) * var(--icon-dimensions)) / var(--oreilly-image-divisor));
    --oreilly-height: calc(var(--icon-dimensions) / var(--oreilly-image-divisor));
    background-size: var(--oreilly-width) var(--oreilly-height);
    background-image: url("assets/images/buttons/oreilly.png");
    background-position-y: calc(var(--common-gutter) + calc(var(--common-gutter) / 5));
    padding-left: calc(var(--oreilly-width) + 10px);

}

.content .buttons a.icon.livelessons {
    color: white;
    background-color: black;
    background-size: var(--icon-dimensions) var(--icon-dimensions);
    background-image: url("assets/images/buttons/pearson.png");
    background-position-y: 2px;
}

h1 {

    padding: 0;
    margin: 0;
    padding-bottom: calc(var(--page-bottom-pad) * 0.5);
    padding-top: calc(3 * var(--page-top-pad));
    color: var(--gray-400);

    font-weight: normal;
    margin-bottom: var(--page-bottom-pad);
}

@media screen and (min-width: 1000px) {
    h1 {
        font-size: 400%;
    }


    .search-form form {
        grid-template-areas: ".  query  ."
                         ".  hint   ."
                         ". buttons .";
        grid-template-columns: auto 70% auto;
    }
}
</style>
