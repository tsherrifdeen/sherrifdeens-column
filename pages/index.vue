<template>
    <Hero>
        <template v-slot:title>
            <TitleHome />
            <!-- content for the header slot -->
        </template>
    </Hero>
    <Snippet :query="query" category="Latest Articles" />
</template>

<script setup>
const query = `*[_type == "post"]{
                _id,
                title,
                slug,
                author -> {name},
                body,
                "image": mainImage{
                asset -> {
                url
                }},
                "category": categories[0]-> {title},
                _createdAt,
            }[0...8]`
onMounted(() => document.title = "Sherrifdeen's Column - Home")
</script>

<style scoped>
.welcome-div {
    color: #FFFFFF;
    padding: 0 225px;
}

@media screen and (max-width: 991px) {
    .welcome-div {
        padding: 0 40px;
    }
}
</style>