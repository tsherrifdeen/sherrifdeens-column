<script setup>
useSeoMeta({
  ogTitle: "Sherrifdeen's Column - Home",
  description: 'Welcome to my amazing website for random posts and ideas.',
  ogDescription: 'Welcome to my amazing website for random posts and ideas.',
  ogImage: '@/assets/images/favicon-32x32.png',
  twitterCard: '@/assets/images/favicon-32x32.png',
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtPage />
  <Subscribe />
  <Footer />
</template>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
</style>