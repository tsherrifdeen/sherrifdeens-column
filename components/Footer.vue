<template>
    <div class="footer">
        <hr>
        <div>Built with Nuxt ✌️ - Copyright 2024</div>
    </div>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style scoped>
.footer {
    max-width: 1200px;
    margin: auto;
    padding: 36px 0;
    color: #232E52;
    text-align: center;
}

.footer hr {
    opacity: 0.45;
    margin-bottom: 40px;
}

@media screen and (max-width: 991px) {
    .footer {
        padding: 75px 16px 40px;
    }
}

@media screen and (max-width: 767px) {
    .footer {
        padding: 48px 16px 32px;
    }
}
</style>