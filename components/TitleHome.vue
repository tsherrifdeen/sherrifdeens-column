<template>
    <div class="rotating-text-container">
        <h3 class="rotating-text">
            {{ texts[currentIndex] }}!
        </h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            texts: ["Welcome", "Bienvenue", "Willkommen", "いらっしゃいませ", "Bienvenida"], // Add your rotating texts here
            currentIndex: 0,
            rotationInterval: 3000, // Set the duration for each text rotation in milliseconds
        };
    },
    mounted() {
        this.startRotation();
    },
    methods: {
        startRotation() {
            setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            }, this.rotationInterval);
        },
    },
};
</script>

<style scoped>
.rotating-text-container {
    /* Adjust the container width as needed */
    max-width: 1200px;
    margin: 0 auto;
    padding: 5px 16px 145px;
}

.rotating-text {
    font-weight: 700;
    font-size: 3rem;
    line-height: 120%;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    margin: 0 auto;
    text-transform: capitalize;
    animation: fadeInOut 3s ease-in-out infinite;
}

@media screen and (max-width: 991px) {
    .rotating-text-container {
        padding: 5px 16px 72px;
    }
}

@media screen and (max-width: 767px) {
    .rotating-text-container {
        padding: 5px 0 48px;
        text-align: center;
    }
}

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
}
</style>
