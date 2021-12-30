<template>

  <Zone class="about">

  <div>
    <a href="http://twitter.com/starbuxman">Josh (@starbuxman)</a> has been the first Spring Developer Advocate since
    2010. Josh is a Java Champion, author of 6 books (including O'Reilly's <a
      href="https://www.amazon.com/Cloud-Native-Java-Designing-Resilient/dp/1449374646">
    "Cloud Native Java: Designing Resilient Systems with Spring Boot, Spring Cloud, and Cloud Foundry"</a> and <a
      href="http://ReactiveSpring.io">"Reactive Spring"</a>)  and numerous best-selling video training (including <a
      href="https://www.safaribooksonline.com/library/view/building-microservices-with/9780134192468/">
    "Building Microservices with Spring Boot Livelessons"</a> with Spring Boot co-founder Phil Webb), and an open-source
    contributor (Spring Boot, Spring Integration, Spring Cloud, Activiti and Vaadin, etc), a podcaster (<a
      href="http://BootifulPodcast.fm">"A Bootiful Podcast"</a>) and
    a <a href="http://bit.ly/spring-tips-playlist">YouTuber</a>.


  </div>

    <img width="400" src="https://joshlong.com/media/josh-0.png"/>

    <img width="400" src="https://joshlong.com/media/josh-1.jpg"/>

  </Zone>
</template>
<style>
.about {
  /*margin-bottom: var(--page-bottom-pad);*/
  /*margin-top: var(--page-top-pad);*/

  color: white;
  background-color: var(--black);
}
.about div  {
}
.about img:first-of-type {
  padding-top: var(--page-top-pad);
}
.about img:last-of-type {
  padding-top: var(--page-bottom-pad);
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