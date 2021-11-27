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
      <Search v-model="query" />
      <Posts :posts="posts"/>
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
import Search from "@/components/Search";

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
    doSearch() {
      console.log('its time to execute the search: ', this.query)
    }
  },
  async created() {
    this.podcast = (await podcastService.podcasts())[0]
    this.appearances = await appearanceService.appearances()
    this.posts = await blogService.recent(10)
    this.booksContent = await contentService.books()
    this.livelessonsContent = await contentService.livelessons()
  },
  data() {
    return {
      booksContent: [],
      livelessonsContent: [],
      appearances: [],
      podcast: null,
      posts: [],
      query: '',
    }
  },
  components: {
    Search, Contact, Footer, ContentCarousel, RecentPodcast, Posts, Hero, Page, Menu, Zone, Youtube, Appearances
  }
}
</script>

<style>

@import url("assets/forms.css");


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

@media screen and (min-width: 1000px) {
  .content .buttons button.icon {
    margin-right: var(--common-gutter);
  }
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
