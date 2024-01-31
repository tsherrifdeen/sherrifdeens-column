<template>
    <div class="main">
        <Header />
        <slot name="info"></slot>
        <slot name="title"></slot>
    </div>
</template>
<script setup></script>
<style scoped>
.main {
    border-radius: 10px;
    background: #232E52;
}
</style>