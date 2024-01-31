<template>
    <div class="main-div">
        <div id="subscribe" class="sub-div">
            <div class="text-div">
                <h3>Subscribe to my mailing list.</h3>
                <p>In order to get notified of any new post 🙂.</p>
            </div>
            <form @submit.prevent="subscribe">
                <div class="form-group">
                    <input type="email" v-model="email" placeholder="Email Address">
                    <button type="submit">Subscribe</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
const email = ref('')
const subscribe = async () => {
    const response = await $fetch('/api/subscribe', {
        method: 'post',
        body: { email_address: email.value }
    })
    if (response.success) {
        alert('Subscription successful')
    } else {
        if (response.body.title == 'Member Exists') {
            alert('You are already Subscribed')
        } else {
            alert('Subscription failed')
        }
    }

}
</script>
<style scoped>
.main-div {
    margin: 72px auto;
    max-width: 1024px;
    text-align: center;
}

.sub-div {
    color: #FFFFFF;
    background: #232E52;
    border-radius: 10px;
    padding: 80px;
}

.text-div h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 120%;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 6px;
}

.text-div p {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 110%;
    text-align: center;
    color: #EDFCF2;
    margin-top: 6px;
}

.form-group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
}

.form-group input {
    height: 50px;
    width: 264px;
    border-radius: 8px 0px 0px 8px;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding: 16px 21px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
}

.form-group button {
    width: 136px;
    height: 50px;
    background: #8CEEAD;
    border-radius: 0px 8px 8px 0px;
    outline: none;
    text-transform: capitalize;
    border: none;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    color: #232E52;
    transition: all 0.2s ease;
}

.form-group button:active:hover {
    opacity: 0.95;
    font-size: 13px;
}

@media screen and (max-width: 991px) {
    .main-div {
        margin: 60px auto 24px;
        padding: 0px;
    }

    .main-div h3 {
        margin-top: 12px;
    }

    .sub-div {
        border-radius: 8px;
        padding: 24px;
    }

    .form-group {
        margin-top: 28px;
    }
}
</style>
