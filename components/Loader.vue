<template>
    <div class="main-div">
        <div></div>
        <BeatLoader :loading="loading" :color="color" :size="size" />
        <div></div>
    </div>
</template>
<script setup>
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';
const color = ref('#232e52d5')
const size = ref('24px')
const loading = ref('loading')

</script>
<style scoped>
.main-div {
    display: flex;
    flex-flow: column-reverse;
    width: 100%;
    text-align: center;
    min-height: 30vh;
}
</style>