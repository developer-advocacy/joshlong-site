<template>
  <div class="prompt"><h2> Got Something to Say? </h2></div>
  <div>
    <form class="contact-form">
      <label> Name</label> <input type="text" />
      <label> Name</label> <input type="text" />
      <label> Name</label> <input type="text" />
      <label> Name</label> <input type="text" />
      <!--      &lt;!&ndash; text &ndash;&gt;
            <p>
              <input type="text" v-model="msg">
              {{ msg }}
            </p>
            &lt;!&ndash; checkbox &ndash;&gt;
            <p>
              <input type="checkbox" v-model="checked">
              {{ checked ? "yes" : "no" }}
            </p>
            &lt;!&ndash; radio buttons &ndash;&gt;
            <p>
              <input type="radio" name="picked" value="one" v-model="picked">
              <input type="radio" name="picked" value="two" v-model="picked">
              {{ picked }}
            </p>
            &lt;!&ndash; select &ndash;&gt;
            <p>
              <select v-model="selected">
                <option>one</option>
                <option>two</option>
              </select>
              {{ selected }}
            </p>
            &lt;!&ndash; multiple select &ndash;&gt;
            <p>
              <select v-model="multiSelect" multiple>
                <option>one</option>
                <option>two</option>
                <option>three</option>
              </select>
              {{ multiSelect }}
            </p>

            <pre>data: {{ $data  }}</pre>-->

    </form>
    <div class="buttons">
      <button> Get in Touch</button>
    </div>
  </div>
</template>
<style>


.contact-form {
  display: grid;
  grid-row-gap: var(--common-gutter);
  grid-template-columns:   auto;
  grid-auto-rows: auto;
  grid-column-gap: var(--common-gutter);
}

.contact-form label {
  color: var(--white);
}

/**/

@media screen and (min-width: 1000px) {
  .contact-form label {

    text-align: right;
  }
  .contact-form {
    display: grid;
    grid-row-gap: var(--common-gutter);

    grid-template-columns: calc(var(--common-gutter) * 10) auto;
    grid-auto-rows: auto;
    grid-column-gap: var(--common-gutter);
  }
}

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

.contact .contact-form {
  grid-area: call-to-action;
}


/*.contact .buttons {

  margin-top: calc(3 * var(--common-gutter));
  margin-bottom: calc(3 * var(--common-gutter));

}*/

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