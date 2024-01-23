<template>
    <Hero>
        <template v-slot:info>
            <Details category="All Posts" />
            <!-- content for the header slot -->
        </template>
        <template v-slot:title>
            <TitleBlock title="All Posts" />
            <!-- content for the header slot -->
        </template>
    </Hero>
    <PostSnippet :query="query" />
</template>

<script>
import PostSnippet from "@/components/Snippet.vue";
import Hero from '@/components/Hero.vue';
import TitleBlock from '@/components/TitleBlock.vue';
import Details from "@/components/Details.vue";

export default {
    name: "Posts",
    components: { PostSnippet, Hero, TitleBlock, Details },
    data() {
        return {
            query: `*[_type == "post"]{
                _id,
                title,
                slug,
                author -> {name},
                body,
                "image": mainImage{
                asset-> {
                url
                }},
                "category": categories[0]-> {title},
                _createdAt,
            }`,
        }
    },
    mounted() {
        document.title = `Sherrifdeen's Column - Posts`
    }
}

</script>
