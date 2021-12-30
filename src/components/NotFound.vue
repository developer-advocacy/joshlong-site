<template>
  <Zone class="notfound">
    <img
        alt="You seem a bit lost. If you were looking for something in particular, this ain't it! Maybe try start.Spring.io?"
        src="~@/assets/images/not-found.png"/>
    <div>
      You seem a bit lost. If you were looking for something in particular, this ain't it! <br/><br/>
      Whenever I'm lost and don't know where to go, <a alt ="the Spring Initializr at start.Spring.io!" href="https://start.Spring.io">start dot... spring dot...io</a>!
    </div>
  </Zone>
</template>

<script>
import Zone from "./Zone";

export default {
  name: 'NotFound',
  components: {Zone},
}
</script>

<style>



.notfound {
  background-color: black;
  padding-bottom: 0;
  margin-bottom: 0;
  padding-left: calc(-1 * var(--zone-padding));
  padding-right: calc(-1 * var(--zone-padding));
  display: grid;

}

.notfound div {
  padding-top: calc(2 * var(--zone-padding));
  padding-right: var(--notfound-image-width );
  grid-area: description;
  font-size: larger;
  color: var(--gray-400);
}

.notfound {
  --notfound-image-width: 400px;
  grid-template-columns:  auto;
  grid-template-rows: auto auto ;
  grid-template-areas:  " image "
                          "description ";


}


@media screen and (min-width: 1000px) {


  .notfound {
    grid-template-columns: var(--notfound-image-width) auto;
    grid-template-areas:  " image description ";

  }
  .notfound div {
    padding-top: calc(2 * var(--zone-padding));
    padding-right: var(--notfound-image-width );
    grid-area: description;
    font-size: larger;
    color: var(--gray-400);
  }

  .notfound img {
    width: var(--notfound-image-width);
    display: block;
    grid-area: image;
    /*border: 1px solid red;*/
  }
}
</style>
