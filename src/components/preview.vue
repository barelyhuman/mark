<template>
  <article v-html="code" class="markdown-preview"></article>
</template>

<script setup>
defineProps({
  code: String,
});
</script>

<style scoped>
.markdown-preview {
  font-family: "IBM Plex Sans", sans-serif;
  margin:0 auto;
  width: 100%;
  padding:10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 2;
}

p {
  margin-bottom: 1rem;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 3rem 0 1.38rem;
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  margin-top: 0;
  font-size: 3.052rem;
}

h2 {
  font-size: 2.441rem;
}

h3 {
  font-size: 1.953rem;
}

h4 {
  font-size: 1.563rem;
}

h5 {
  font-size: 1.25rem;
}

small,
.text_small {
  font-size: 0.8rem;
}
</style>
