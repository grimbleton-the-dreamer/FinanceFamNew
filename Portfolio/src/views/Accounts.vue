<template>
    <div class="login-page">
        <div class="login-form-container">
            <h2 class="login-title">Login</h2>
            <form @submit.prevent="handleLogin" class="login-form">
                <label for="username" class="form-label">Username:</label>
                <input type="text" id="username" v-model="username" class="form-input" placeholder="Enter your username" required />

                <label for="password" class="form-label">Password:</label>
                <input type="password" id="password" v-model="password" class="form-input" placeholder="Enter your password" required />

                <button type="submit" class="submit-button">Login</button>
                <p v-if="authStore.error" class="error-message">{{ authStore.error }}</p>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';

const username = ref<string>('');
const password = ref<string>('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = () => {
    authStore.login(username.value, password.value);
    
    // Redirect to homepage on successful login
    if (!authStore.error) {
        router.push('/home');
    }
};
</script>

<style scoped lang="less">
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: inherit;
}

.login-form-container {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
}

.login-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
}

.form-label {
    display: block;
    color: #333;
    font-size: 14px;
    margin-bottom: 5px;
    text-align: left;
}

.form-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 14px;
    width: 92.5%;
}

.submit-button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #78bd80;
    color: white;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
}

.submit-button:hover {
    background-color: #89ce91;
}
</style>
