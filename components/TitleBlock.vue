<template>
    <div class="title">
        <h3>
            {{ title }}
        </h3>
    </div>
</template>
<script setup>
defineProps(['title'])
</script>
<style scoped>
.title {
    max-width: 1200px;
    margin: auto;
    padding: 5px 16px 72px;
}

.title h3 {
    font-weight: 500;
    font-size: 3rem;
    line-height: 120%;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    margin: 0 0;
    text-transform: capitalize;

}

@media screen and (max-width: 991px) {
    .title {
        padding-bottom: 28px;
    }

    .title h3 {
        font-size: 2rem;
    }
}
</style>