<template>
  <Page title="JoshLong.com - Hi, Spring fans!">
    <Zone class="menu">
      <Menu></Menu>
    </Zone>
    <Zone class="hero">
      <Hero/>
    </Zone>
    <Zone class="appearances">
      <Appearances :appearances="appearances"/>
    </Zone>
    <Zone class="recent-posts">

      <div class="search">
        <form>
          <div class="prompt">
            <h2> Posts </h2>
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
            <button @click.prevent="resetSearch">
              Reset
            </button>
            <button :disabled="!isValidQuery()" @click.prevent="doSearch">
              Search
            </button>
          </div>
        </form>
      </div>
      <Posts :posts="posts" :truncated="hasMorePosts"/>
    </Zone>
    <Zone class="podcast">
      <RecentPodcast :podcast="podcast"/>
    </Zone>
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
    <Zone class="livelessons">
      <ContentCarousel :content="livelessonsContent" v-if="livelessonsContent.length > 0 " side="l">

        <template v-slot:title>
          Livelessons
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

    <Zone class="youtube-container">
      <Youtube/>
    </Zone>

    <Zone class="contact">
      <Contact/>
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
import Hero from "@/components/Hero";
import Youtube from "@/components/Youtube";
import Appearances from "@/components/appearances/Appearances";
import Posts from "@/components/posts/Posts";
import RecentPodcast from "@/components/podcasts/RecentPodcast";
import ContentCarousel from "@/components/carousel/ContentCarousel";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import {BlogService} from "@/blog-service";
import {AppearanceService} from "@/appearance-service";
import {PodcastService} from "@/podcast-service";
import {ContentService} from "@/content-service";

// todo set it up so that the recents posts also supports a search functionality, so either u get the latest N posts OR the search results.
// todo also make it so that each posts has a link that lands on the right page
// todo does vuejs support DI? it would be nice to extract out the blogService into another layer
//
const blogService = new BlogService()
const appearanceService = new AppearanceService()
const podcastService = new PodcastService()
const contentService = new ContentService()


export default {

  name: 'App',
  methods: {
    shouldShowMore() {
      this.hasMorePosts = this.posts != null && this.posts.length > this.maxResults
    },
    async resetSearch() {
      console.log('reset()')
      this.query = ''
      this.posts = await blogService.recent(10)
      this.shouldShowMore()
    },

    isValidQuery() {
      return (this.query !== null && this.query.trim() !== '') === true
    },

    async doSearch() {
      if (this.isValidQuery()) {
        this.posts = []
        const results = await blogService.search(this.query)
        console.debug('query is ', this.query, 'found ', results.length, 'posts')
        if (results.length > this.maxResults) {
          const firstTen = []

          for (let i = 0; i < results.length; i++) {
            if (i < this.maxResults) {
              firstTen [i] = results [i]
            }
          }
          this.posts = firstTen
        } //
        else {
          this.posts = results
        }
      }
      this.shouldShowMore()
    }
  },
  async created() {
    this.podcast = (await podcastService.podcasts())[0]
    this.appearances = await appearanceService.appearances()
    this.booksContent = await contentService.books()
    this.livelessonsContent = await contentService.livelessons()
    await this.resetSearch()
  },
  data() {
    return {
      hasMorePosts: false,
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
    Contact, Footer, ContentCarousel, RecentPodcast, Posts, Hero, Page, Menu, Zone, Youtube, Appearances
  }
}
</script>

<style>

@import url("assets/forms.css");

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
.content .buttons button.icon {
  border: 1px solid black;
  margin-right: 0;
}

.content .buttons button.leanpub {
  color: white;
  background-color: black;
  background-image: url("assets/images/buttons/leanpub.png");
}

.content .buttons button.amazon {
  color: black;
  background-color: white;
  background-image: url("assets/images/buttons/amazon.png");
}

</style>
