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


    <!--
    SEARCH RESULTS
    -->
    <a name="blog"></a>
    <Zone class="recent-posts">

      <div class="search">
        <form>
          <div class="prompt">
            <h2> {{ postsTitle }} </h2>
          </div>
          <div class="fields">
            <label>Query </label>
            <div>
              <input v-model="query" required type="text"/>
              <div class="hint">
                You can use Lucene queries like : <code> content: "paris" AND title:"2019"</code>
              </div>
            </div>
          </div>
          <div class="buttons">
            <button :disabled="!canBeReset" @click.prevent="resetSearch">
              Reset
            </button>
            <button :disabled="!isValidQuery()" @click.prevent="doSearch">
              Search
            </button>
          </div>
        </form>
      </div>
      <Posts
          :posts="posts"
          :older-remains="olderRemains"
          :newer-remains="newerRemains"
          @newer="newer()" @older="older()"
      />
    </Zone>

    <a name="podcast"></a>
    <Zone class="podcast">
      <RecentPodcast :podcast="podcast"/>
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

    <a name="livelessons"></a>
    <Zone class="livelessons">
      <ContentCarousel :content="livelessonsContent" v-if="livelessonsContent.length > 0 " side="l">
        <template v-slot:title>
          Livelessons
        </template>
        <template v-slot:description>
          <p>
            I love working with the <em>Livelessons</em> teams! We have put together a <em>lot</em> of in-depth, online,
            courses on various things Spring since <strong>2013</strong>. I'm usually the instructor, but on occasion
            I've been lucky enough to
            have been able to persuade some of my friends and heroes to collaborate with me, and the results are the
            stuff of legend.
            Check them out!

          </p>
        </template>
      </ContentCarousel>
    </Zone>

    <a name="youtube"></a>
    <Zone class="youtube-container">
      <SpringTips :latestEpisode="latestSpringTipsEpisode"/>
    </Zone>


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
import {SpringTipsService} from "@/springtips-service";

const blogService = new BlogService()
const appearanceService = new AppearanceService()
const podcastService = new PodcastService()
const contentService = new ContentService()
const springTipsService = new SpringTipsService()
const recentPostsTitleString = 'Recent Posts'
const searchResultsTitleString = 'Search Results'

export default {

  name: 'App',
  methods: {

    async newer() {
      console.log('newer()', this.newerRemains, ':', this.olderRemains)
      if ((this.offset - this.pageSize) <= 0)
        this.offset = 0
      else
        this.offset -= this.pageSize
      await this.doSearch()
    },
    async older() {
      console.log('older()', this.newerRemains, ':', this.olderRemains)
      if ((this.offset + this.pageSize) <= this.totalResultsSize)
        this.offset += this.pageSize
      await this.doSearch()
    },

    async resetSearch() {
      this.postsTitle = recentPostsTitleString
      this.query = 'content: "spring boot"'
      this.canBeReset = false
      this.offset = 0
      this.totalResultsSize = 0
      this.pageSize = 5
      this.posts = await blogService.recent(10)

    },

    isValidQuery() {
      return (this.query !== null && this.query.trim() !== '') === true
    },

    async doSearch() {
      if (this.isValidQuery()) {
        this.postsTitle = searchResultsTitleString
        this.posts = []
        const results = await blogService.search(this.query, this.offset, this.pageSize)
        this.doHandleResults(results)
        this.canBeReset = true
      }
    },

    doHandleResults(results) {
      this.offset = results.offset
      this.totalResultsSize = results.totalResultsSize
      this.pageSize = results.pageSize
      this.posts = results.posts
      this.newerRemains = results.offset !== 0
      this.olderRemains = results.offset < results.totalResultsSize
      console.log('the offset is', this.offset, 'the pageSize', this.pageSize, 'the totalResultSize', this.totalResultsSize)
    }
  },


  async created() {
    this.podcast = (await podcastService.podcasts())[0]
    this.appearances = await appearanceService.appearances()
    this.booksContent = await contentService.books()
    this.livelessonsContent = await contentService.livelessons()
    this.latestSpringTipsEpisode = await springTipsService.latestSpringTipsEpisode()
    await this.resetSearch()
  },

  data() {
    return {
      // search results
      offset: 0,
      totalResultsSize: 0,
      pageSize: 0,
      olderRemains: false,
      newerRemains: false,

      // search results
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

@import url("assets/forms.css");
@import url("assets/posts.css");

.hint {
  font-size: smaller;
  color: var(--gray-400)
}

.search form label, .search form .prompt {
  color: var(--black)
}

/*
  TODO fix the issue with the podcast 'Play' button which, when compressed on mobile devices, gets cropped awkwardly.
*/
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

}
</style>
