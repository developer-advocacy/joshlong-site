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
  </Page>
</template>

<script>
import Zone from "@/components/Zone";
import Page from "@/components/Page";
import Menu from "@/components/Menu";
import Hero from "@/components/Hero";
import Appearances from "@/components/appearance/Appearances";
import {Post} from '@/components/posts/post';
import {Podcast} from '@/components/podcasts/podcast';
import {Appearance} from '@/components/appearance/appearance'
import RecentPosts from "@/components/posts/RecentPosts";
import RecentPodcast from "@/components/podcasts/RecentPodcast";

export default {
  name: 'App',
  setup() {
    function generateAppearances() {
      return [
        new Appearance(new Date(), 'Taster Masterclass', `I'll be doing a masterclass taster talk on all things Spring, Kubernetes, and Microservices`),
        new Appearance(new Date(), `O'REILLY`, `I'll be doing a talk at the upcoming O'REILLY conference. Wait, what do you mean it doesn't exist? :-(`),
        new Appearance(new Date(), `Devoxx`, `I'll be presenting (virtually) at the upcoming Devoxx show!`)
      ]
    }

    function generatePosts() {
      function generatePost() {
        function randomElementsFrom(items) {
          return items [Math.floor(Math.random() * items.length)]
        }

        function generateTitle() {
          const titles = [
            'A Random Title',
            'Nihao China! ',
            'A Bootiful, Reactive September',
            'Hello, JMaghreb',
            '2019 In Review',
            'Hello, Devoxx!',
            'A Day By The Bay'
          ]
          return randomElementsFrom(titles)
        }

        function generateParagraphs() {
          const elements = [
            `<P>A Bootiful, Reactive September and October 2021 (with appearances from Spring cofounders Rod Johnson and Juergen Hoeller!) </P> `,
            `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna  </p> `,
            `<P>Quis viverra nibh cras pulvinar mattis nunc. Sapien eget mi proin sed libero enim. Ornare suspendisse sed nisi lacus sed </P> `,
            `<P>Euismod quis viverra nibh cras. Tempus urna et pharetra pharetra massa massa ultricies. Lacus luctus accumsan tortor </P> `,
            `<P>Aliquet eget sit amet tellus cras. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. In nulla posuere </P> `,
            `<P>Curabitur vitae nunc sed velit dignissim sodales ut. Consectetur purus ut faucibus pulvinar. Vestibulum lorem sed risus ultricies tristique.</P>`
          ]
          const max = Math.max(1, Math.random() * 3)
          const sub = []
          for (let i = 0; i < max; i++) {
            sub.push(randomElementsFrom(elements))
          }
          return sub.join('')
        }

        function generateImageUrl() {
          const urls = [
            'https://pbs.twimg.com/media/Djkm0FMU4AEub-I.jpg',
            'https://pbs.twimg.com/media/DbJQyzRX4AADZOG?format=jpg&name=medium',
            'https://pbs.twimg.com/media/DbI730WXkAAeMww?format=jpg&name=medium'
          ]
          return Math.random() > .7 ? null : randomElementsFrom(urls)
        }

        return new Post(new Date(), generateTitle(), generateImageUrl(), generateParagraphs())
      }

      const posts = [];
      for (let i = 0; i < 5; i++) posts.push(generatePost())
      return posts
    }

    const podcast = new Podcast('Layla Porter FTW', `<P> Hi, Spring fans! In this installment Josh Long talks to Layla Porter</P>`,
        'https://static-cdn.jtvnw.net/jtv_user_pictures/ac662385-725b-43c9-b0e1-03a49533931f-profile_image-70x70.png');

    return {
      podcast: podcast,
      posts: generatePosts(),
      appearances: generateAppearances()
    }
  },
  components: {
    RecentPodcast,
    RecentPosts,
    Hero,
    Zone,
    Page,
    Menu,
    Appearances
  }
}
</script>

<style>


</style>
