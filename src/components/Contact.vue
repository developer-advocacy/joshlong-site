<template>
  <div class="prompt"><h2> Let's Talk! </h2></div>
  <div>
    <form class="contact-form">
      <label>Name:</label> <input required type="text"/>
      <label>E-Mail:</label> <input required type="email"/>
      <label>Message: </label> <textarea></textarea>
    </form>
    <div class="buttons">
      <button> Get in Touch</button>
    </div>
  </div>
</template>
<style>
.contact-form {
  margin-top: calc(3 * var(--common-gutter));
  margin-bottom: calc(3 * var(--common-gutter));
  display: grid;
  /*grid-row-gap: calc( 1 * var(--common-gutter));*/
  grid-template-columns:   auto;
  grid-auto-rows: auto;
  grid-column-gap: var(--common-gutter);
}

.contact-form label {
  margin-top: calc(3 * var(--common-gutter));
  margin-bottom: var(--common-gutter);
  color: var(--white);
  text-align: left;
}


.contact-form input, textarea {

  padding: var(--common-gutter);
  line-height: calc(var(--common-gutter) * 1.4);
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: var(--button-radius);
}

.contact-form textarea {
  height: 10em
}

.contact {
  padding-bottom: var(--page-top-pad);
  background-color: var(--gray-800);
  display: grid;
  text-align: center;
  grid-template-areas:  "prompt "
                        "call-to-action";
}

.contact .contact-form {
  grid-area: call-to-action;
}


.contact .prompt {
  color: var(--gray-100);
  grid-area: prompt;
}

@media screen and (min-width: 1000px) {

  .contact-form label {
    text-align: right;
    margin-bottom: 0;
    margin-top: 0;
  }

  .contact-form {
    display: grid;
    grid-row-gap: calc(2 * var(--common-gutter));
    grid-template-columns: calc(var(--common-gutter) * 10) auto;
    grid-auto-rows: auto;
    grid-column-gap: var(--common-gutter);
  }

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