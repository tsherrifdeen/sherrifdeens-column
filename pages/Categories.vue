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
                <router-link :to="{ name: 'category', params: { slug: category.slug.current, title: category.title } }">
                    <h4 class="category-name">{{ category.title }}</h4>
                    <p class="category-desc">{{ category.description ? category.description.substring(0, 20) : '' }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchBlogData } from '@/composables/getPosts';
import Hero from "../components/Hero.vue";
import TitleBlock from "../components/TitleBlock.vue";
import Details from "../components/Details.vue";
import Loader from '@/components/Loader.vue';

export default {
    name: 'Categories',
    components: { Hero, TitleBlock, Details, Loader },
    data() {
        return {
            query: `*[_type == "category"] {
                _id, 
                description,
                title, 
                slug,
            }`,
            categories: [],
            loading: true,
            error: null,
        };
    },
    created() {
        fetchBlogData(this.query)
            .then(result => {
                this.categories = result;
                this.loading = false;
                console.log(result);
            })
            .catch(error => {
                this.error = error;
            });
    }
};
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