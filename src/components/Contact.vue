<template>
  <div class="prompt"><h2> Got Something to Say? </h2></div>
  <div class="buttons">
    <button> Get in Touch</button>
  </div>
</template>
<style>


.contact {
  padding-top: var(--page-top-pad);
  padding-bottom: var(--page-top-pad);
  background-color: var(--gray-800);
  display: grid;
  text-align: center;
  grid-template-areas:
                        "prompt "
                        "call-to-action";
}

.contact h2 {
  margin: 0;
  padding: 0;


}

.contact .buttons {
  grid-area: call-to-action;
  margin-top: var(--common-gutter);

}

.contact .prompt {
  color: var(--gray-100);
  grid-area: prompt;
}

@media screen and (min-width: 1000px) {


  .contact {
    grid-template-areas: "prompt call-to-action";
    grid-template-columns: auto auto;
    align-content: baseline;
  }

  .contact .prompt {
    text-align: left;
  }

  .contact .buttons {
    grid-area: call-to-action;
    margin-top: var(--common-gutter);
    text-align: right;
  }
}

</style>