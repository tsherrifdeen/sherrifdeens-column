<template>
    <div>
        <Hero>
            <template v-if="post.category" v-slot:info>
                <Details :category="post.category.title" :date="newDate" />
            </template>
            <template v-if="post.title" v-slot:title>
                <TitleBlock :title="post.title" />
                <!-- content for the header slot -->
            </template>
        </Hero>
        <Loader v-if="loading" />
        <div v-if="error" class="error">
            There was an error while loading: {{ error }}
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

<script setup>
import Hero from '@/components/Hero.vue'
import Details from '@/components/Details.vue'
import TitleBlock from '@/components/TitleBlock.vue'
import Loader from '@/components/Loader.vue'
import { PortableText } from '@portabletext/vue';
const route = useRoute()
const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
  likes,
  _createdAt,
  "category": categories[0]-> {title},
  body, 
 "image": mainImage{asset->{_id, url}},
author -> {name, bio, 'img':image{asset->{url}}},
}[0]`;

const loading = ref(true)
const post = ref({})
const error = ref(null)
const blocks = ref({})

useSeoMeta({
    title: () => `Sherrifdeen's Column - ${route.params.slug}`
})

watchEffect(() => {
    fetchBlogContent(query, { "slug": route.params.slug })
        .then((result) => {
            post.value = result;
            loading.value = false;
            blocks.value = result.body;
        })
        .catch((error) => {
            this.error.value = error;
        });
})

const newDate = ref(null)
watchEffect(() => {
    const date = new Date(post.value._createdAt);
    newDate.value = date.toLocaleString('en-us', { year: "numeric", month: "short", day: "numeric" });
})
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
            text - align: center;
}

        h3 {
            color: #232E52;
} */

@media screen and (max-width:991px) {
    .content {
        padding: 0 16px;
    }

    /* .content>img {
            border - radius: 8px;
        height: 280px;
        object-fit: fill;
  } */
}
</style>
