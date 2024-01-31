<template>
    <Hero>
        <template v-slot:info>
            <Details category="All Categories" />
        </template>
        <template v-slot:title>
            <TitleBlock title="Categories" />
        </template>
    </Hero>

    <div class="main-div">
        <Loader v-if="loading" />
        <div v-if="error" class="error">
            There was an error while loading: {{ error }}
        </div>
        <div v-if="categories" class="flex-div">
            <div v-for="category in categories" :key="category._id" class="category-div">
                <NuxtLink :to="`/category/${category.slug.current}`">
                    <h4 class="category-name">{{ category.title }}</h4>
                    <p class="category-desc">{{ category.description ? category.description.substring(0, 20) : '' }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const query = `*[_type == "category"] {
                _id, 
                description,
                title, 
                slug,
            }`
const categories = ref([])
const loading = ref(true)
const error = ref(null)

useSeoMeta({
    title: () => `Sherrifdeen's Column - Categories`,
})
watchEffect(() => {
    fetchBlogData(query)
        .then(result => {
            categories.value = result;
            loading.value = false;
        })
        .catch(error => {
            this.error.value = error;
        });
})
</script>


<style scoped>
.main-div {
    padding: 72px 16px 0;
    max-width: 1200px;
    margin: auto;
}

.flex-div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: #232E52;
    grid-gap: 10px;
}

.category-div {
    border-radius: 8px;
    background-color: #ebf2fe;
    color: #232E52;
    padding: 20px;
}

a {
    color: #232E52;
    text-decoration: none;
}

a:hover {
    opacity: .95;
}

.category-name {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 120%;
    margin: 0;
    margin-bottom: 5px;
    text-transform: capitalize;
}

.category-desc {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
}

@media screen and (max-width: 991px) {
    .main-div {
        padding: 75px 16px 0;
    }

    .flex-div {
        grid-template-columns: repeat(2, 1fr);
    }

}
</style>