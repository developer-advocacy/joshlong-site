<template>
  <component :is="headingLevel" class="appearances-title">
    <slot>Upcoming Appearances</slot>
  </component>
  <ol class="timeline">
    <li v-for="appearance in appearances" :key="appearance.event + appearance.startDate" class="event">
      <time class="date" :datetime="isoDate(appearance.startDate)">
        <span class="day">{{ formatDate(appearance.startDate, {day: 'numeric'}) }}</span>
        <span class="month">{{ formatDate(appearance.startDate, {month: 'short'}) }}</span>
        <span v-if="showYear" class="year">{{ formatDate(appearance.startDate, {year: 'numeric'}) }}</span>
      </time>
      <div class="description">
        <h3 class="event-name">{{ appearance.event }}</h3>
        <p class="event-details">{{ appearance.blurb }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  appearances: Appearance[]
  headingLevel?: 'h1' | 'h2'
  showYear?: boolean
}>(), {headingLevel: 'h2', showYear: false})
</script>

<style>
.appearances {
  display: grid;
  background-color: var(--gray-900);
  color: var(--white);
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}

.appearances > .appearances-title {
  background-image: url("~/assets/images/calendar.png");
  background-size: 40px 40px;
  background-repeat: no-repeat;
  padding-left: 50px;
  padding-top: 0;
  min-height: calc(5 * var(--common-gutter));
  margin-bottom: var(--common-gutter);
  color: var(--white);
  font-size: 1.5em;
  font-weight: bold;
}

.appearances > .timeline::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.appearances > .timeline {
  list-style: none;
  padding: 0;
  margin-top: 0;
  scrollbar-width: none; /* for Firefox */
  display: grid;
  grid-template-columns: auto;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.appearances > .timeline > .event > .date > .year {
  font-size: small;
  margin-top: .3em;
}

.appearances > .timeline > .event > .description {
  padding-left: var(--appearance-event-padding);
}

.appearances > .timeline > .event > .description > .event-name {
  color: var(--gray-25);
  font-size: 1em;
  font-weight: normal;
  margin: 0;
}

.appearances > .timeline > .event > .description > .event-details {
  font-size: smaller;
  color: var(--gray-300);
  margin-top: 0.5em;
  margin-bottom: 0;
}

@media screen and (min-width: 1000px) {
  .appearances > .timeline > .event > .description > .event-details {
    font-size: small;
  }

  .appearances > .timeline > .event {
    grid-template-columns: 100px 300px;
    grid-template-rows: 100px auto;
  }

  .appearances:not(.all-appearances) > .timeline {
    grid-template-columns: repeat(auto-fill, 500px);
    grid-column-gap: 0.5em;
    grid-auto-flow: column;
  }

  .appearances.all-appearances > .timeline {
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    grid-column-gap: 0.5em;
  }
}
</style>
