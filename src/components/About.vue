<template>

  <Zone class="about">
    <h1> About Me
    </h1>
    <div>
      <a href="http://twitter.com/starbuxman">Josh (@starbuxman)</a> has been the first Spring Developer Advocate since
      2010. Josh is a Java Champion, author of 6 books (including O'Reilly's <a
        href="https://www.amazon.com/Cloud-Native-Java-Designing-Resilient/dp/1449374646">
      "Cloud Native Java: Designing Resilient Systems with Spring Boot, Spring Cloud, and Cloud Foundry"</a> and <a
        href="http://ReactiveSpring.io">"Reactive Spring"</a>) and numerous best-selling video training (including <a
        href="https://www.safaribooksonline.com/library/view/building-microservices-with/9780134192468/">
      "Building Microservices with Spring Boot Livelessons"</a> with Spring Boot co-founder Phil Webb), and an
      open-source
      contributor (Spring Boot, Spring Integration, Spring Cloud, Activiti and Vaadin, etc), a podcaster (<a
        href="http://BootifulPodcast.fm">"A Bootiful Podcast"</a>) and
      a <a href="http://bit.ly/spring-tips-playlist">YouTuber</a>.

    </div>

    <img width="400" src="https://joshlong.com/media/josh-0.png"/>
    <img width="400" src="https://joshlong.com/media/josh-1.jpg"/>

  </Zone>
</template>
<style>

.about a {
  color: var(--gray-400);
}

img {
  display: block
}

.about div {
  grid-area: description;
  padding-bottom: var(--page-bottom-pad);

}

.about {
  color: white;
  background-color: var(--black);
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: "title  "
                       "description "
                       "image1"
                        "image2";
}

.about img {
  border: 1px solid var(--white);
}

.about img:first-of-type {
  grid-area: image1;
  border-bottom: 0px solid white;
}

.about img:last-of-type {
  grid-area: image2;
  margin-bottom: var(--page-bottom-pad);
}

h1 {
  grid-area: title;
}

@media screen and (min-width: 1000px) {
  .about {
    color: white;
    background-color: var(--black);
    display: grid;
    grid-template-columns: auto 400px;
    grid-template-areas: "title title"
                        "description image1"
                        "description image2";
  }
  .about div {
    padding-right: var(--page-right-pad)
  }
}
</style>
<script>
import Zone from "./Zone";

export default {
  name: 'About',
  components: {Zone},
  props: {}
}
</script>