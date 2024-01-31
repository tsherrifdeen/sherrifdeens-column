<template>
    <Hero>
        <template v-slot:info>
            <Details category="All Articles" />
            <!-- content for the header slot -->
        </template>
        <template v-slot:title>
            <TitleBlock title="All Articles" />
            <!-- content for the header slot -->
        </template>
    </Hero>
    <Snippet :query="query" />
</template>

<script setup>
const query = `*[_type == "post"]{
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
            }`

useSeoMeta({
    title: () => `Sherrifdeen's Column - Articies`,
})
</script>
