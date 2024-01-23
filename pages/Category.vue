<template>
    <Hero>
        <template v-slot:info>
            <Details category="Posts" />
            <!-- content for the header slot -->
        </template>
        <template v-slot:title>
            <TitleBlock :title="pageTitle" />
        </template>
    </Hero>
    <PostSnippet :query="query" category="" :route="pageTitle" />
</template>
<script>

import Details from '@/components/Details.vue';
import Hero from '@/components/Hero.vue';
import TitleBlock from '@/components/TitleBlock.vue';
import PostSnippet from '@/components/Snippet.vue'
export default {
    components: { Hero, TitleBlock, Details, PostSnippet },
    data() {
        return {
            query: `*[_type == "post" && $slug in categories[]-> slug.current] {
                _id,
                title,
                slug,
                _createdAt,
                body,
                "category": categories[0]-> {title},
                author -> { name },
                "image": mainImage{
                asset -> {
                    url
                    }
                }
            }
            `,
        };
    },
    computed: {
        pageTitle() {
            return this.$route.params.slug;
        },
    },
    mounted() {
        document.title = `Sherrifdeen's Column - ${this.pageTitle}`
    }
}
</script>