<template>
    <div class="main">
        <Header />
        <slot name="info"></slot>
        <slot name="title"></slot>
    </div>
</template>
<script>
import Header from "./Header.vue";
import TitleBlock from "./TitleBlock.vue";
export default {
    components: { Header, TitleBlock },
}
</script>
<style scoped>
.main {
    border-radius: 10px;
    background: #232E52;
}
</style>