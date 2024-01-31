<template>
    <div class="main-wrapper" :style="isOpen ? mobile : normal">
        <div class="site-identity-div">
            Sherrifdeen's<span>Column</span>
        </div>
        <div class="menu-links" :style="isOpen ? mobileItems : normalChild">
            <ul>
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/categories">Categories</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/articles">Articles</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="subscribe-div" :style="isOpen ? mobileItems : normalChild">
            <a class="subscribe-btn" href="#subscribe">Subscribe</a>
        </div>
        <div class="hamburger-btn">
            <a @click="displayMenu">
                <i v-if="!isOpen" class="fas fa-bars">
                </i>
                <i v-if="isOpen" class="fas fa-close">
                </i>
            </a>
        </div>
    </div>
</template> 
<script setup>
// Define the data properties
const isOpen = ref(false);
const mobile = ref({
    display: 'block',
    textAlign: 'center',
});
const mobileItems = ref({
    display: 'block',
});
const normal = ref({
    display: '',
});
const normalChild = ref({
    display: '',
});

// Define the methods
const displayMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>
<style scoped>
.site-identity-div {
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 1.4rem;
    font-family: 'Poppins', Helvetica, sans-serif;
    letter-spacing: 0.5px;
}

.site-identity-div span {
    font-weight: 200;
}

.main-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 48px 16px;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    transition: all 1s ease-in-out;
}

.menu-links>ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    color: white;
    padding: 0;
}

.menu-links a {
    padding: 8px;
    color: white;
    text-transform: capitalize;
    font-weight: 400;
}

.menu-links a.router-link-active {
    font-weight: bold;
}

.subscribe-btn {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 20px;
    border-radius: 8px;
    color: white;
    border: none;
}

.hamburger-btn {
    display: none;
}

@media screen and (max-width: 767px) {
    .main-wrapper {
        padding: 24px 16px 16px;
    }

    .menu-links {
        display: none;
        margin: auto;
        transition: all 1s ease;
    }

    .menu-links>ul {
        display: block;
    }

    .menu-links a {
        display: block;
        padding: 8px;
    }

    .subscribe-div {
        display: none;
        text-align: center;
    }

    .subscribe-btn {
        display: inline-block;

        margin-bottom: 28px;
    }

    .hamburger-btn {
        display: block;
        text-align: center;
        font-size: 1.5rem;
    }

    .site-identity-div {
        font-size: 1.3rem;
    }
}
</style>