<template>

  <h2> Upcoming Appearances</h2>
  <div class="timeline">


    <div v-for="appearance in appearances"
         :key="appearance.title" class="event">
      <div class="date">
        <div class="day">{{ appearance.day }}</div>
        <div class="month">{{ appearance.month }}</div>
      </div>
      <div class="description">
        <div class="event-name">
          {{ appearance.title }}
        </div>
        <div class="event-details">
          {{ appearance.html }}
        </div>
      </div>
    </div>


  </div>

</template>

<script>


export default {
  name: 'Appearances',
  components: {},
  props: ['appearances'],
  setup() {

  }
}
</script>

<style>

.appearances {
  display: grid;
  background-color: var(--gray-900);
  color: var(--white);
  vertical-align: center;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}

.appearances > h2 {
  background-image: url("~@/assets/images/calendar.png");
  background-size: 40px 40px;
  background-repeat: no-repeat;
  padding-left: 50px;
  height: calc(5 * var(--common-gutter));
  margin-bottom: var(--common-gutter);
}

.appearances > .timeline::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.appearances > .timeline {
  scrollbar-width: none; /* for Firefox */
  display: grid;
  grid-template-columns:  auto;
  grid-template-areas: "event";
  grid-row-gap: calc(2 * var(--common-gutter));
  margin-bottom: 1em;
  overflow: auto;
}

.appearances > .timeline > .event {
  border-radius: 10px;
  background-color: var(--gray-800);
  padding: var(--appearance-event-padding);
  display: grid;
  grid-template-areas:     "date description"
                                 " .   description";
  grid-template-columns: 100px auto;
  grid-template-rows: auto auto;
}

.appearances > .timeline > .event > .date {
  grid-area: date;
  background-image: var(--green-gradient);
  padding: 1em;
  border-radius: 10px;
  color: var(--gray-25);
  text-align: center;
  min-height: 100px;
  max-height: 100px;
  min-width: 100px;
  font-size: x-large;
  line-height: 1em;
}

.appearances > .timeline > .event > .date > .day {
}

.appearances > .timeline > .event > .description {
  padding-left: var(--appearance-event-padding);
}

.appearances > .timeline > .event > .description > .event-name {
  color: var(--gray-25);
  grid-area: event;
}

.appearances > .timeline > .event > .description > .event-details {
  font-size: smaller;
  color: var(--gray-300);
  margin-top: 0.5em;
}

@media screen and (min-width: 1000px) {
  .appearances > .timeline > .event > .description > .event-details {
    font-size: small;
  }

  .appearances > .timeline > .event {
    grid-template-columns: 100px 300px;
    grid-template-rows: 100px auto;
  }

  .appearances > .timeline {
    display: grid;
    grid-template-columns: repeat(auto-fill, 500px);
    grid-column-gap: 0.5em;
    grid-auto-flow: column;
    margin-bottom: 1em;
    overflow: auto;
  }
}

</style>
