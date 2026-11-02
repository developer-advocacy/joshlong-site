<template>
  <Zone class="page books">
    <h1>Books</h1>
    <div class="intro"><BooksIntro/></div>
    <ContentList v-if="books" :content="books"/>
  </Zone>
</template>

<script setup lang="ts">
const {data: books} = await useFetch('/api/books')
const {siteUrl} = useRuntimeConfig().public

useSeo(() => ({
  title: 'Books by Josh Long',
  description: 'The books Josh Long has written: ' + (books.value ?? []).map(b => b.title).join(', ') + '.',
  path: '/books',
  image: books.value?.[0]?.imageUrl,
}))

useStructuredData(() => graph({
  '@type': 'ItemList',
  name: 'Books by Josh Long',
  itemListElement: (books.value ?? []).map((book, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Book',
      name: book.title,
      image: book.imageUrl,
      url: `${siteUrl}/books#${book.slug}`,
      description: excerpt(book.html, 300),
      author: {'@id': `${siteUrl}/#josh`},
    },
  })),
}))
</script>
