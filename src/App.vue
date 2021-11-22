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
      <RecentPosts :posts="posts"/>
    </Zone>
    <Zone class="podcast">
      <RecentPodcast :podcast="podcast"/>
    </Zone>
    <Zone class="books ">
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
import Appearances from "@/components/appearance/Appearances";
// import {Post} from '@/components/posts/post';
import {Podcast} from '@/components/podcasts/podcast';
import {Appearance} from '@/components/appearance/appearance'
import RecentPosts from "@/components/posts/RecentPosts";
import RecentPodcast from "@/components/podcasts/RecentPodcast";
import ContentCarousel from "@/components/carousel/ContentCarousel";
import {Content} from "@/components/carousel/content";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

// import {Post} from "@/components/posts/post";
// import {ref} from "vue";
// import {Post} from "@/components/posts/post";
// import { ref, watch, onMounted, onUnmounted } from 'vue'

import {BlogService} from "@/blog-service";

const blogService = new BlogService()

// https://www.npmjs.com/package/graphql-ws
export default {
  name: 'App',

  async created() {
    console.log('setup()')
    this.posts = await blogService.recent(10)
  },
  setup() {
    function generateAppearances() {
      return [
        new Appearance(new Date(), 'Taster Masterclass', `I'll be doing a masterclass taster talk on all things Spring, Kubernetes, and Microservices`),
        new Appearance(new Date(), `O'REILLY`, `I'll be doing a talk at the upcoming O'REILLY conference. Wait, what do you mean it doesn't exist? :-(`),
        new Appearance(new Date(), `Devoxx`, `I'll be presenting (virtually) at the upcoming Devoxx show!`)
      ]
    }

    const podcast = new Podcast('Layla Porter FTW', `<P> Hi, Spring fans! In this installment Josh Long talks to Layla Porter</P>`,
        'https://static-cdn.jtvnw.net/jtv_user_pictures/ac662385-725b-43c9-b0e1-03a49533931f-profile_image-70x70.png');

    const html = `  <P>
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
            </div>`
    const books = [
      new Content('Cloud Native Java book cover', 'https://joshlong.com/media/books/reactive-spring/cover.png', `<p> This book is a book</p>`),
      new Content('Pro Spring Recipes', 'https://joshlong.com/media/books/cloud-native-java/english.jpg', html),
      new Content(`The Reactive Spring Book`, 'https://images-na.ssl-images-amazon.com/images/I/41R7SBjRbKL._SX348_BO1,204,203,200_.jpg', html)]
    const livelessons = [
      new Content('Reactive Spring Livelessons', 'https://joshlong.com/media/livelessons/BuildMicroserviceswSpringBoot_2eLL.jpg', `<p> This book is a book</p>`),
      new Content('Spring Security Livelessons', 'https://joshlong.com/media/livelessons/ReactiveSpringLL-2E.jpg', html),
      new Content(`Cloud Native Java Livelessons`, 'https://joshlong.com/media/livelessons/CloudNativeJavaLL.jpg', html)]

    /* prototype models */
    return {
      // posts: async () => await blogService.recent(10),
      booksContent: books,
      livelessonsContent: livelessons,
      podcast: podcast,
      appearances: generateAppearances()
    }
  },
  data () {
    return {
      posts :  [],
    }
  },

  components: {
    Contact, Footer, ContentCarousel, RecentPodcast, RecentPosts, Hero, Page, Menu, Zone, Youtube, Appearances
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
