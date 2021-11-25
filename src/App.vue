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
      <ContentCarousel :content="livelessonsContent" side="l">

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
import {Content} from "@/content";
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

  async created() {
    this.podcast = (await podcastService.podcasts())[0]
    this.appearances = await appearanceService.appearances()
    this.posts = await blogService.recent(10)
    this.booksContent = await contentService.books()
  },
  setup() {


    const html =
        `
            <P>
                Join Spring Developer Advocate Josh Long for an introduction to reactive programming in the Spring
                ecosystem, leveraging the reactive streams specification, Reactor, Spring Boot, Spring Cloud and so much
                more.
            </P>
            <P>
                This book will cover important concepts in reactive programming including project Reactor and the
                reactive streams specification, data access, web programming, RPC with protocols like RSocket, testing,
                and integration and composition, and more.
            </P>
            <div class="buttons">
                <button class="icon amazon"> Buy on Amazon</button>
                <button class="icon leanpub">Buy on Leanpub</button>
            </div>
        `

    // const books = [
    //   new Content('Cloud Native Java book cover', 'https://joshlong.com/media/books/reactive-spring/cover.png', `<p> This book is a book</p>`),
    //   new Content('Pro Spring Recipes', 'https://joshlong.com/media/books/cloud-native-java/english.jpg', html),
    //   new Content(`The Reactive Spring Book`, 'https://images-na.ssl-images-amazon.com/images/I/41R7SBjRbKL._SX348_BO1,204,203,200_.jpg', html)]
    const livelessons = [
      new Content('Reactive Spring Livelessons', 'https://joshlong.com/media/livelessons/BuildMicroserviceswSpringBoot_2eLL.jpg', `<p> This book is a book</p>`),
      new Content('Spring Security Livelessons', 'https://joshlong.com/media/livelessons/ReactiveSpringLL-2E.jpg', html),
      new Content(`Cloud Native Java Livelessons`, 'https://joshlong.com/media/livelessons/CloudNativeJavaLL.jpg', html)]


    return {
      livelessonsContent: livelessons,
    }
  },
  data() {
    return {
      booksContent: [],
      appearances: [],
      podcast: null,
      posts: [],
    }
  },

  components: {
    Contact, Footer, ContentCarousel, RecentPodcast, Posts, Hero, Page, Menu, Zone, Youtube, Appearances
  }
}
</script>

<style>
/*
  TODO fix the issue with the podcast 'Play' button which, when compressed on mobile devices, gets cropped awkwardly.
*/
.content .buttons button.icon {
  border: 1px solid black;
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
