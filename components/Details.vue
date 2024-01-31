<template>
    <div class="main">
        <a class="back-arrow" @click="back"><font-awesome-icon icon="fa-solid fa-chevron-left"></font-awesome-icon></a>
        <div class="post-details">
            <div v-if="category" class="category">
                {{ category }}
            </div>
            <div v-if="date" class="date">
                {{ date }}
            </div>
        </div>
    </div>
</template>
<script setup>
const router = useRouter()
defineProps(['category', 'date'])

const back = () => {
    router.go(-1)
}
</script>
<style scoped>
.main {
    padding: 25px 16px;
    max-width: 1200px;
    display: flex;
    align-items: center;
    margin: 0 auto;
}

.back-arrow {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    margin-right: 30px;
    color: #FFFFFF;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.post-details {
    display: flex;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-transform: Capitalize;
    line-height: 1;
}

.category {
    padding: 8px 12px;
    border: 2px solid #FFFFFF;
    border-radius: 6px 0px 0px 6px;
    color: #FFFFFF;
    margin-bottom: 0;
}

.date {
    padding: 10px 12px;
    border-radius: 0px 6px 6px 0px;
    color: #232E52;
    margin-bottom: 0;
    background: #FFFFFF;
}

@media screen and (max-width: 991px) {
    .main {
        padding: 16px 16px 28px;
    }

    .back-arrow {
        margin-right: 16px;
    }
}
</style>