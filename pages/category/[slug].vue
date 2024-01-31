<template>
    <Hero>
        <template v-slot:info>
            <Details category="Articles" />
            <!-- content for the header slot -->
        </template>
        <template v-slot:title>
            <TitleBlock :title="pageTitle" />
        </template>
    </Hero>
    <Snippet :query="query" category="" :route="pageTitle" />
</template>
<script setup>
import Hero from '@/components/Hero.vue'
import Details from '@/components/Details.vue'
import TitleBlock from '@/components/TitleBlock.vue'
import Snippet from '@/components/Snippet.vue'
const route = useRoute()
const query = `*[_type == "post" && $slug in categories[]-> slug.current] {
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
            `
const pageTitle = route.params.slug
console.log(pageTitle)
onMounted(() => {
    document.title = `Sherrifdeen's Column - ${pageTitle}`
})

</script>