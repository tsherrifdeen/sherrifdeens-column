<template lang="en">
    <div class="main-div">
        <div></div>
          <beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
           <div></div>
    </div>
    
</template>
<script>
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';

export default {
    components: {
        BeatLoader
    },
    props: {
    },
    data() {
        return {
            color: '#232e52d5',
            size: '24px',
            loading: 'loading'
        }
    },
}
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