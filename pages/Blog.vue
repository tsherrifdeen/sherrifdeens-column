<template>
  <div>
    <Hero>
      <template v-if="post" v-slot:info>
        <Details :category="post.category.title" :date="newDate" />
      </template>
      <template v-if="post" v-slot:title>
        <TitleBlock :title="post.title" />
        <!-- content for the header slot -->
      </template>
    </Hero>

    <Loader v-if="loading" />
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <img v-if="post.image" :src="post.image.asset.url" class="content-img" />

      <div v-if="post.author" class="author-div">
        <img :src="post.author.img.asset.url">
        <div>
          <h3>{{ post.author.name }}</h3>
          <PortableText :value="post.author.bio" />
        </div>
      </div>

      <div>
        <PortableText :value="blocks" :components="{ /* optional object of custom components to use */ }" />
      </div>
    </div>
  </div>
</template>

<script>
import { PortableText } from '@portabletext/vue';
import Details from "@/components/Details.vue";
import { fetchBlogContent } from "@/composables/getPosts";
import Hero from "@/components/Hero.vue";
import TitleBlock from "@/components/TitleBlock.vue";
import Loader from "@/components/Loader.vue";

const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
  _createdAt,
  "category": categories[0]-> {title},
  body, 
 "image": mainImage{asset->{_id, url}},
author -> {name, bio, 'img':image{asset->{url}}},
}[0]`;

export default {
  name: "SinglePost",
  components: { PortableText, Hero, Details, TitleBlock, Loader },
  data() {
    return {
      loading: true,
      post: null,
      error: null,
      blocks: [],
    };
  },
  created() {
    fetchBlogContent(query, { slug: this.$route.params.slug })
      .then((result) => {
        this.post = result;
        this.loading = false;
        this.blocks = result.body;
      })
      .catch((error) => {
        this.error = error;
      });
  },
  computed: {
    newDate() {
      const date = new Date(this.post._createdAt);
      return date.toLocaleString('en-us', { year: "numeric", month: "short", day: "numeric" });
    },
  },
  mounted() {
    document.title = `Sherrifdeen's Column -${this.$route.params.slug}`
  }
};
</script>

<style>
blockquote {
  border-left: 4px solid lightgrey;
  padding-left: 8px;
}

.loading {
  padding: 3em 4em;
}

.content {
  color: #232E52;
  max-width: 768px;
  padding: 0px 16px;
  margin: 0 auto;
}

.author-div {
  display: flex;
  margin-top: 16px;
}

.author-div img {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
  display: inline-block;
  margin-right: 8px;
}

.author-div h3 {
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  margin: 0;
}

.author-div p {
  display: block;
  color: gray;
  margin: 0;
}

.content-img {
  border-radius: 4px;
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  display: inline-block;
  margin: 0 auto;
}

/* h1 {
  text-align: center;
}

h3 {
  color: #232E52;
} */

@media screen and (max-width:991px) {
  .content {
    padding: 0 16px;
  }

  /* .content>img {
    border-radius: 8px;
    height: 280px;
    object-fit: fill;
  } */
}
</style>